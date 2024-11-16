import React from "react";
import "../measuresYoutube.css"
import checklist from "../../../assets/images/checklist.svg"
import { Check } from "@mui/icons-material";
function Measures({ data }) {
  const measuresData = [];
  for (let i = 1; i <= 20; i++) {
    const ingridient = data?.[`strIngredient${i}`];
    const measure = data?.[`strMeasure${i}`];

    if (ingridient && measure) {
      measuresData.push({ ingridient, measure });
    }
  }
  const showGrid = measuresData?.length > 10;
  return (
    <ul className={`measures-wrapper ${showGrid && "grid"}`}>
        <h2 className="measures-title">Ingridients</h2>
        <img src={checklist} alt="" className={`checklist-img ${showGrid && "grid"}`} />
      {measuresData?.map((item, i) => (
        <li key={i} className="measure-item">
          <span className="check-wrapper"><Check fontSize="medium"/></span>{item.measure} - {item.ingridient}
        </li>
      ))}
    </ul>
  );
}

export default Measures;
