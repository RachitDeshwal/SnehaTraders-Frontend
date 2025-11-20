import React from "react";
import { useState } from "react";

import { useEffect } from "react";
import Background from "../components/Background";
import Hero from "../components/Hero";
import Product from "./Product";
import OurPolicy from "../components/OurPolicy";
import Footer from "../components/Footer";
import NewLetterBox from "../components/NewLetterBox";

const Home = () => {
  const [heroCount, setHeroCount] = useState(0);
  useEffect(() => {
    setInterval(
      () =>
        setHeroCount((prev) => {
          return prev === 3 ? 0 : prev + 1;
        }),
      3000
    );
  }, []);
  let heroData = [
    {
      text1: "Premium Quality School Uniforms",
      text2: "Designed for Comfort & Durability",
    },
    {
      text1: "Neat, Smart & Affordable",
      text2: "Shop the Perfect School Look!",
    },
    {
      text1: "Trusted by Schools & Parents",
      text2: "Order Your Uniforms Today!",
    },
    {
      text1: "Dress Smart, Learn Smart",
      text2: "Explore Our Latest Collection!",
    },
  ];
  return (
    <div className="lg:h-[100vh] w-[99vw] md:h-[50vh] sm:h-[40vh] mt-[70px]   bg-gradient-to-r from-[#3B3A28] via-[#5E503F] to-[#B08D57]">
      <Background heroCount={heroCount} />
      <Hero
        heroCount={heroCount}
        heroData={heroData[heroCount]}
        setHeroCount={setHeroCount}
      />
      <Product></Product>
      <OurPolicy />

      <Footer />
    </div>
  );
};

export default Home;
