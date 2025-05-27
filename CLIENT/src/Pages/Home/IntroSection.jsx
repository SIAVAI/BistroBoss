import bg from "../../assets/home/chef-service.jpg";
const IntroSection = () => {
  return (
    <div
      className="relative bg-cover bg-center py-16 px-4 md:px-8 lg:px-16"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-white bg-opacity-90 max-w-3xl mx-auto p-8 rounded shadow-md text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold font-cinzel text-gray-800 border-b-2 border-gray-400 inline-block pb-2 mb-4">
          Bistro Boss
        </h2>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed font-inter">
          Welcome to Bistro Boss — where passion meets flavor. Our chefs bring
          culinary artistry to life, using only the finest ingredients to craft
          dishes that delight the senses. Whether you're here for a hearty meal
          or a light bite, we promise a dining experience that feels like home.
        </p>
      </div>
    </div>
  );
};

export default IntroSection;
