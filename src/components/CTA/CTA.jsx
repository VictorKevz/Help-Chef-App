import React from "react";
import { Link } from "react-router-dom";
import "./cta.css"
function CTA() {
  return (
    <article className="cta-wrapper">
      <div className="cta-container">
      <div className="cta-text">
        <h2 className="cta-title">
          Want to Improve Our Recipe App?
        </h2>
        <p className="cta-parag">
          We value your feedback! Share your ideas and help us create a better
          recipe experience.
        </p>
      </div>
      <Link to={`/contact`} className="link cta">Contact Us</Link>
      <div className="overlay cta"></div>
      </div>
      
    </article>
  );
}

export default CTA;
