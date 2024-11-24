import React, { useContext, useEffect, useState } from "react";
import { DataContext, ThemeAppContext } from "../../App";
import { Close, Search } from "@mui/icons-material";
import "./search.css";
import { useLocation } from "react-router-dom";

function SearchBar({ setCapturedQuery, placeholder }) {
  const { dispatchMeal } = useContext(DataContext);
  const { isDark } = useContext(ThemeAppContext);
  const [query, setQuery] = useState("");
  const [isValid, setValid] = useState(true);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setValid(true);
  };
  const handleQuerySubmit = (e) => {
    e.preventDefault();
    if (query.trim() && query.length > 3) {
      setCapturedQuery(query);
    } else {
      setValid(false);
      return;
    }
  };
  const clearSearch = () => {
    setQuery("");
    setCapturedQuery("");
    setValid(true);
    dispatchMeal({ type: "CLEAR_RESULTS" });
  };
  // Reset search state when the location changes
  const location = useLocation();
  useEffect(() => {
    clearSearch();
  }, [location]);
  // Reset search state when the location changes

  return (
    <form className="search-form" onSubmit={handleQuerySubmit} role="search">
  <fieldset className="search-field">
    <legend className="visually-hidden">Search for recipes</legend>
    <label htmlFor="search" className="search-label visually-hidden">
      Enter your search query
    </label>
    <input
      type="text"
      id="search"
      value={query}
      onChange={handleChange}
      className={`search-input ${!isDark && "light-input"} ${
        !isValid && "error-border"
      }`}
      placeholder={placeholder}
      aria-invalid={!isValid}
      aria-describedby="search-error"
    />
    {!isValid && (
      <span
        id="search-error"
        className="error-message search"
        role="alert"
      >
        Please provide a valid query
      </span>
    )}
    <button
      type="button"
      onClick={clearSearch}
      className={`search-clear-btn ${query && "show"}`}
      aria-label="Clear search query"
    >
      <Close
        fontSize="large"
        className={`clear-icon ${!isDark && "light-text"}`}
        aria-hidden="true"
      />
    </button>
  </fieldset>

  <button
    type="submit"
    className={`search-btn`}
    aria-label="Submit search query"
  >
    <span className="search-text">Search</span>
    <Search fontSize="large" className="search-icon" aria-hidden="true" />
  </button>
</form>
  );
}

export default SearchBar;
