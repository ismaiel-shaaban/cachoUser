import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import images from "../../../../Assets/images";
import BussinessTypeCard from "../../../LandingPageModule/Components/LandingPage/BusinessType/BussinessTypeCard/BussinessTypeCard";
import styles from "./HomeBackUp.module.css";
import "react-multi-carousel/lib/styles.css";
import { strings } from "src/Utils/Localization";

function HomeBackUp() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    largeDesktop: {
      breakpoint: { max: 3000, min: 1280 },
      items: 10,
    },
    Desktop: {
      breakpoint: { max: 1279, min: 992 },
      items: 8,
    },
    tablet: {
      breakpoint: { max: 991, min: 769 },
      items: 6,
    },
    mediumDevice: {
      breakpoint: { max: 768, min: 600 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 599, min: 480 },
      items: 3,
    },
    smallMobile: {
      breakpoint: { max: 479, min: 320 },
      items: 2,
    },
    // tablet: {
    //   breakpoint: { max: 1024, min: 768 },
    //   items: 5,
    // },
    // mobile: {
    //   breakpoint: { max: 464, min: 0 },
    //   items: 1,
    // },
  };
  const categoryData = [
    {
      id: 1,
      title: "Salon",
      image: images.saloon,
    },
    {
      id: 2,
      title: "Electrician",
      image: images.electrician,
    },
    {
      id: 3,
      title: "paint",
      image: images.paint,
    },
    {
      id: 4,
      title: "Laundary",
      image: images.laundry,
    },
    // {
    //   id: 5,
    //   title: "carpenter",
    //   image: images?.carpenter,
    // },
    {
      id: 6,
      title: "Salon",
      image: images.saloon,
    },
    {
      id: 7,
      title: "Electrician",
      image: images.electrician,
    },
    {
      id: 8,
      title: "paint",
      image: images.paint,
    },
    {
      id: 9,
      title: "Laundary",
      image: images.laundry,
    },
    // {
    //   id: 10,
    //   title: "carpenter",
    //   image: images.carpenter,
    // },
    {
      id: 11,
      title: "Salon",
      image: images.saloon,
    },
    {
      id: 12,
      title: "Electrician",
      image: images.electrician,
    },
    {
      id: 13,
      title: "paint",
      image: images.paint,
    },
    {
      id: 14,
      title: "Laundary",
      image: images.laundry,
    },
    // {
    //   id: 15,
    //   title: "carpenter",
    //   image: images.carpenter,
    // },
    {
      id: 16,
      title: "Salon",
      image: images.saloon,
    },
    {
      id: 17,
      title: "Electrician",
      image: images.electrician,
    },
    {
      id: 18,
      title: "paint",
      image: images.paint,
    },
    {
      id: 19,
      title: "Laundary",
      image: images.laundry,
    },
    // {
    //   id: 20,
    //   title: "carpenter",
    //   image: images.carpenter,
    // },
  ];
  return (
    <>
      {/* =============== carousel section start ======= */}
      <section className="bg-[#bfcfdd] pt-[20px] pb-[30px]">
        <div
          className={`main-container mx-auto ${styles.customCarousel} p-[0px] ssm:p-[10px] sm:p-[10px] md:p-[10px] lg:p-[10px]`}
        >
          <h5 className="font-extrabold text-[16px] leading-[150%] text-black mb-[15px]">
            Featured Categories
          </h5>
          {/* === carousel start ==== */}
          <Carousel responsive={responsive}>
            {categoryData?.map((val, key) => {
              return <BussinessTypeCard value={val} key={key} />;
            })}
          </Carousel>
          {/* === carousel end ==== */}
        </div>
      </section>
      {/* ============= carousel section end =========== */}
      {/* ===== category section start ========== */}
      <section className="pt-[20px]">
        <div
          className={`main-container mx-auto p-[0px] ssm:p-[10px] sm:p-[10px] md:p-[10px] lg:p-[10px]`}
        >
          <h5 className="font-extrabold text-[16px] leading-[150%] text-black mb-[15px]">
            {strings?.categories}
          </h5>
          <div
            className={`${styles.categoryList} flex flex-wrap gap-[14px] justify-center`}
          >
            {categoryData?.map((val, key) => {
              return <BussinessTypeCard value={val} key={key} />;
            })}
          </div>
        </div>
      </section>
      {/* ===== category section end ========== */}
    </>
  );
}

export default HomeBackUp;
