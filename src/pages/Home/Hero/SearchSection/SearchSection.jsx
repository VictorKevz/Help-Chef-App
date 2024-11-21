import React, { useContext, useEffect } from "react";
import searchImg from "../../../../assets/images/search.svg";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import "./searchSection.css";
import { DataContext, ThemeAppContext } from "../../../../App";
import { Link } from "react-router-dom";
import { Launch } from "@mui/icons-material";

export default function SearchSection() {
  const { fetchData, search, mealData } = useContext(DataContext);
  const { isDark } = useContext(ThemeAppContext);


  const formattedQuery = search?.capturedQuery
    ?.split(",")
    ?.map((q) => q.trim());

//   useEffect(() => {
//     const apiKey = import.meta.env.VITE_API_KEY;
//     const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${formattedQuery}&number=${3}`;
//     if(formattedQuery?.some(item => item?.trim() !== "") && formattedQuery?.length > 0){
//         fetchData(url, "searchResults");
//     }
//   }, [formattedQuery]);

  return (
    <section className="searchSection-wrapper">
      <header className="searchSection-header">
        <div className="searchSection-text">
          <h2 className="searchSection-title">Not sure what to cook?</h2>
          <p className="searchSection-parag">
            With our smart Use ingridients to search for recipes
          </p>
          <p className="search-instructions">
            Please enter ingridients separated by a comma:
            <span className="strong-text">flour, sugar, butter...</span>
          </p>
        </div>
        <img src={searchImg} alt="Search illustration" className="search-img" />
      </header>
      <SearchBar />
      {/* <div className="searchSection-results">
        {mealData?.searchResults?.map((meal) => (
          <Link key={meal?.id} to={`/search/${meal?.id}`}>
            <img src={meal?.image} alt="" className="searched-img" />
            <h3 className="searched-title">{meal?.title}</h3>
            <button type="button" className="launch-btn">
              <Launch className="launch-icon" fontSize="large" />
            </button>
          </Link>
        ))}
      </div> */}
    </section>
  );
}
