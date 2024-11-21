import React, { useContext, useEffect, useState } from "react";
import searchImg from "../../../../assets/images/search.svg";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import "./searchSection.css";
import { DataContext, ThemeAppContext } from "../../../../App";
import { Link } from "react-router-dom";
import { Launch } from "@mui/icons-material";

export default function SearchSection() {
  const { fetchData, mealData } = useContext(DataContext);
  const { isDark } = useContext(ThemeAppContext);
  const [capturedQuery, setCapturedQuery] = useState("");

  const formattedQuery = capturedQuery
    ?.split(",")
    ?.map((q) => q.trim())
    .join(",");
  // 	1.	Split the string into an array based on commas.
  // 2.	Map over that array to trim each individual element.
  // 3.	Turn the array into a single string, with commas separating the elements.

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (formattedQuery?.trim() !== "" && formattedQuery.length > 0) {
        const apiKey = import.meta.env.VITE_API_KEY;
        const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${formattedQuery}&number=4`;
        fetchData(url, "searchResults");
      }
    }, 300); // 300ms debounce time

    return () => clearTimeout(debounceTimer); // Clear timeout on cleanup
  }, [formattedQuery]);
  const isSearched = mealData?.searchResults?.length > 0;
  return (
    <section className={`searchSection-wrapper ${ isSearched && "searched"} ${ isSearched && !isDark && "searched-light"}`}>
      <div
        className={`searchSection-inner-container ${
          !isDark && "light-cards-bg"
        }`}
      >
        <header className="searchSection-header">
          <div className={`searchSection-text ${!isDark && "light-text"}`}>
            <h2 className="searchSection-title">Not sure what to cook?</h2>
            <p className="searchSection-parag">
              With our smart search you can use ingridients to search for
              recipes
            </p>
            <p className="search-instructions">
              Please enter ingridients separated by a comma:
              <span className="strong-text">flour, sugar, butter...</span>
            </p>
          </div>
          <img
            src={searchImg}
            alt="Search illustration"
            className="search-img"
          />
        </header>
        <SearchBar setCapturedQuery={setCapturedQuery} placeholder={"Search recipes by ingredients.."} />
      </div>

      {mealData?.isLoading && capturedQuery && <p>Loading Data....</p>}
      {mealData?.error && <p>Error Occured: {mealData?.error}</p>}
      <div className="searchSection-results">
        {mealData?.searchResults?.map((meal) => (
          <Link
            key={meal?.id}
            to={`/search/${meal?.id}`}
            className="result-card"
          >
            <div
              className="result-bg"
              style={{ backgroundImage: `url(${meal?.image})` }}
            ></div>
            {/* <img src={meal?.image} alt="" className="result-img" /> */}
            <div className="result-text">
            <h3 className="result-title">{meal?.title}</h3>
            <button type="button" className="result-btn">
              <Launch className="launch-icon" fontSize="large" />
            </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
