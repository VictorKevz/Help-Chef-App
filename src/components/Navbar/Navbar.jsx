import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { DataContext, ThemeAppContext } from "../../App";
import "../Navbar/navbar.css";
import {
  Close,
  FavoriteBorder,
  KeyboardArrowDown,
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
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);
  
  const favoritesCount = mealData?.favorites?.length;
  return (
    <header className={`header-wrapper ${!isDark && "light-body-bg"}`}>
      <nav className="nav-wrapper">
        <button type="button" className="toggle-menu-btn" onClick={handleMenu}>
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
        <ul className={`links-wrapper ${isOpen && "show"}`}>
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
                  activeClassName="active"
                >
                  {link.text}
                  {isCategory && (
                    <KeyboardArrowDown
                      className={`category-arrow`}
                      fontSize="large"
                    />
                  )}
                </NavLink>
              </li>
            );
          })}
          {dropDownOpen && (
            <Dropdown setDropDown={setDropDown} setOpen={setOpen} />
          )}
        </ul>
      </nav>

      <div className="themeSwitch-contanct-wrapper desktop">
        <Link
          to="/favorites"
          className={`nav-favorites  ${favoritesCount && "filled"}`}
        >
          <FavoriteBorder fontSize="large" className="heart-icon" />
          {favoritesCount > 0 && (
            <span className="fav-count">{favoritesCount}</span>
          )}
        </Link>
        <ThemeSwitch />
      </div>

      <div className={`mask ${isOpen && "show"}`}>
        <div className={`inner-mask ${!isDark && "light-inner-mask-bg"}`}></div>
      </div>
    </header>
  );
}

export default Navbar;
