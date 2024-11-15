import React, { useContext, useState } from "react";
import { DataContext, ThemeAppContext } from "../../App";
import "../../styles/mainCategory.css";
import { Link } from "react-router-dom";
import { ArrowForwardIos, Search } from "@mui/icons-material";

function MainCategory() {
  const [query, setQuery] = useState("");
  const { mealData } = useContext(DataContext);
  const { isDark } = useContext(ThemeAppContext);

  const filteredData = mealData?.categoriesData.filter((category)=>category?.strCategory.toLowerCase().includes(query))
  return (
    <section className={`main-category-wrapper wrapper`}>
      <header className="mainCategory-bg">
        <div className="mainCategoryText">
          <h1 className="categories-title">Explore Our Categories</h1>
          <p className="main-parag">
            Discover a world of flavors with our diverse recipe categories. From
            quick breakfasts to indulgent desserts, find the perfect dish for
            any occasion.
          </p>
        </div>
        {/* <div className="overlay"></div> */}
      </header>
      <div className="mainCategory-container">
        <div className="main-category-filters">
          <div className="breadcrumbs-wrapper">
            <Link to="/" className="breadcrumb">
              Home
            </Link>
            <ArrowForwardIos />
            <p className="categories">Categories</p>
          </div>
          <fieldset className="mainCategory-field">
            <label htmlFor="mainC-search" className="mainCategory-label">
            <input
              type="text"
              id="mainC-search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value.toLowerCase());
              }}
              className="mainCategory-input"
              placeholder="Search categories by name..."
            />
            </label>
            <span className="search-icon-wrapper">
              <Search fontSize="large" className="search-icon"/>
            </span>
          </fieldset>
        </div>
        <div className={`inner-main-category`}>
          <div className="main-categories-grid">
            {filteredData?.map((category) => {
              return (
                <Link
                  to={`/${category?.strCategory}`}
                  key={category?.idCategory}
                  className={`main-category-card ${!isDark && "light-card"}`}
                  style={{
                    backgroundImage: `url(${category?.strCategoryThumb})`,
                  }}
                >
                  <h3 className={`category-card-title `}>
                    {category?.strCategory}
                  </h3>
                  <div className="overlay main"></div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainCategory;
