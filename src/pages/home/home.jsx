import React from "react";
import homepageImage from "../../assets/homepage.png";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="flex flex-wrap items-center justify-center align-middle">
      <div className="hidden md:block">
        <h1 className="text-4xl font-bold">Welcome to our store</h1>
        <button className="mt-2 rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-700">
          <Link to="/products">Shop Now</Link>
        </button>
      </div>
      <img src={homepageImage} alt="Homepage" />
      <button className="mt-2 rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-700 md:hidden">
        <Link to="/products">Shop Now</Link>
      </button>
    </div>
  );
};
