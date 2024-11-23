import React, { useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { DataContext, ThemeAppContext } from "../../../App";
import { NavLink } from "react-router-dom";
import "./dropdown.css";
import { verticalVariants } from "../../../variants";
function Dropdown({ dropDownOpen, setDropDown, setOpen }) {
  const { mealData, fetchData } = useContext(DataContext);
  const { isDark } = useContext(ThemeAppContext);

  const handleDropDown = () => {
    setDropDown(false);
    setOpen(false);
  };

  useEffect(() => {
    const url = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";

    if (mealData?.categoryList?.length === 0) {
      fetchData(url, "categoryList");
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(
      "categoryList",
      JSON.stringify(mealData?.categoryList)
    );
  }, [mealData?.categoryList]);
  return (
    <AnimatePresence mode="wait">
      <motion.ul
        className={`dropdown-wrapper ${!isDark && "light-cards-bg"}`}
        onClick={handleDropDown}
        key={dropDownOpen}
        variants={verticalVariants("bottom")}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <li className="category-item">
          <NavLink
            to="/categories"
            className={`category-link ${!isDark && "light-text"}`}
          >
            All
          </NavLink>
        </li>
        {mealData.categoryList.map((link) => {
          return (
            <li key={link.strCategory} className="category-item">
              <NavLink
                to={`/categories/${link.strCategory}`}
                className={`category-link ${!isDark && "light-text"}`}
              >
                {link.strCategory}
              </NavLink>
            </li>
          );
        })}
      </motion.ul>
    </AnimatePresence>
  );
}

export default Dropdown;
