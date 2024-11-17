import { Favorite, FavoriteBorder } from "@mui/icons-material";
import React, { useContext } from "react";
import { DataContext, ThemeAppContext } from "../../App";
import "./addFavoritesBtn.css"
function AddFavoritesBtn({ meal }) {
  const { mealData, dispatchMeal } = useContext(DataContext);
  // const{isDark} = useContext(ThemeAppContext)

  const isLiked = mealData.favorites.some((item) => item.idMeal === meal.idMeal);

  return (
    <button
      type="button"
      className={`favorites-btn ${isLiked && "liked"}`}
      onClick={() => dispatchMeal({ type: "UPDATE_FAVORITES", meal })}
    >
      {isLiked ? (
        <Favorite className="favorites-icon" fontSize="large" />
      ) : (
        <FavoriteBorder className="favorites-icon" fontSize="large" />
      )}
    </button>
  );
}

export default AddFavoritesBtn;
