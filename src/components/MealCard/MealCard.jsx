import React, { useContext, useState } from "react";
import { ThemeAppContext } from "../../App";
import "./mealCard.css";
import { Link } from "react-router-dom";
import {  motion } from "framer-motion";

import { ArrowForward, ElectricBolt, PriorityHigh } from "@mui/icons-material";
import AddFavoritesBtn from "../AddFavoritesBtn/AddFavoritesBtn";
import { productCardVariants } from "../../variants";

function MealCard({ data }) {
  //   const { mealData } = useContext(DataContext);
  const { isDark } = useContext(ThemeAppContext);

  // PAGINATION LOGIC......................................
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = data?.length; //length of items available
  const itemsPerPage = 6; // Number of items to display per page
  const totalPages = Math.ceil(totalItems / itemsPerPage); //Total Number of pages
  const startIndex = (currentPage - 1) * itemsPerPage; // Index of the first item on the current page
  const endIndex = startIndex + itemsPerPage; // Index of the last item on the current page
  const slicedData = data?.slice(startIndex, endIndex);

  const showPagination = totalItems > 6; // boolean to conditionally show pagination
  const itemsToDisplay = showPagination ? slicedData : data; // condtionally render data
  // PAGINATION LOGIC......................................
  return (
    <section
  className="mealCard-wrapper wrapper"
  aria-label="Meal Card Section"
>
  <div className="mealCard-grid" role="list">
    {itemsToDisplay?.map((meal, index) => {
      const isEven = index % 2 === 0;
      const isOdd = index % 2 === 1 && index % index === 0;

      return (
        <motion.div
          key={meal?.idMeal}
          className={`mealCard ${!isDark && "light-cards-bg"}`}
          variants={productCardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={index}
          exit="exit"
          role="listitem"
          aria-labelledby={`meal-title-${meal?.idMeal}`}
        >
          <header
            className={`mealCard-bg`}
            style={{ backgroundImage: `url(${meal?.strMealThumb})` }}
            aria-label={`${meal?.strMeal} thumbnail`}
          >
            {isEven && (
              <span className="tag easy" aria-label="Easy Meal">
                Easy
                <ElectricBolt aria-hidden="true" />
              </span>
            )}
            {isOdd && (
              <span className="tag hard" aria-label="Hard Meal">
                Hard
                <PriorityHigh aria-hidden="true" />
              </span>
            )}
          </header>
          <div className="mealCard-text">
            {isOdd && (
              <span className="status popular" aria-label="Popular Meal">
                Popular
              </span>
            )}
            {isEven && (
              <span className="status quick" aria-label="Quick Meal">
                Quick
              </span>
            )}
            <h2
              id={`meal-title-${meal?.idMeal}`}
              className={`mealCard-title ${!isDark && "light-text"}`}
            >
              {meal?.strMeal}
            </h2>
          </div>
          <div className="mealCard-cta-wrapper">
            <Link
              to={`/meals/${meal?.strMeal}`}
              className={`mealCard-link`}
              aria-label={`View details of ${meal?.strMeal}`}
            >
              View details{" "}
              <ArrowForward
                className="mealCard-arrow"
                fontSize="large"
                aria-hidden="true"
              />
            </Link>
            <AddFavoritesBtn meal={meal} />
          </div>
        </motion.div>
      );
    })}
  </div>
  {showPagination && (
    <div
      className="page-nums-wrapper"
      role="navigation"
      aria-label="Pagination Navigation"
    >
      {Array.from({ length: totalPages }, (_, i) => {
        const isCurrent = currentPage === i + 1;
        return (
          <button
            key={i}
            type="button"
            className={`pageNum-btn ${isCurrent && "current-page"}`}
            onClick={() => setCurrentPage(i + 1)}
            aria-label={`Go to page ${i + 1}`}
            aria-current={isCurrent ? "page" : undefined}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  )}
</section>
  );
}

export default MealCard;
