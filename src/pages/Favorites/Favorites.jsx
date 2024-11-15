import React, { useContext } from "react";
import MealCard from "../../components/MealCard/MealCard";
import { Favorite } from "@mui/icons-material";
import { DataContext } from "../../App";
import "../../styles/favorites.css"
function Favorites() {
    const{mealData} = useContext(DataContext)
  return (
    <section className="favorites-wrapper wrapper">
      <header className="favorites-header">
        <h1 className="favorites-title">My Favorites</h1>
        <p className="favorites-parag">
          Easily and conveniently find all your favorite recipes in one place!
          Click <Favorite/> icon to remove a recipe!
        </p>
      </header>
      <MealCard data={mealData?.favorites}/>
    </section>
  );
}

export default Favorites;
