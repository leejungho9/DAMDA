import "../App.css";
import React from "react";
import Banner from "../components/Mainbanner/Mainbanner";
import BestSeller from "../components/Common/Bestseller";
import Promotion from "../components/Common/Promotion";
import Advertisement from "../components/Common/Advertisement";
import Brand from "../components/Common/Brand";
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
