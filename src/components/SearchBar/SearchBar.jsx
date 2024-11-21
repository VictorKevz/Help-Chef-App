import React, { useContext, useEffect } from "react";
import { DataContext, ThemeAppContext } from "../../App";
import { Close, Search } from "@mui/icons-material";
import "./search.css";
import { useLocation } from "react-router-dom";

function SearchBar() {
  const { search, dispatchSearch } = useContext(DataContext);
  const { isDark } = useContext(ThemeAppContext);

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    if (search.query.trim() && search.query.length > 3) {
      dispatchSearch({
        type: "CAPTURE_QUERY",
        payload: { query: search.query },
      });
    } else {
      dispatchSearch({type:"SHOW_ERROR"})
      return;
    }
  };

  

  // Reset search state when the location changes
  const location = useLocation();
  useEffect(() => {
    dispatchSearch({ type: 'CLEAR_SEARCH' });
  }, [location]);
  // Reset search state when the location changes

  return (
    <form className="search-form" onSubmit={handleQuerySubmit}>
      <fieldset className="search-field">
        <label htmlFor="search" className="search-label">
          <input
            type="text"
            id="search"
            value={search.query}
            onChange={(e) => {
              dispatchSearch({
                type: "UPDATE_QUERY",
                payload: { value: e.target.value },
              });
              
            }}
            className={`search-input ${!isDark && "light-input"} ${!search.queryValid && "error-border"}`}
            placeholder="Search categories by name..."
          />
          
        </label>
        {!search.queryValid && <span className="error-message search">Please provide a valid query</span>}
      </fieldset>
      <button
            type="button"
            onClick={() => dispatchSearch({ type: "CLEAR_SEARCH" })}
            className={`search-clear-btn ${search.query && "show"}`}
          >
            <Close fontSize="large" className={`clear-icon ${!isDark && "light-text"}`} />
          </button>
      <button type="submit" className={`search-btn `}>
        <Search fontSize="large" className="search-icon" />
      </button>
    </form>
  );
}

export default SearchBar;
