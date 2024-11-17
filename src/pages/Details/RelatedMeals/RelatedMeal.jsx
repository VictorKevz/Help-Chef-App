import React, { useContext, useMemo } from "react";
import { DataContext, ThemeAppContext } from "../../../App";
import MealCard from "../../../components/MealCard/MealCard";
import "../../../styles/detailsPage.css";

function RelatedMeal({ mealName }) {
  const { mealData } = useContext(DataContext);
  const { isDark } = useContext(ThemeAppContext);

  const shuffledData = useMemo(() => {
    const shuffleData = (data) => {
      for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
      }
      return data;
    };
    return shuffleData([...(mealData?.singleCategoryData || [])]);
  }, [mealData?.singleCategoryData]);

  const filteredData = shuffledData
    ?.filter((meal) => meal.strMeal !== mealName)
    .slice(2, 5);

  return (
    <>
      {mealData?.singleCategoryData?.length > 3 && (
        <section className={`relatedMeal-wrapper wrapper ${!isDark && "light-related-bg"}`}>
          <h2 className={`relatedMeal-title ${!isDark && "light-text"}`}>Related Meals</h2>
          <MealCard data={filteredData} />
        </section>
      )}
    </>
  );
}

export default RelatedMeal;
