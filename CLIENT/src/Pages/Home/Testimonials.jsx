import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaStar, FaRegStar, FaQuoteLeft } from "react-icons/fa";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

import "swiper/css";
import "swiper/css/navigation";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) =>
      i < rating ? (
        <FaStar key={i} className="text-yellow-500" />
      ) : (
        <FaRegStar key={i} className="text-gray-400" />
      )
    );
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 text-center">
      <SectionTitle
        subheading="---What Our Customers Say---"
        heading="Testimonials"
      />

      <Swiper
        navigation
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        className="mt-8"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="flex flex-col items-center">
              <div className="flex justify-center space-x-1 mb-4">
                {renderStars(review.rating)}
              </div>
              <FaQuoteLeft className="text-4xl text-black opacity-30 mb-4" />
              <p className="text-gray-700 max-w-xl mb-4">{review.details}</p>
              <h3 className="text-yellow-600 font-bold uppercase">
                {review.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
