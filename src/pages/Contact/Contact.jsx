import React from "react";
import "../../styles/contact.css";
import chefs from "../../assets/images/chefs.svg";
import pattern from "../../assets/images/pattern-2.svg"
function Contact() {
  return (
    <section className="contact-wrapper wrapper">
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
          <img src={pattern} alt="" className="pattern contact" />
        </div>
      </header>
    </section>
  );
}

export default Contact;
