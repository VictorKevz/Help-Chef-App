import React, { useContext } from "react";
import { DataContext } from "../../../App";
import MealCard from "../../../components/MealCard/MealCard";
import "../../../styles/detailsPage.css"
import { data } from "framer-motion/client";
function RelatedMeal({mealName}) {
  const { mealData } = useContext(DataContext);
 const data = mealData?.singleCategoryData?.filter((meal) => meal.strMeal !== mealName)?.slice(2, 5)
  return (
    <>
      {mealData?.singleCategoryData?.length > 3 && (
        <section className="relatedMeal-wrapper wrapper">
          <h2 className="relatedMeal-title">Related Meals</h2>
          <MealCard data={data} />
        </section>
      )}
    </>
  );
}

export default RelatedMeal;
