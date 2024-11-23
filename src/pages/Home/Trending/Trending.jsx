import React, { useContext } from "react";
import { DataContext, ThemeAppContext } from "../../../App";
import "./trending.css";
import { Link } from "react-router-dom";
import {  motion } from "framer-motion";
import { productCardVariants } from "../../../variants";

function Trending() {
  const { mealData } = useContext(DataContext);
  const { isDark } = useContext(ThemeAppContext);

  const filteredData = mealData?.categoriesData.filter(
    (item) => item.strCategory !== "Miscellaneous"
  );
  const getClassName = (id) => {
    let className;
    if (id === 1) className = !isDark ? "first-light" : "first";
    if (id === 2) className = !isDark ? "second-light" : "second";
    if (id === 3) className = !isDark ? "third-light" : "third";
    if (id === 4) className = !isDark ? "fourth-light" : "fourth";
    if (id === 5) className = !isDark ? "fifth-light" : "fifth";

    return className;
  };
  return (
    <section
      className={`trending-wrapper wrapper ${!isDark && "light-cards-bg"}`}
    >
      <h2 className={`trending-title ${!isDark && "light-text"}`}>
        Our Popular Categories
      </h2>
      <div className={`trending-grid`}>
        {filteredData?.slice(0, 5).map((category, index) => (
          <motion.div
            key={category?.idCategory}
            className={`trending-card ${getClassName(index + 1)}`}
            variants={productCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={index}
            exit="exit"
          >
            <div className="text-section">
              <h3 className={`trending-card-title `}>
                {category?.strCategory}
              </h3>
              <p className="trending-card-description">
                {category?.strCategoryDescription
                  .split(".")
                  .slice(0, 1)
                  .join(".")}
                .
              </p>
              <Link
                className="link trending"
                to={`/categories/${category?.strCategory}`}
              >
                Learn More
              </Link>
            </div>
            <div
              className="trending-image-bg"
              style={{ backgroundImage: `url(${category?.strCategoryThumb})` }}
            ></div>
            <div className="overlay"></div>
          </motion.div>
        ))}
      </div>
      {/* <img src={pattern} alt="" className="trending-pattern-img " /> */}
    </section>
  );
}

export default Trending;
