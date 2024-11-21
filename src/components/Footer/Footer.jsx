import {
  Facebook,
  Favorite,
  GitHub,
  Instagram,
  LinkedIn,
  LocationCity,
  X,
  YouTube,
} from "@mui/icons-material";
import React, { useContext } from "react";
import "./footer.css";
import CTA from "../CTA/CTA";
import { DataContext, ThemeAppContext } from "../../App";
import { Link } from "react-router-dom";

function Footer() {
  const { isDark } = useContext(ThemeAppContext);
  const { mealData } = useContext(DataContext);

  const filteredData = mealData?.categoriesData.filter(
    (item) => item.strCategory !== "Miscellaneous"
  );

  const mainLinks = [
    { id: 0, path: "#", text: "Pages" },
    { id: 1, path: "/", text: "Home" },
    { id: 2, path: "/categories", text: "Recipes" },
    { id: 3, path: "/favorites", text: "Favorites" },
    { id: 4, path: "/contact", text: "Contact" },
  ];

  const dummyLinks = [
    { id: 0, path: "#", text: "Company" },
    { id: 1, path: "/", text: "About Us" },
    { id: 2, path: "/categories", text: "Careers" },
    { id: 3, path: "/favorites", text: "Legal" },
    { id: 4, path: "/contact", text: "Privacy" },
  ];
  const socialLinks = [
    { id: 0, icon: Facebook },
    { id: 1, icon: Instagram },
    { id: 2, icon: X },
    { id: 3, icon: YouTube },
    { id: 4, icon: LinkedIn },
  ];
  return (
    <section className={`footer-wrapper wrapper ${!isDark && "light-body-bg"}`}>
      <CTA />
      <div className={`footer-container ${!isDark && "light-text"}`}>
        <div className="logo-address-wrapper">
          <h2 className={`logo footer ${!isDark && "light-text"}`}>
            Help <span className="dot"></span> Chef<span className="dot"></span>
          </h2>
          <span className="address">
            <LocationCity fontSize="large" className="location-icon" />
            38 Tutkijantie 4C, Oulu, Finland
          </span>
        </div>
        <ul className="main-links-wrapper footer-links">
          {mainLinks.map((link) => (
            <li key={link.id} className="footer-item">
              <Link to={link.path} className="footer-link">
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="category-links-wrapper footer-links">
          <li>
            <h3 className="footer-link-heading">Top Categories</h3>
          </li>
          {filteredData?.slice(0, 4)?.map((link) => (
            <li key={link?.idCategory} className="footer-item ">
              <Link
                to={`/categories/${link?.strCategory}`}
                className="footer-link exception"
              >
                {link?.strCategory}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="dummy-links-wrapper footer-links">
          {dummyLinks.map((link) => (
            <li key={link.id} className="footer-item">
              <Link to={link.path} className="footer-link">
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="socials-links-wrapper footer-links">
          {socialLinks.map((link) => (
            <li key={link.id} className="footer-item">
              <link.icon
                to={link.path}
                className="footer-link icon"
                fontSize="large"
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="copyright">
        <p className={`author ${!isDark && "light-text"}`}>
          Designed & Developed <Favorite className="footer-heart-icon" /> by
          <a
            className="author-link"
            href="https://github.com/VictorKevz"
            target="_blank"
          >
            Victor.Kevz
          </a>
        </p>
        <ul className={`my-links ${!isDark && "light-text"}`}>
          <li className="footer-link">
            <a className="author" href="https://github.com/VictorKevz"
            target="_blank">
              <GitHub fontSize="large" />
            </a>
          </li>
          <li className="footer-link">
            <a className="author" href="https://github.com/VictorKevz"
            target="_blank">
              <LinkedIn fontSize="large"/>
            </a>
          </li>
        </ul>
      </div>
      
    </section>
  );
}

export default Footer;
