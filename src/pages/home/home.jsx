import React from "react";
import homepageImage from "../../assets/homepage.png";

export const Home = () => {
  return (
    <div className="flex h-screen items-center justify-center align-middle">
      <img src={homepageImage} alt="Homepage" />
    </div>
  );
};
