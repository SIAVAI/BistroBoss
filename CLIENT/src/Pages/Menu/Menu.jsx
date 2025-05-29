import { Helmet } from "react-helmet";
import bg from "../../assets/menu/banner3.jpg";
import Cover from "../Shared/Cover/Cover";
import { useEffect, useState } from "react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import MenuItem from "../Shared/MenuItem/MenuItem";
import desertBg from "../../assets/menu/dessert-bg.jpeg";
import pizzaBg from "../../assets/menu/pizza-bg.jpg";
import saladBg from "../../assets/menu/salad-bg.jpg";
import soupBg from "../../assets/menu/soup-bg.jpg";
const Menu = () => {
  const [popularItems, setPopularItems] = useState([]);
  const [soupItems, setSoupItems] = useState([]);
  const [pizzaItems, setPizzaItems] = useState([]);
  const [dessertItems, setDessertItems] = useState([]);
  const [saladItems, setSaladItems] = useState([]);

  useEffect(() => {
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered1 = data.filter((item) => item.category === "popular");
        setPopularItems(filtered1);
        const filtered2 = data.filter((item) => item.category === "soup");
        setSoupItems(filtered2);
        const filtered3 = data.filter((item) => item.category === "pizza");
        setPizzaItems(filtered3);
        const filtered4 = data.filter((item) => item.category === "dessert");
        setDessertItems(filtered4);
        const filtered5 = data.filter((item) => item.category === "salad");
        setSaladItems(filtered5);
      });
  }, []);

  return (
    <div>
      <Helmet>
        <title>Bistro Menu</title>
      </Helmet>
      <Cover
        bgImg={bg}
        heading="Our Menu"
        text="Would you like to try a dish?"
      ></Cover>
      <SectionTitle
        subheading="Don't miss"
        heading="TODAY'S OFFER"
      ></SectionTitle>
      <MenuItem items={popularItems}></MenuItem>
      <Cover
        bgImg={desertBg}
        heading="Desserts"
        text="Indulge in our sweet treats, from classic cakes to exotic pastries."
      ></Cover>
      <MenuItem items={dessertItems}></MenuItem>
      <Cover
        bgImg={pizzaBg}
        heading="Pizzas"
        text="Savor the taste of our handcrafted pizzas, made with love and fresh ingredients."
      ></Cover>
      <MenuItem items={pizzaItems}></MenuItem>
      <Cover
        bgImg={saladBg}
        heading="Salads"
        text="Fresh and healthy salads to complement your meal."
      ></Cover>
      <MenuItem items={saladItems}></MenuItem>
      <Cover
        bgImg={soupBg}
        heading="Soups"
        text="Warm up with our delicious soups, perfect for any season."
      ></Cover>
      <MenuItem items={soupItems}></MenuItem>
    </div>
  );
};

export default Menu;
