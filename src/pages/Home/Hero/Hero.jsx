import React, { useContext } from "react";
import Carousel from "./Carousel/Carousel";
import "../Hero/hero.css";
import { ThemeAppContext } from "../../../App";
import bot from "../../../assets/images/home/hero/bot.gif";

function Hero() {
  const { isDark } = useContext(ThemeAppContext);
  return (
    <section className={`hero-wrapper wrapper`}>
      <Carousel />

      <article className="AI-search-wrapper">
        <div className="AI-search-container">
        <div className="info-wrapper">
          <div className="AI-text-wrapper">
          <h2 className="AI-title">
            Not sure what to cook? <span className="sub-title">Ask AI...</span>
          </h2>
          <input
            type="search"
            id=""
            placeholder="What can I make with eggs and ham...? "
            className="search-input"
          />
          </div>
          
          <div className="bot-wrapper">
            <img src={bot} alt="An animated robot gif" className="bot-img" />
          </div>
        </div>
        </div>
      </article>
    </section>
  );
}

export default Hero;
