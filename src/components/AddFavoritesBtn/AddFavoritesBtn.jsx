import { Favorite, FavoriteBorder } from "@mui/icons-material";
import React, { useContext } from "react";
import { DataContext, ThemeAppContext } from "../../App";
import "./addFavoritesBtn.css"
function AddFavoritesBtn({ meal }) {
  const { mealData, dispatchMeal } = useContext(DataContext);

  const isLiked = mealData.favorites.some((item) => item?.idMeal === meal?.idMeal);

  return (
    <button
    type="button"
    className={`favorites-btn ${isLiked && "liked"}`}
    onClick={() => dispatchMeal({ type: "UPDATE_FAVORITES", meal })}
    aria-pressed={isLiked} 
    aria-label={isLiked ? "Remove from favorites" : "Add to favorites"} 
  >
    {isLiked ? (
      <Favorite
        className="favorites-icon"
        fontSize="large"
        aria-hidden="true" 
      />
    ) : (
      <FavoriteBorder
        className="favorites-icon"
        fontSize="large"
        aria-hidden="true" 
      />
    )}
  </button>
  );
}

export default AddFavoritesBtn;
