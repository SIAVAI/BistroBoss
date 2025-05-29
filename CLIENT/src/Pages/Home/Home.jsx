import { Helmet } from "react-helmet";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import Banner from "./Banner";
import CallBanner from "./CallBanner";
import Category from "./Category";
import ChefRecommends from "./ChefRecommends";
import FeaturedItem from "./FeaturedItem";
import IntroSection from "./IntroSection";
import PopularMenu from "./PopularMenu";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div className="">
      <Helmet>
        <title>Bistro Home</title>
      </Helmet>
      <Banner></Banner>
      <SectionTitle
        subheading="From 11:00am to 10:00pm"
        heading="Order Online"
      />
      <Category></Category>
      <IntroSection></IntroSection>
      <SectionTitle subheading="Check it out" heading="From Our Menu" />
      <PopularMenu></PopularMenu>
      <CallBanner></CallBanner>
      <ChefRecommends></ChefRecommends>
      <FeaturedItem></FeaturedItem>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
