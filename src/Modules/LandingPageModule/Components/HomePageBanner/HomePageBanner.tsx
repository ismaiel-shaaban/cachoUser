import React from "react";
import Banner from "../LandingPage/Banner/Banner";
import styles from "./HomePageBanner.module.css";
import AllCategory from "../LandingPage/AllCategory/AllCategory";
import FeaturedCategories from "../Stores/FeaturedCategories/FeaturedCategories";

function HomePageBanner() {
  return (
    <>
      <section className={`${styles.bannerSection} bg-[white] py-[30px]`}>
        <div className="main-container">
          <Banner />
          <FeaturedCategories />
          <AllCategory />
        </div>
      </section>
    </>
  );
}

export default HomePageBanner;
