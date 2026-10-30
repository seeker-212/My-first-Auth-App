import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen 
    bg-[url("/bg_img.png")] bg-cover bg-center'>
      <Navbar />
      <Hero />
    </div>
  );
};

export default Home;
