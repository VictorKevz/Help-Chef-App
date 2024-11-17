import React from 'react'
import "../../styles/home.css"
import Hero from './Hero/Hero'
import Trending from './Trending/Trending'

function Home() {
  return (
    <section className='home-wrapper wrapper'>
      <Hero/>
      <Trending/>
      <div className="fixed-bg"></div>
    </section>
  )
}

export default Home