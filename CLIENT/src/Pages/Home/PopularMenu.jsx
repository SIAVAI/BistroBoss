import { useEffect, useState } from "react";
import MenuItem from "../Shared/MenuItem/MenuItem";

const PopularMenu = () => {
  const [popularItems, setPopularItems] = useState([]);

  useEffect(() => {
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((item) => item.category === "popular");
        setPopularItems(filtered);
      });
  }, []);

  return (
    <div>
      <MenuItem items={popularItems} />
    </div>
  );
};

export default PopularMenu;
