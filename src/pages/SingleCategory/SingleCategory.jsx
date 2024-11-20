import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext, ThemeAppContext } from "../../App";
import "../../styles/singleCategory.css";
import { ArrowForwardIos } from "@mui/icons-material";
import MealCard from "../../components/MealCard/MealCard";
import SearchComponent from "../../components/Search/Search";

function SingleCategory() {
  const [isLimited, setLimited] = useState(true);
  const { categoryName } = useParams();
  const { mealData, fetchData,search } = useContext(DataContext);
  const { isDark } = useContext(ThemeAppContext);

  const dynamicCategoryObj = mealData?.categoriesData.find(
    (obj) => obj?.strCategory.trim() === categoryName.trim()
  );
  useEffect(() => {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`;
    fetchData(url, "singleCategoryData");
  }, [categoryName]);

  const breadcrumbs = [
    { id: 1, path: "/", text: "Home" },
    { id: 2, path: "/categories", text: "Categories" },
    { id: 3, path: `/categories/${categoryName}`, text: categoryName },
  ];
  
  const filteredData = mealData?.singleCategoryData.filter((item) =>
    item?.strMeal?.toLowerCase()?.includes(search.capturedQuery?.toLowerCase())
  );

  const dataToShow =
    search.capturedQuery.trim() === ""
      ? mealData?.singleCategoryData
      : filteredData;
  //  Manipulating Text ....................................
  const parag = dynamicCategoryObj?.strCategoryDescription?.replace(
    /\[\d+\]/g,
    ""
  );
  const sentences = parag
    ?.split(".")
    .filter((sentence) => sentence.trim() !== "");
  const limitedText = sentences.slice(0, 2).join(". ");
  const textToShow = isLimited ? limitedText : parag;
  const sentencesLength = sentences.length;
  //  Manipulating Text ....................................

  const isRound = categoryName === "Goat" || categoryName === "Breakfast";
  if (mealData?.isLoading) {
    return <p className="loading">Please wait a second...</p>;
  }
  if (mealData?.error) {
    return <p className="loading">An error occurred! {mealData.error}</p>;
  }
  return (
    <section
      className={`singleCategory-wrapper wrapper ${!isDark && "light-body-bg"}`}
    >
      <div className="breadcrumbs-search-wrapper">
        <div className="breadcrumbs-wrapper single">
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
        <SearchComponent/>
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
      <MealCard data={dataToShow} />
    </section>
  );
}

export default SingleCategory;
