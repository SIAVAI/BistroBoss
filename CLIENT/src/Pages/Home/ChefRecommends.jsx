import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const ChefRecommends = () => {
  // Static mock data, replace or map from API if needed
  const recommended = [
    {
      id: 1,
      name: "Caeser Salad",
      desc: "Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.",
      img: "https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-1-370x247.jpg",
    },
    {
      id: 2,
      name: "Caeser Salad",
      desc: "Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.",
      img: "https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-1-370x247.jpg",
    },
    {
      id: 3,
      name: "Caeser Salad",
      desc: "Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.",
      img: "https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-1-370x247.jpg",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 text-center">
      <SectionTitle
        subheading="Should Try"
        heading="Chef Recommends"
        className="mb-12"
      ></SectionTitle>

      <div className="grid md:grid-cols-3 gap-6">
        {recommended.map((item) => (
          <div
            key={item.id}
            className="bg-[#F3F3F3] rounded shadow-md overflow-hidden"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-[200px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{item.desc}</p>
              <button className="btn btn-ghost text-black text-sm font-semibold uppercase border-t-0 border-x-0 border-b-2 border-gray-800 hover:text-yellow-500 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChefRecommends;
