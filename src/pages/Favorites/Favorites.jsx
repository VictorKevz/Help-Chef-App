import React, { useContext } from "react";
import MealCard from "../../components/MealCard/MealCard";
import { Favorite } from "@mui/icons-material";
import { DataContext, ThemeAppContext } from "../../App";
import "../../styles/favorites.css";
import empty from "../../assets/images/empty-favorites.svg";
import { Link } from "react-router-dom";
function Favorites() {
  const { mealData } = useContext(DataContext);
  const { isDark } = useContext(ThemeAppContext);
  return (
    <section className="favorites-wrapper wrapper">
      <header className={`favorites-header ${!isDark && "light-text"}`}>
        <h1 className="favorites-title">My Favorites</h1>
        <p className="favorites-parag">
          Easily and conveniently find all your favorite recipes in one place!
          Click <Favorite color="success"/> icon to remove a recipe!
        </p>
      </header>
      {mealData.favorites.length > 0 ? (
        <MealCard data={mealData?.favorites} />
      ) : (
        <article className={`empty-wrapper ${!isDark && "light-text"}`}>
          <h2 className="empty-title">Uh Oh!</h2>
          <p className="empty-parag">You haven't liked any recipes yet!</p>
          <img
            src={empty}
            alt="Empty Wishlist illustration"
            className="empty-img"
          />
          <Link to="/categories" className="link empty">
            Explore recipes
          </Link>
        </article>
      )}
    </section>
  );
}

export default Favorites;
