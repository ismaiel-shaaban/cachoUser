import React, { Fragment } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import styles from "./RightSideSlider.module.css";
import SliderContent from "./SliderContent/SliderContent";
import images from "src/Assets/images";

function RightSideSlider() {
  // slider
  const bannerSlider = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  // map
  const sliderCustom = [
    {
      id: 1,
      sliderImage: images.userReview,
      sliderHeading: "Jaquon Hart",
      sliderPara: "Digital Marketing Executive, Hypebeast",
    },
    {
      id: 2,
      sliderImage: images.userReview,
      sliderHeading: "Provides search for different services",
      sliderPara: "Digital Marketing Executive, Hypebeast",
    },
    {
      id: 3,
      sliderImage: images.userReview,
      sliderHeading: "Provides search for different services",
      sliderPara: "Digital Marketing Executive, Hypebeast",
    },
  ];
  return (
    <>
      <div className={`${styles.sliderLeftCol}`}>
        {sliderCustom?.length !== 0 ? (
          <Carousel responsive={bannerSlider} autoPlay={true} showDots={false}>
            {sliderCustom?.map((item, index) => {
              return <SliderContent slideritems={item} key={index} />;
            })}
          </Carousel>
        ) : (
          <Fragment />
        )}
      </div>
    </>
  );
}

export default RightSideSlider;
