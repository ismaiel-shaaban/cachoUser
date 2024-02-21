import React from "react";
import Banner from "../LandingPage/Banner/Banner";
import styles from "./HomePageBanner.module.css";
import AllCategory from "../LandingPage/AllBusinessTypes/AllBusinessTypes";
import HotOffers from "../Stores/HotOffers/HotOffers";
import AllBusinessTypes from "../LandingPage/AllBusinessTypes/AllBusinessTypes";

function HomePageBanner() {
  return (
    <>
      <section className={`${styles.bannerSection} bg-[white] py-[30px]`}>
        <div className="main-container">
          <Banner />
          <HotOffers />
          <AllBusinessTypes />
        </div>
      </section>
    </>
  );
}

export default HomePageBanner;
