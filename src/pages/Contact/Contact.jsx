import React, { useContext } from "react";
import { motion } from "framer-motion";

import "../../styles/contact.css";
import chefs from "../../assets/images/chefs.svg";

import FormCard from "../../components/Form/Form";
import { DataContext, ThemeAppContext } from "../../App";
import Modal from "./Modal";
import { sideVariants, verticalVariants } from "../../variants";
function Contact() {
  const { isDark } = useContext(ThemeAppContext);
  const { form } = useContext(DataContext);
  return (
    <section
      className={`contact-wrapper wrapper ${!isDark && "light-body-bg"}`}
    >
      <motion.header
        className="contact-header"
        variants={verticalVariants("top")}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        exit="exit"
      >
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
      </motion.header>
      <div className="form-container">
        <section
          className={`form-content-wrapper ${!isDark && "light-cards-bg"}`}
        >
          <motion.div 
          className="form-text"
          variants={sideVariants("left")}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          exit="exit"
          >
            <h2 className="form-title">Contact Us!</h2>
            <p className="form-parag">
              Whether you have a question about services, prices, need a any
              other details please contact us using the form and the other
              information on this page.
            </p>
            <div className="overlay contact"></div>
          </motion.div>
          <FormCard />
          {form.showModal && <Modal />}
        </section>
      </div>
    </section>
  );
}

export default Contact;
