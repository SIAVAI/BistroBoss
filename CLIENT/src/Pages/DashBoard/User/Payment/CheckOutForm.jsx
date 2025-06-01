/* eslint-disable no-unused-vars */
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

// Stripe styling options
const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#32325d",
      "::placeholder": { color: "#a0aec0" },
    },
    invalid: { color: "#fa755a" },
  },
};

const CheckoutForm = ({ clientSecret, cart }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardNumberElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: data.name,
        address: {
          postal_code: data.postalCode,
        },
      },
    });

    if (error) {
      console.error("Stripe error:", error.message);
      toast.error(error.message);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      toast.error(confirmError.message);
    } else {
      toast.success("Payment successful!");
      console.log("✅ PaymentIntent:", paymentIntent);
      // backend here
      if (paymentIntent.status === "succeeded") {
        await axiosSecure
          .post("/payments", {
            userId: user?._id,
            email: user?.email,
            transactionId: paymentIntent.id,
            cartId: cart.map((i) => i._id),
            menuItemId: cart.map((i) => i.orderedId),
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            status: paymentIntent.status,
          })
          .then((res) => {
            console.log(res.data);

            reset();
          })
          .catch((error) => {
            toast.error("Something went wrong!!");
          });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">Payment</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Cardholder Name */}
        <div>
          <input
            type="text"
            placeholder="Cardholder Name"
            {...register("name", { required: "Cardholder name is required" })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Card Number */}
        <div className="border border-gray-300 rounded-md p-3">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Card Number
          </label>
          <CardNumberElement options={ELEMENT_OPTIONS} />
        </div>

        {/* Expiry & CVC */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-gray-300 rounded-md p-3">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Expiry Date
            </label>
            <CardExpiryElement options={ELEMENT_OPTIONS} />
          </div>
          <div className="border border-gray-300 rounded-md p-3">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              CVC
            </label>
            <CardCvcElement options={ELEMENT_OPTIONS} />
          </div>
        </div>

        {/* Postal Code (Manual) */}
        <div>
          <input
            type="text"
            placeholder="Postal Code"
            {...register("postalCode", { required: "Postal code is required" })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          {errors.postalCode && (
            <p className="text-sm text-red-500">{errors.postalCode.message}</p>
          )}
        </div>

        {/* Submit */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!stripe || !clientSecret}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Pay Now
        </motion.button>
      </form>
    </motion.div>
  );
};

export default CheckoutForm;
