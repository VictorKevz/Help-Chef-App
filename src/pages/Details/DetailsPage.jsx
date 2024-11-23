import React, { useContext, useEffect } from "react";
import "../../styles/detailsPage.css";
import { DataContext, ThemeAppContext } from "../../App";
import { Link, useParams } from "react-router-dom";
import {  motion } from "framer-motion";

import {
  ArrowForwardIos,
  Category,
  Label,
  Language,
} from "@mui/icons-material";
import Instructions from "./Instructions/Instructions";
import YoutubeVideo from "./YoutubeVideo/YoutubeVideo";
import Measures from "./Measures/Measures";
import RelatedMeal from "./RelatedMeals/RelatedMeal";
import AddFavoritesBtn from "../../components/AddFavoritesBtn/AddFavoritesBtn";
import { sideVariants } from "../../variants";

function DetailsPage() {
  const { mealData, fetchData } = useContext(DataContext);
  const { isDark } = useContext(ThemeAppContext);
  const { mealName } = useParams();
  const dataObj = mealData?.singleMealData[0];

  const breadcrumbs = [
    { id: 1, path: "/", text: "Home" },
    {
      id: 2,
      path: `/categories/${dataObj?.strCategory}`,
      text: dataObj?.strCategory,
    },
    {
      id: 3,
      path: `/meals/${dataObj?.strMeal}`,
      text: `${dataObj?.strMeal.split(" ").slice(0, 2).join(" ")}...`,
    },
  ];
  useEffect(() => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    fetchData(url, "singleMealData");
  }, [mealName]);
  return (
    <section className={`detailsPage-wrapper wrapper ${!isDark && "light-body-bg"}`}>
      <div className="like-breadcrumbs-wrapper">
      <div className="breadcrumbs-wrapper details">
        {breadcrumbs.map((link) => {
          const isCurrent = link.id === 3;
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
      <AddFavoritesBtn meal={dataObj}/>
      </div>
      <motion.header 
      className="detailsPage-header"
      variants={sideVariants("left")}
      initial="initial"
      whileInView="animate"
      exit="exit"
      viewport={{ once: false, amount: 0.2 }}
      >
        <div className="detailsPage-text-wrapper">
          <p className="category">{dataObj?.strCategory}</p>
          <h1 className="detailsPage-title">{dataObj?.strMeal}</h1>
        </div>
        <div className="detailsPage-img-wrapper">
          <img
            src={dataObj?.strMealThumb}
            alt={`Image of ${dataObj?.strMeal}`}
            className="detailsPage-img"
          />
        </div>
        <div className="overlay detailsPage"></div>
      </motion.header>
      <ul className="tags-category-wrapper">
        <li className={`item ${!isDark && "light-text"}`}>
          <span className="icon-wrapper">
            <Category fontSize="large" className="item-icon" />
          </span>

          <h3 className="text">
            Category
            <span className="value">{dataObj?.strCategory}</span>
          </h3>
        </li>
        <li className="divider"></li>
        <li className={`item ${!isDark && "light-text"}`}>
          <span className="icon-wrapper">
            <Language fontSize="large" className="item-icon" />
          </span>

          <h3 className="text">
            Area
            <span className="value">{dataObj?.strArea}</span>
          </h3>
        </li>
        {dataObj?.strTags !== null && <li className="divider"></li>}

        {dataObj?.strTags !== null && (
          <li className={`item ${!isDark && "light-text"}`}>
            <span className="icon-wrapper">
              <Label fontSize="large" className="item-icon" />
            </span>

            <h3 className="text">
              Tags
              <span className="value">
                {dataObj?.strTags.split(",").slice(0, 2).join(", ")}
              </span>
            </h3>
          </li>
        )}
      </ul>
      <section className="detailsPage-content-wrapper">
        <motion.aside 
        className="left-side"
        variants={sideVariants("left")}
        initial="initial"
        whileInView="animate"
        exit="exit"
        
        viewport={{ once: false, amount: 0.2 }}
        >
          <Instructions data={dataObj} />
        </motion.aside>
        <motion.aside 
        className="right-side"
        variants={sideVariants("right")}
        initial="initial"
        whileInView="animate"
        exit="exit"
        >
          <Measures data={dataObj} />
          <YoutubeVideo url={dataObj?.strYoutube} />
        </motion.aside>
      </section>
      <RelatedMeal mealName={mealName}/>
      {/* <img src={pattern} alt="" className="pattern-img details" /> */}
    </section>
  );
}

export default DetailsPage;
