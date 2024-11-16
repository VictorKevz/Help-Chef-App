import React, { useContext, useState } from "react";
import "./instructions.css";
import { Add, Remove } from "@mui/icons-material";
import { ThemeAppContext } from "../../../App";
function Instructions({ data }) {
  const [stepsDone, setStepsDone] = useState([]);
  const [isClicked, setClicked] = useState(false);
  const{isDark} = useContext(ThemeAppContext)

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
  const steps = data?.strInstructions
    .split("\r\n")
    .filter((step) => step.trim() !== "");

  return (
    <div className={`instructions-wrapper ${!isDark && "light-cards-bg"}`}>
      <header className={`instructions-header `}>
        <h2 className="instructions-title">Instructions</h2>
        <p className="instructions-parag">
          Follow these simple instructions to get started!
        </p>
        <button
          type="button"
          className={`note-btn ${isClicked && "marked"}`}
          onClick={() => setClicked(!isClicked)}
        >
          {isClicked ? (
            <Remove fontSize="large" className="note-icon" />
          ) : (
            <Add fontSize="large" className="note-icon" />
          )}
        </button>
        {isClicked && (
          <span className="note">
            Note: Click a step to mark it done or undo!
          </span>
        )}
        <div className="overlay instructions"></div>
      </header>

      <ul className={`steps-wrapper ${!isDark && "light-text"}`}>
        {steps?.map((step, i) => {
          const isDone = stepsDone.includes(i);
          return (
            <li key={i} className="step" onClick={() => updateStepsDone(i)}>
              <button type="button" className={`step-num ${isDone && "marked"}`}>
                {i + 1}
              </button>
              <p className={`step-parag ${isDone && "done"}`}>{step}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Instructions;
