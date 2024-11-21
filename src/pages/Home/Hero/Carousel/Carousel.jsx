import React, { useContext, useState } from "react";
import "../Carousel/carousel.css";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { carouselData } from "./carouselData";
import { ThemeAppContext } from "../../../../App";
import { carouselVariants } from "../../../../variants";
import pattern from "../../../../assets/images/home/hero/pattern.svg"


function Carousel() {
  const { isDark } = useContext(ThemeAppContext);
  const [direction, setDirection] = useState("right");
  const [index, setIndex] = useState(2);
  const { heading, tagline, cta, textBg, imgBg } = carouselData[index];

  const nextSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
    );
    setDirection("right");
  };
  const prevSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
    );
    setDirection("left");
  };
  return (
    <AnimatePresence mode="wait">
      <motion.section
        className={`carousel-wrapper wrapper ${!isDark && "light-cards-bg"}`}
        variants={carouselVariants(direction)}
        initial="initial"
        animate="animate"
        exit="exit"
        key={index}
      >
        <motion.div className="carousel-container">
          <div
            className="text-wrapper"
            style={{ backgroundImage: `url(${textBg})` }}
          >
            <p className="carousel-parag">{tagline}</p>
            <h2 className="hero-title">{heading}</h2>
            <Link to={cta} className="link carousel">
              Explore Now!
            </Link>
            <div className="text-overlay"></div>
          </div>
          <div
            className="image-wrapper"
            style={{ backgroundImage: `url(${imgBg})` }}
          ></div>
          <button
            type="button"
            className={`control-btn prev ${!isDark && "light-text"}`}
            onClick={prevSlide}
          >
            <ArrowBackIos
              fontSize="large"
              className="carousel-icon prev-icon"
            />
          </button>
          <button
            type="button"
            className={`control-btn next ${!isDark && "light-text"}`}
            onClick={nextSlide}
          >
            <ArrowForwardIos fontSize="large" className="carousel-icon" />
          </button>
        </motion.div>
        <div className="pages-wrapper">
          {carouselData.map((page) => {
            const isActive = index === page.id;
            return (
              <button
                key={page.id}
                type="button"
                className={`page-num ${isActive && "current"}`}
                onClick={() => setIndex(page.id)}
              >
                {page.id + 1}
              </button>
            );
          })}
        </div>
        {/* <img src={pattern} alt="" className="pattern-img top" />
        <img src={pattern} alt="" className="pattern-img bottom" /> */}
      </motion.section>
    </AnimatePresence>
  );
}

export default Carousel;
