import React, { useContext } from "react";
import "../../styles/contact.css";
import chefs from "../../assets/images/chefs.svg";
// import contactImg from "../../assets/images/contact-img.svg";
// import pattern from "../../assets/images/pattern-2.svg";
import FormCard from "../../components/Form/Form";
import { DataContext, ThemeAppContext } from "../../App";
import Modal from "./Modal";
function Contact() {
  const { isDark } = useContext(ThemeAppContext);
  const { form } = useContext(DataContext);
  return (
    <section
      className={`contact-wrapper wrapper ${!isDark && "light-body-bg"}`}
    >
      <header className="contact-header">
        <div className="contact-info-wrapper">
          <div className="contact-text-wrapper">
            <h1 className="contact-title">Connect With Us!</h1>
            <p className="contact-parag">
              Have questions or suggestions about our recipes? We’d love to hear
              from you! Reach out to share your thoughts, and let’s make cooking
              an enjoyable journey together!
            </p>
          </div>
          <figure className="contact-image-wrapper">
            <img src={chefs} alt="An image of chefs" className="chef-img" />
          </figure>
          <div className="overlay contact"></div>
        </div>
      </header>
      <div className="form-container">
        <section
          className={`form-content-wrapper ${!isDark && "light-cards-bg"}`}
        >
          <div className="form-text">
            <h2 className="form-title">Contact Us!</h2>
            <p className="form-parag">
              Whether you have a question about services, prices, need a any
              other details please contact us using the form and the other
              information on this page.
            </p>
            <div className="overlay contact"></div>
          </div>
          <FormCard />
          {form.showModal && <Modal/>}
        </section>
      </div>
    </section>
  );
}

export default Contact;
