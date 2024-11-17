import React, { useContext, useEffect } from "react";
import { DataContext } from "../../../App";
import { NavLink } from "react-router-dom";
import "./dropdown.css";
function Dropdown({ setDropDown,setOpen }) {
  const { mealData, fetchData } = useContext(DataContext);

const handleDropDown = () => {
  setDropDown(false)
  setOpen(false);
}

  useEffect(() => {
    const url = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";

    if (mealData?.categoryList?.length === 0) {
      fetchData(url, "categoryList");
    }
  }, []);
  return (
    <ul className="dropdown-wrapper"onClick={handleDropDown}>
      <li className="category-item" >
        <NavLink to="/categories" className="category-link">
          All
        </NavLink>
      </li>
      {mealData.categoryList.map((link) => {
        return (
          <li
            key={link.strCategory}
            className="category-item"
            
          >
            <NavLink
              to={`/categories/${link.strCategory}`}
              className="category-link"
            >
              {link.strCategory}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}

export default Dropdown;
