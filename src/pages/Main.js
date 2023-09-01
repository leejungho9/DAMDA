import "../App.css";
import React from "react";
import Banner from "../components/Mainbanner";
import BestSeller from "../components/Bestseller";
import Promotion from "../components/Promotion";
import Advertisement from "../components/Advertisement";
import Brand from "../components/Brand";
import BestReview from "../components/BestMainReview/Bestreview";

function Main() {
  return (
    <>
      <Banner />
      <BestSeller />
      <Advertisement />
      <Promotion />
      <BestReview />
      <Brand />
    </>
  );
}

export default Main;
