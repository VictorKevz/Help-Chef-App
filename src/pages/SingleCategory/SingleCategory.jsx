import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext, ThemeAppContext } from "../../App";
import "../../styles/singleCategory.css";
import { ArrowForwardIos } from "@mui/icons-material";
import MealCard from "../../components/MealCard/MealCard";

function SingleCategory() {
  const [isLimited, setLimited] = useState(true);
  const { categoryName } = useParams();
  const { mealData, fetchData } = useContext(DataContext);
  const { isDark } = useContext(ThemeAppContext);
  const dynamicCategoryObj = mealData?.categoriesData.find(
    (obj) => obj?.strCategory === categoryName
  );
  useEffect(() => {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`;
    fetchData(url, "singleCategoryData");
  }, [categoryName]);

  const breadcrumbs = [
    { id: 1, path: "/", text: "Home" },
    { id: 2, path: "/categories", text: "Categories" },
    { id: 3, path: `/${categoryName}`, text: categoryName },
  ];
  //  Manipulating Text ....................................
  const parag = dynamicCategoryObj?.strCategoryDescription?.replace(
    /\[\d+\]/g,
    ""
  );
  const limitedText = parag?.split(".").slice(0, 2).join("");
  const textToShow = isLimited ? limitedText : parag;
  const sentencesLength = parag
    .split(".")
    .filter((sentence) => sentence.trim() !== "").length;
  //  Manipulating Text ....................................

  const isRound = categoryName === "Goat" || categoryName === "Breakfast";
  if (mealData?.isLoading) {
    return <p className="loading">Please wait a second...</p>;
  }
  if (mealData?.error) {
    return <p className="loading">An error occurred! {mealData.error}</p>;
  }
  return (
    <section className="singleCategory-wrapper wrapper">
      <div className="breadcrumbs-wrapper">
        {breadcrumbs.map((link) => {
          const isCurrent = link.text === categoryName;
          return (
            <Link
              key={link.id}
              to={link.path}
              className={`breadcrumb ${!isDark && "light-text"} ${
                isCurrent && "disabled"
              }`}
            >
              {link.text}
              {link.id !== 3 && (
                <ArrowForwardIos
                  className={`arrow-icon ${!isDark && "light-text"}`}
                />
              )}
            </Link>
          );
        })}
      </div>
      <header
        className={`singleCategory-header-wrapper ${
          !isDark && "light-cards-bg"
        }`}
      >
        <div className="header-text">
          <h1
            className={`singleCategory-title ${!isDark && "light-title"} ${
              dynamicCategoryObj?.strCategory === "Miscellaneous" &&
              "miscellaneous"
            }`}
            style={{
              backgroundImage: `url(${dynamicCategoryObj?.strCategoryThumb})`,
            }}
          >
            {dynamicCategoryObj?.strCategory}
          </h1>
          <p className={`singleCategory-parag ${!isDark && "light-text"}`}>
            {sentencesLength > 3 ? textToShow : parag}.
            {sentencesLength > 3 && (
              <button
                type="button"
                className="text-btn"
                onClick={() => setLimited(!isLimited)}
              >
                {isLimited ? "Read More..." : "Collapse"}
              </button>
            )}
          </p>
        </div>

        <img
          src={dynamicCategoryObj?.strCategoryThumb}
          alt=""
          className={`singleCategory-header-img ${isRound && "rounded"}`}
        />
      </header>
      <MealCard data={mealData?.singleCategoryData} />
    </section>
  );
}

export default SingleCategory;
