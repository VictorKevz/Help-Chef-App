import React, { useContext, useEffect } from "react";
import "../../styles/detailsPage.css";
import { DataContext } from "../../App";
import { Link, useParams } from "react-router-dom";
import { ArrowForwardIos, Category, Label, Language } from "@mui/icons-material";
function DetailsPage() {
  const { mealData, fetchData } = useContext(DataContext);
  const { mealName } = useParams();
  const dataObj = mealData?.singleMealData[0];
  //   const headingData = [
  //     { id: 0, text: "Area", subject: dataObj?.strArea, icon: Language },
  //     { id: 1, text: "Category", subject: dataObj?.strCategory, icon: Category },
  //     { id: 2, text: "Tags", subject: dataObj?.strTags, icon: Label },
  //   ];
  useEffect(() => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    fetchData(url, "singleMealData");
  }, [mealName]);
  return (
    <section className="detailsPage-wrapper wrapper">
        <div className="breadcrumbs-wrapper">
        <Link to="/" className="breadcrumb">Home</Link>
        <ArrowForwardIos fontSize="large" className="arrow-breadcrumb"/>
        <Link to={`/categories/${dataObj?.strCategory}`} className="breadcrumb">{dataObj?.strCategory}</Link>
        <ArrowForwardIos fontSize="large" className="arrow-breadcrumb"/>
        <Link to={`/meals/${dataObj?.strMeal}`} className="breadcrumb active">{mealName.split(" ").slice(0,2).join(" ")}..</Link>
        </div>
      <header className="detailsPage-header"></header>
      <article className="detailsPage-content-wrapper">
        <div className="left-side-wrapper">
          <h1 className="detailsPage-title">{dataObj?.strMeal}</h1>
          <img
            src={dataObj?.strMealThumb}
            alt={`Image of ${dataObj?.strMeal}`}
            className="detailsPage-img"
          />
        </div>
        <div className="right-side-wrapper">
          <ul className="tags-category-wrapper">
            <li className="item">
              <span className="icon-wrapper">
                <Category fontSize="large" className="item-icon" />
              </span>

              <h3 className="text">
                Category
                <span className="value">{dataObj?.strCategory}</span>
              </h3>
            </li>
            <li className="divider"></li>
            <li className="item">
              <span className="icon-wrapper">
                <Language fontSize="large" className="item-icon" />
              </span>

              <h3 className="text">
                Area
                <span className="value">{dataObj?.strArea}</span>
              </h3>
            </li>
            {dataObj?.strTags !== null && (<li className="divider"></li>)}
            
            {dataObj?.strTags !== null && (
              <li className="item">
                <span className="icon-wrapper">
                  <Label fontSize="large" className="item-icon" />
                </span>

                <h3 className="text">
                  Tags
                  <span className="value">{dataObj?.strTags.split(",").slice(0,2).join(", ")}</span>
                </h3>
              </li>
            )}
          </ul>
        </div>
      </article>
    </section>
  );
}

export default DetailsPage;
