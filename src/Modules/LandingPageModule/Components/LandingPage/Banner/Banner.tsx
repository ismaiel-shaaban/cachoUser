import Image from "next/image";
import React from "react";
import images from "src/Assets/images";
import styles from "./Banner.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useDynamicBannerQuery from "src/Modules/LandingPageModule/Hooks/useDynamicBannerQuery";
import { FILE_URL } from "src/Utils/Helpers";

function Banner() {
  // slider
  const bannerSlider = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const { data } = useDynamicBannerQuery();
  const dyanamicBanner = data?.data?.data;
  return (
    <>
      <Carousel
        responsive={bannerSlider}
        className={styles.customSlider}
        infinite={true}
        showDots={true}
        autoPlaySpeed={10000}
        autoPlay={true}
      >
        {(dyanamicBanner?.list ?? [])?.map((item: any) => {
          return (
            <div
              className={` ${styles.heroImg} rounded-[0px] overflow-hidden relative w-[1172px] h-[356px]`}
            >
              <Image
                src={`${FILE_URL}${item?.web}`}
                alt="bannerImg"
                layout="fill"
              />
            </div>
          );
        })}
      </Carousel>
    </>
  );
}

export default Banner;
