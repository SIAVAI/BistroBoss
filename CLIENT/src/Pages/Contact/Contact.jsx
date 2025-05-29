import { Helmet } from "react-helmet";
import bg from "../../assets/contact/banner.jpg";
import Cover from "../Shared/Cover/Cover";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Contact</title>
      </Helmet>
      <Cover
        bgImg={bg}
        heading="Contact Us"
        text="We would love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us. Our team is here to assist you and ensure you have the best experience possible."
      ></Cover>
      <SectionTitle
        subheading="Get in Touch"
        heading="OUR LOCATION"
        className="mt-10"
      ></SectionTitle>
      <ContactInfo></ContactInfo>
      <SectionTitle
        subheading="Send Us a Message"
        heading="CONTACT FORM"
        className="mt-10"
      ></SectionTitle>
      <ContactForm></ContactForm>
    </div>
  );
};

export default Contact;
