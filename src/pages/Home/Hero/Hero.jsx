import React, { useContext } from "react";
import Carousel from "./Carousel/Carousel";
import "../Hero/hero.css";
import { ThemeAppContext } from "../../../App";
import SearchSection from "./SearchSection/SearchSection";

function Hero() {
  const { isDark } = useContext(ThemeAppContext);
  return (
    <section className={`hero-wrapper wrapper`}>
      <Carousel />

      <article className="searchSection-container">
        <SearchSection/>
      </article>
    </section>
  );
}

export default Hero;
