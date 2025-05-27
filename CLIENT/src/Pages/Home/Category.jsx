import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

import one from "../../assets/home/slide1.jpg";
import two from "../../assets/home/slide2.jpg";
import three from "../../assets/home/slide3.jpg";
import four from "../../assets/home/slide4.jpg";
import five from "../../assets/home/slide5.jpg";

const Category = () => {
  const slides = [
    { image: one, label: "SALAD" },
    { image: two, label: "PIZZA" },
    { image: three, label: "SOUP" },
    { image: four, label: "DESSERT" },
    { image: five, label: "DRINKS" },
  ];

  return (
    <div className="my-10 px-4">
      <Swiper
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-auto object-cover">
              <figure>
                <img
                  src={slide.image}
                  alt={`Category ${index + 1}`}
                  className="w-full"
                />
              </figure>
              <h2 className="absolute bottom-4 w-full text-center text-white font-inter  text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                {slide.label}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Category;
