import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ThemeAppContext } from "../../App";

import "../Navbar/navbar.css";
import { Close, FavoriteBorder, Menu } from "@mui/icons-material";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
function Navbar() {
  const { isDark } = useContext(ThemeAppContext);
  const [isOpen, setOpen] = useState(false);
  const handleMenu = () => {
    setOpen(!isOpen);
  };
  const navLinks = [
    { id: 1, text: "Home", path: "/" },
    { id: 2, text: "Categories", path: "/categories" },
    { id: 3, text: "Contact", path: "/contact" },
  ];
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);
  return (
    <header className="header-wrapper">
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
            return (
              <li key={link.id} className="nav-item">
                <NavLink
                  to={link.path}
                  className={`nav-link ${!isDark && "light-text"}`}
                  activeClassName="active"
                >
                  {link.text}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="themeSwitch-contanct-wrapper desktop">
        <Link
          to="/favorites"
          className={`nav-favorites ${!isDark && "light-text"}`}
        >
          <FavoriteBorder fontSize="large" className="heart-icon" />
        </Link>
        <ThemeSwitch />
      </div>

      <div
        className={`mask ${isOpen && "show"}`}
      >
        <div className={`inner-mask ${!isDark && "light-inner-mask-bg"}`}></div>
      </div>
    </header>
  );
}

export default Navbar;
