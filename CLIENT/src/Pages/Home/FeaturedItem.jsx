import bg from "../../assets/home/featured.jpg";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const FeaturedItem = () => {
  return (
    <section className="relative text-white py-16 px-4 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed z-0 opacity-70 "
        style={{ backgroundImage: `url(${bg})` }}
      ></div>

      {/* Overlay */}
      <div className="hero-overlay  "></div>
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <SectionTitle subheading="---Check it out---" heading="From Our Menu" />

        <div className="md:flex items-center gap-10 text-left mt-8 bg-white bg-opacity-90 p-6 rounded shadow-lg max-w-4xl mx-auto">
          <img
            src={bg}
            alt="Featured Dish"
            className="w-full md:w-1/2 h-64 object-cover rounded"
          />
          <div className="mt-4 md:mt-0 md:w-1/2 text-gray-800">
            <p className="text-sm text-gray-500 mb-1">March 20, 2023</p>
            <h3 className="text-xl font-bold mb-2">Savor the Flavors</h3>
            <p className="text-sm mb-4">
              Experience our chef’s special—tender duck breast glazed in cherry
              sauce, paired with a rich gratin potato. Prepared fresh and served
              with elegance, this dish is a perfect harmony of taste and
              tradition.
            </p>
            <button className="btn btn-ghost text-black text-sm font-semibold uppercase border-t-0 border-x-0 border-b-2 border-gray-800 hover:text-yellow-500 transition">
              Read More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedItem;
