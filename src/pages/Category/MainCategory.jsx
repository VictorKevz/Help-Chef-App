import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { DataContext, ThemeAppContext } from "../../App";
import "../../styles/mainCategory.css";
import { Link } from "react-router-dom";
import { ArrowForwardIos } from "@mui/icons-material";
import SearchBar from "../../components/SearchBar/SearchBar";
import { productCardVariants, verticalVariants } from "../../variants";

function MainCategory() {
  const { mealData } = useContext(DataContext);
  const [capturedQuery, setCapturedQuery] = useState("");
  const { isDark } = useContext(ThemeAppContext);

  const filteredData = mealData?.categoriesData.filter((category) =>
    category?.strCategory.toLowerCase().includes(capturedQuery?.toLowerCase())
  );
  const dataToShow =
    capturedQuery?.trim() === "" ? mealData?.categoriesData : filteredData;

  if (!mealData?.categoriesData || mealData?.categoriesData.length === 0) {
    return <p>Loading...</p>;
  }
  if (mealData?.error) {
    return <p>An error occurred{mealData?.error}</p>;
  }
  return (
    <section
      className={`main-category-wrapper wrapper ${!isDark && "light-body-bg"}`}
    >
      <motion.header
        key={mealData?.categoriesData}
        className="mainCategory-bg"
        variants={verticalVariants("bottom")}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.1 }}
        exit="exit"
      >
        <div className="mainCategoryText">
          <h1 className="categories-title">Explore Our Categories</h1>
          <p className="main-parag">
            Discover a world of flavors with our diverse recipe categories. From
            quick breakfasts to indulgent desserts, find the perfect dish for
            any occasion.
          </p>
        </div>
      </motion.header>
      <div className={`mainCategory-container ${!isDark && "light-body-bg"}`}>
        <div className="breadcrumbs-search-wrapper">
          <div className="breadcrumbs-wrapper main">
            <Link to="/" className={`breadcrumb ${!isDark && "light-text"}`}>
              Home
            </Link>
            <ArrowForwardIos className={`${!isDark && "light-text"}`} />
            <p className="categories">Categories</p>
          </div>
          <div className="searchBar-wrapper">
            <SearchBar
              setCapturedQuery={setCapturedQuery}
              placeholder={"Search recipes by category.."}
            />
          </div>
        </div>
        <div className={`inner-main-category`}>
          <div className="main-categories-grid">
            {dataToShow?.map((category, index) => {
              return (
                <motion.div
                  className={`main-category-card ${!isDark && "light-card"}`}
                  style={{
                    backgroundImage: `url(${category?.strCategoryThumb})`,
                  }}
                  key={category?.idCategory}
                  variants={productCardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  custom={index}
                  exit="exit"
                >
                  <Link
                    to={`/categories/${category?.strCategory}`}
                    
                  >
                    <h3 className={`category-card-title `}>
                      {category?.strCategory}
                    </h3>
                    <div className="overlay main"></div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainCategory;
