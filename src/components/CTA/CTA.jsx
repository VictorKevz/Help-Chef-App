import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import "./cta.css";
import { verticalVariants } from "../../variants";
function CTA() {
  return (
    <article className="cta-wrapper">
      <AnimatePresence mode="wait">
        <motion.div
          className="cta-container"
          variants={verticalVariants("top")}
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, amount: 0.1 }}
          exit="exit"
        >
          <div className="cta-text">
            <h2 className="cta-title">Want to Improve Our Recipe App?</h2>
            <p className="cta-parag">
              We value your feedback! Share your ideas and help us create a
              better recipe experience.
            </p>
          </div>
          <Link to={`/contact`} className="link cta">
            Contact Us
          </Link>
          <div className="overlay cta"></div>
        </motion.div>
      </AnimatePresence>
    </article>
  );
}

export default CTA;
