import Cover from "../Shared/Cover/Cover";
import bg from "../../assets/shop/banner2.jpg";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";

const Order = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [activeTab, setActiveTab] = useState("salad");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/menu`)
      .then((res) => res.json())
      .then((data) => setMenuItems(data));
  }, []);

  const categories = ["salad", "pizza", "soup", "dessert", "drinks"];

  const filteredItems = menuItems.filter((item) => item.category === activeTab);

  return (
    <div>
      <Helmet>
        <title>Bistro Shop</title>
      </Helmet>

      <Cover
        heading="OUR MENU"
        text="Would you like to try a dish?"
        bgImg={bg}
      />

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div
          role="tablist"
          className="flex justify-center items-center space-x-4 mb-8 flex-wrap  "
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`uppercase text-sm font-semibold px-4 py-2 border-b-2 transition duration-200 ${
                activeTab === cat
                  ? "border-yellow-500 text-yellow-500"
                  : "border-transparent text-gray-600 hover:text-yellow-600"
              }`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
