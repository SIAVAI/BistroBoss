const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const Stripe = require("stripe");
const port = process.env.PORT || 5000;

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bruzsiw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const menuCollection = client.db("bistroDB").collection("menuCollection");
    const cartCollection = client.db("bistroDB").collection("cartCollection");
    const userCollection = client.db("bistroDB").collection("userCollection");
    const paymentCollection = client
      .db("bistroDB")
      .collection("paymentCollection");

    // Route to create a PaymentIntent
    app.post("/create-payment-intent", async (req, res) => {
      try {
        const { amountInCents, currency = "usd" } = req.body;
        //console.log(amountInCents);

        // Validate amount (must be in cents)
        if (!amountInCents || typeof amountInCents !== "number") {
          return res
            .status(400)
            .json({ error: "Amount must be a number in cents." });
        }

        // Create the PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amountInCents,
          currency,
          payment_method_types: ["card"],
        });

        res.send({
          clientSecret: paymentIntent.client_secret,
        });
      } catch (error) {
        console.error("Error creating PaymentIntent:", error);
        res.status(500).json({ error: error.message });
      }
    });

    //Save Payment Info to db
    app.post("/payments", async (req, res) => {
      const payment = req.body;
      console.log("💳 Payment Received:", payment);

      try {
        const query = {
          _id: {
            $in: payment.cartId.map((id) => new ObjectId(id)),
          },
        };
        const deleteResult = await cartCollection.deleteMany(query);

        const result = await paymentCollection.insertOne({
          ...payment,
          paymentDate: new Date(),
        });

        res.send({
          success: true,
          insertedId: result.insertedId,
          deletedCount: deleteResult.deletedCount,
        });
      } catch (error) {
        console.error("Payment save error:", error);
        res.status(500).json({ success: false, error: error.message });
      }
    });

    app.get("/payments", async (req, res) => {
      const email = req.query.email;

      let result;
      if (email) {
        result = await paymentCollection.find({ email }).toArray();
      } else {
        result = await paymentCollection.find().toArray();
      }

      res.send({ result });
    });

    //jwt
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token: token });
    });

    // middlewares
    const verifyToken = (req, res, next) => {
      console.log(req.headers);

      if (!req.headers.authorization) {
        return res
          .status(401)
          .send({ message: "Didn't find any access token!!" });
      }

      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res
          .status(401)
          .send({ message: "Token is missing or malformed" });
      }

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "Access Denied!!!" });
        }
        req.decoded = decoded;
        next();
      });
    };
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      if (isAdmin === false) {
        return res.status(403).send({ message: "Forbidden Access!!!" });
      }
      next();
    };

    //Menu Collection APIs
    app.get("/menu", async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    });
    app.get("/menu/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await menuCollection.findOne(query);
      res.send(result);
    });

    app.post("/menu", async (req, res) => {
      const food = req.body;
      const result = menuCollection.insertOne(food);
      res.send(result);
    });

    app.delete("/menu/:id", async (req, res) => {
      const id = req.params.id;
      const result = await menuCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    app.put("/menu/:id", async (req, res) => {
      const id = req.params.id;
      const item = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          name: item.name,
          category: item.category,
          price: item.price,
          image: item.image,
          recipe: item.recipe,
        },
      };

      try {
        const updatedItem = await menuCollection.updateOne(filter, updateDoc);

        if (!updatedItem) {
          return res.status(404).json({ message: "Menu item not found" });
        }

        res.json(updatedItem);
      } catch (error) {
        console.error("Error updating menu item:", error);
        res.status(500).json({ message: "Server error" });
      }
    });

    //Cart Collection APIs
    app.get("/carts", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      let result;
      if (email) {
        result = await cartCollection.find(query).toArray();
      } else {
        result = await cartCollection.find().toArray();
      }
      res.send(result);
    });

    app.post("/carts", async (req, res) => {
      const item = req.body;
      const result = await cartCollection.insertOne(item);
      res.send(result);
    });
    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const result = await cartCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    // User Collection APIs
    app.get("/users", verifyToken, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });
    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      res.send(user);
    });
    app.post("/users", async (req, res) => {
      const user = req.body;
      const existingUser = await userCollection.findOne({
        email: user.email,
      });
      if (existingUser) {
        return res.status(409).send({ message: "User already exists" });
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const result = await userCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    app.get("/user/admin/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      if (email !== req.decoded.email) {
        return res.send(403).send({ message: "Unauthorized Access!!!" });
      }

      const query = { email: email };
      const user = await userCollection.findOne(query);
      let admin = false;
      if (user) {
        admin = user.isAdmin;
      }
      res.send({ admin });
    });

    app.patch("/users/admin/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          isAdmin: true,
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Bistro Boss Server is running on port ${port}`);
});
