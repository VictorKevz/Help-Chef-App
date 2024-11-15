import React, { useContext } from "react";
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

function MealCard({data}) {
//   const { mealData } = useContext(DataContext);
  const { isDark } = useContext(ThemeAppContext);

  return (
    <section className="mealCard-wrapper wrapper">
      <div className="mealCard-grid">
        {data.map((meal, index) => {
          const isEven = index % 2 === 0;
          const isOdd = index % 2 === 1 && index % index === 0;
          return (
            <div key={meal?.idMeal} className="mealCard">
              <header
                className="mealCard-bg"
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
                <h2 className="mealCard-title">{meal?.strMeal}</h2>
              </div>
              <div className="mealCard-cta-wrapper">
                <Link to={`/${meal?.strMeal}`} className="mealCard-link">
                  View details{" "}
                  <ArrowForward className="mealCard-arrow" fontSize="large" />
                </Link>
                <AddFavoritesBtn meal={meal}/>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default MealCard;
