import React, { useContext, useState } from "react";
import { DataContext, ThemeAppContext } from "../../App";
import "./mealCard.css";
import { Link } from "react-router-dom";
import {
  ArrowForward,
  ElectricBolt,
  FavoriteBorder,
  PriorityHigh,
} from "@mui/icons-material";
import AddFavoritesBtn from "../AddFavoritesBtn/AddFavoritesBtn";

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
    <section className="mealCard-wrapper wrapper">
      <div className="mealCard-grid">
        {itemsToDisplay?.map((meal, index) => {
          const isEven = index % 2 === 0;
          const isOdd = index % 2 === 1 && index % index === 0;
          
          return (
            <div key={meal?.idMeal} className={`mealCard ${!isDark && "light-cards-bg"}`}>
              <header
                className={`mealCard-bg `}
                style={{ backgroundImage: `url(${meal?.strMealThumb})` }}
              >
                {isEven && (
                  <span className="tag easy">
                    Easy
                    <ElectricBolt />
                  </span>
                )}
                {isOdd && (
                  <span className="tag hard">
                    Hard
                    <PriorityHigh />
                  </span>
                )}
              </header>
              <div className="mealCard-text">
                {isOdd && <span className="status popular">Popular</span>}
                {isEven && <span className="status quick">Quick</span>}{" "}
                <h2 className={`mealCard-title ${!isDark && "light-text"}`}>{meal?.strMeal}</h2>
              </div>
              <div className="mealCard-cta-wrapper">
                <Link to={`/meals/${meal?.strMeal}`} className={`mealCard-link`}>
                  View details{" "}
                  <ArrowForward className="mealCard-arrow" fontSize="large" />
                </Link>
                <AddFavoritesBtn meal={meal} />
              </div>
            </div>
          );
        })}
      </div>
      {showPagination && (
        <div className="page-nums-wrapper">
          {Array.from({ length: totalPages }, (_, i) => {
            const isCurrent = currentPage === i + 1;
            return (
              <button
                key={i}
                type="button"
                className={`pageNum-btn ${isCurrent && "current-page"}`}
                onClick={() => setCurrentPage(i + 1)}
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
