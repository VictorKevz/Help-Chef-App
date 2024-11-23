import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { DataContext, ThemeAppContext } from "../../App";
import "../../styles/searchedRecipe.css";
import checklist from "../../assets/images/checklist.svg";
import { Check } from "@mui/icons-material";
function SearchedRecipe() {
  const [stepsDone, setStepsDone] = useState([]);
  const [isClicked, setClicked] = useState(false);
  const { fetchData, mealData } = useContext(DataContext);
  const { isDark } = useContext(ThemeAppContext);
  const { id } = useParams();

  const updateStepsDone = (currentStepIndex) => {
    setStepsDone((prevSteps) => {
      const isDone = prevSteps.includes(currentStepIndex);
      if (isDone) {
        return prevSteps.filter((step) => step !== currentStepIndex);
      } else {
        return [...prevSteps, currentStepIndex];
      }
    });
  };
  const data = mealData?.searchedRecipe;
  const location = useLocation();
  useEffect(() => {
    setStepsDone([]);
  }, [location]);
  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
    fetchData(url, "searchedRecipe");
  }, [id]);

  if (!mealData?.searchedRecipe && mealData?.isLoading) {
    return <p>Loading....</p>;
  }
  if (mealData?.error) {
    return <p>An error Occured {mealData?.error}</p>;
  }

  const summary = data?.summary;
  const plainText = summary?.replace(/<\/?b>/g, "");
  const finalSummary = plainText?.split(".").slice(0, 5).join(".");
  return (
    <section className="searchedRecipe-wrapper wrapper">
      <header className="detailsPage-header">
        <div className="detailsPage-text-wrapper searchedRecipe">
          <ul className="dish-wrapper">
            {data?.dishTypes?.slice(0, 3)?.map((dish, i) => (
              <li key={i} className="dish">
                {dish}
              </li>
            ))}
          </ul>
          <h1 className="recipe-title">{data?.title}</h1>
        </div>
        <div className="detailsPage-img-wrapper">
          <img
            src={data?.image}
            alt={`Image of ${data?.title}`}
            className="detailsPage-img"
          />
        </div>
        <div className="overlay detailsPage"></div>
      </header>
      <p className="recipe-parag">{finalSummary}.</p>
      {/* 
      .
      .
      Equpment Section
      .
      .
      */}

      <section className="equip-wrapper">
        <h2 className="equip-title">Equipment</h2>

        <ul className="equip-list">
          {data?.analyzedInstructions?.[0]?.steps
            ?.slice(0, 5)
            ?.filter((step) => step?.equipment?.length > 0) // Only include steps with equipment
            ?.map((step, stepIndex) => (
              <li key={stepIndex} className="equip-item">
                {step?.equipment?.map((equipment, eqIndex) => (
                  <div key={eqIndex} className="equip-details">
                    <img
                      src={equipment?.image}
                      alt={equipment?.localizedName}
                      className="equip-img"
                    />
                    <span className="name">
                      {equipment?.localizedName.toUpperCase()}
                    </span>
                  </div>
                ))}
              </li>
            ))}
        </ul>
      </section>
      {/* 
      .
      .
      Steps Section
      .
      .
      */}
      <div className="steps-ingredients-wrapper">
        <section className="steps-section">
          <h2 className="equip-title step-title">Instructions</h2>
          <ul
            className={`steps-wrapper searchedRecipe ${
              !isDark && "light-text"
            }`}
          >
            {data?.analyzedInstructions?.[0]?.steps?.map((step, i) => {
              const isDone = stepsDone.includes(i);
              return (
                <li key={i} className="step" onClick={() => updateStepsDone(i)}>
                  <button
                    type="button"
                    className={`step-num ${isDone && "marked"}`}
                  >
                    {step?.number}
                  </button>
                  <p className={`step-parag ${isDone && "done"}`}>
                    {step?.step}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
        {/* 
      .
      .
      Ingredients Section
      .
      .
      */}
        <section className="ingredients-section">
          <h2 className="equip-title step-title">Ingredients</h2>
          <ul className={`measures-wrapper `}>
            <img src={checklist} alt="" className={`checklist-img `} />
            {data?.extendedIngredients?.map((item, i) => (
              <li key={i} className="measure-item">
                <span className="check-wrapper">
                  <Check fontSize="medium" />
                </span>
                {item?.measures?.metric?.amount?.unitShort} - {item?.nameClean}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}

export default SearchedRecipe;
