import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import Banner from "./Banner";
import CallBanner from "./CallBanner";
import Category from "./Category";
import IntroSection from "./IntroSection";
import PopularMenu from "./PopularMenu";

const Home = () => {
  return (
    <div className="">
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
    </div>
  );
};

export default Home;
