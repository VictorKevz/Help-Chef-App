import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { DataContext, ThemeAppContext } from "../../App";
import "../Navbar/navbar.css";
import {
  Close,
  FavoriteBorder,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Menu,
} from "@mui/icons-material";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import Dropdown from "./Dropdown/Dropdown";

function Navbar() {
  const { isDark } = useContext(ThemeAppContext);
  const { mealData } = useContext(DataContext);
  const [isOpen, setOpen] = useState(false);
  const [dropDownOpen, setDropDown] = useState(false);
  const handleMenu = () => {
    setOpen(!isOpen);
  };
  const navLinks = [
    { id: 1, text: "Home", path: "/" },
    { id: 2, text: "Categories", path: "#" },
    { id: 3, text: "Contact", path: "/contact" },
  ];
  const handleDropDown = (isCategory) => {
    if (isCategory) {
      setDropDown(!dropDownOpen);
    } else {
      setOpen(false);
    }
  };
 
  const favoritesCount = mealData?.favorites?.length;
  return (
    <header className={`header-wrapper ${!isDark && "light-cards-bg"}`}>
  <nav className="nav-wrapper" aria-label="Primary Navigation">
    <button
      type="button"
      className="toggle-menu-btn"
      onClick={handleMenu}
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {isOpen ? (
        <Close
          fontSize="large"
          className={`menu-icon ${!isDark && "light-text"}`}
        />
      ) : (
        <Menu
          fontSize="large"
          className={`menu-icon ${!isDark && "light-text"}`}
        />
      )}
    </button>
    <h1 className={`logo ${!isDark && "light-text"}`}>
      Help <span className="dot"></span> Chef<span className="dot"></span>
    </h1>
    <ul className={`links-wrapper ${isOpen && "show"}`} aria-label="Navigation Links">
      {navLinks.map((link) => {
        const isCategory = link.id === 2;
        return (
          <li
            key={link.id}
            className="nav-item"
            onClick={() => handleDropDown(isCategory)}
          >
            <NavLink
              to={link.path}
              className={`nav-link ${!isDark && "light-text"}`}
              aria-label={link.text}
            >
              {link.text}
              {isCategory && !dropDownOpen && (
                <KeyboardArrowDown
                  className={`category-arrow`}
                  fontSize="large"
                  aria-hidden="true"
                />
              )}
              {isCategory && dropDownOpen && (
                <KeyboardArrowUp
                  className={`category-arrow`}
                  fontSize="large"
                  aria-hidden="true"
                />
              )}
            </NavLink>
          </li>
        );
      })}
      {dropDownOpen && (
        <Dropdown
          dropDownOpen={dropDownOpen}
          setDropDown={setDropDown}
          setOpen={setOpen}
          aria-label="Category Dropdown"
        />
      )}
    </ul>
  </nav>

  <div className="themeSwitch-contanct-wrapper desktop">
    <Link
      to="/favorites"
      className={`nav-favorites ${favoritesCount && "filled"}`}
      aria-label={`Favorites ${favoritesCount > 0 ? `(${favoritesCount} items)` : ""}`}
    >
      <FavoriteBorder fontSize="large" className="heart-icon" aria-hidden="true" />
      {favoritesCount > 0 && (
        <span className="fav-count" aria-live="polite">
          {favoritesCount}
        </span>
      )}
    </Link>
    <ThemeSwitch aria-label="Toggle theme" />
  </div>

  <div
    className={`mask ${isOpen && "show"}`}
    aria-hidden={!isOpen}
    aria-label="Menu Mask"
  >
    <div className={`inner-mask ${!isDark && "light-inner-mask-bg"}`}></div>
  </div>
</header>
  );
}

export default Navbar;
