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
    <footer className={`footer-wrapper wrapper ${!isDark && "light-body-bg"}`}>
  <CTA />
  <div className={`footer-container ${!isDark && "light-text"}`}>
    <div className="logo-address-wrapper">
      <h2 className={`logo footer ${!isDark && "light-text"}`}>
        Help <span className="dot"></span> Chef<span className="dot"></span>
      </h2>
      <address className="address">
        <LocationCity
          fontSize="large"
          className="location-icon"
          aria-hidden="true"
        />
        38 Tutkijantie 4C, Oulu, Finland
      </address>
    </div>

    <ul className="main-links-wrapper footer-links">
      <li><h2 className="footer-heading">Main Links</h2></li>
      {mainLinks.map((link) => (
        <li key={link.id} className="footer-item">
          <Link
            to={link.path}
            className="footer-link"
            aria-label={`Navigate to ${link.text}`}
          >
            {link.text}
          </Link>
        </li>
      ))}
    </ul>

    <ul className="category-links-wrapper footer-links">
      <li><h2 className="footer-heading">Top Categories</h2></li>
      {filteredData?.slice(0, 5)?.map((link) => (
        <li key={link?.idCategory} className="footer-item">
          <Link
            to={`/categories/${link?.strCategory}`}
            className="footer-link exception"
            aria-label={`View recipes in ${link?.strCategory}`}
          >
            {link?.strCategory}
          </Link>
        </li>
      ))}
    </ul>

    <ul className="dummy-links-wrapper footer-links">
      <li><h2 className="footer-heading">Additional Links</h2></li>
      
      {dummyLinks.map((link) => (
        <li key={link.id} className="footer-item">
          <Link
            to={link.path}
            className="footer-link"
            aria-label={`Navigate to ${link.text}`}
          >
            {link.text}
          </Link>
        </li>
      ))}
    </ul>

    <ul className="socials-links-wrapper footer-links">
      <li><h2 className="footer-heading">Follow Us</h2></li>
      {socialLinks.map((link) => (
        <li key={link.id} className="footer-item">
          <link.icon
            to={link.path}
            className="footer-link icon"
            fontSize="large"
            tabIndex="0"
            aria-label={`Follow us on ${link.name}`}
            title={`Follow us on ${link.name}`}
          />
        </li>
      ))}
    </ul>
  </div>

  <div className="copyright">
    <p className={`author ${!isDark && "light-text"}`}>
      Designed & Developed
      <Favorite className="footer-heart-icon" aria-hidden="true" /> by
      <a
        className="author-link"
        href="https://github.com/VictorKevz"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Victor.Kevz's GitHub profile"
      >
        Victor.Kevz
      </a>
    </p>
    <ul className={`my-links ${!isDark && "light-text"}`}>
      <li className="footer-link">
        <a
          className="author"
          href="https://github.com/VictorKevz"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Victor.Kevz's GitHub profile on GitHub"
        >
          <GitHub fontSize="large" />
        </a>
      </li>
      <li className="footer-link">
        <a
          className="author"
          href="https://www.linkedin.com/in/victor-kuwandira/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Victor.Kevz's LinkedIn profile"
        >
          <LinkedIn fontSize="large" />
        </a>
      </li>
    </ul>
  </div>
</footer>
  );
}

export default Footer;
