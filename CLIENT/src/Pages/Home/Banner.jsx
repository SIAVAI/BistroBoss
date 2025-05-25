import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from "../../assets/home/01.jpg";
import img2 from "../../assets/home/02.jpg";
import img3 from "../../assets/home/03.png";
import img4 from "../../assets/home/04.jpg";
import img5 from "../../assets/home/05.png";
import img6 from "../../assets/home/06.png";

const Banner = () => {
  return (
    <div className="w-full mx-auto">
      <Carousel
        showArrows={true}
        autoPlay
        infiniteLoop
        interval={4000}
        showThumbs={true}
        showStatus={false}
        showIndicators={true}
        thumbWidth={100}
        dynamicHeight={false}
        className="rounded-md"
      >
        {[img1, img2, img3, img4, img5, img6].map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
