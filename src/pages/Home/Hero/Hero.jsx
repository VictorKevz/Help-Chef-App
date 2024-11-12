import React, { useContext } from "react";
import Carousel from "./Carousel/Carousel";
import "../Hero/hero.css";
import { ThemeAppContext } from "../../../App";
import pattern from "../../../assets/images/home/hero/pattern.svg"

function Hero() {
    const{isDark} = useContext(ThemeAppContext)
  return (
    <section className={`hero-wrapper wrapper ${!isDark && "light-cards-bg"}`}>
      <Carousel />
      <img src={pattern} alt="" className="pattern-img top" />
      <img src={pattern} alt="" className="pattern-img bottom" />
    </section>
  );
}

export default Hero;
