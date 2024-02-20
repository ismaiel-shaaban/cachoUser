import React, { Fragment, ReactElement, useEffect, useRef, useState } from "react";
import Image from "next/image";
import images from "src/Assets/images";
import styles from "./NewStores.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useNewBusinessQuery from "src/Modules/LandingPageModule/Hooks/useNewBusinessQuery";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";
import {
  FILE_URL,
  convertFirstLetterToUpperCaseWithSpace,
} from "src/Utils/Helpers";
import { useRouter } from "next/router";
import { strings } from "src/Utils/Localization";
import { useElementVisibility } from "@reactuses/core";
const CustomDot = ({ onClick, active, index }: { onClick: () => void; active: boolean; index: number }): ReactElement => {
  return (
    <button
      className={`${styles.customDot} ${active ? styles.activeDot : ""}`}
      onClick={() => onClick()}
      key={index}
    >
      {/* You can add any custom dot content here */}
      {/* For example, you can add a custom dot icon */}
      {active ? "●" : "○"}
    </button>
  );
};
function NewStores() {
  const [isArabicCustomSlider, setIsArabicCustomSlider] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, stop] = useElementVisibility(ref);
  // slider
  const storiesSlider = {
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 4,
      autoPlay: true,
      autoPlaySpeed: 2000,
    },
    miniLaptop: {
      breakpoint: { max: 1121, min: 974 },
      items: 4,
      autoPlay: true,
      autoPlaySpeed: 2000,
    },
    tablet: {
      breakpoint: { max: 973, min: 776 },
      items: 3,
      autoPlay: true,
    },
    mobileLandsacpe: {
      breakpoint: { max: 776, min: 576 },
      items: 2,
      autoPlay: true,
    },
    mobile: {
      breakpoint: { max: 575, min: 425 },
      items: 1,
      autoPlay: true,
    },
    smallmobile: {
      breakpoint: { max: 425, min: 320 },
      items: 1,
      autoPlay: true,
    },
  };
  const { token } = useAuthValue();
  const newBusinessQuery = useNewBusinessQuery(1, token);
  const newBusinessData = newBusinessQuery?.data?.data?.data?.list ?? [];
  const router = useRouter();
  const { language } = useAuthValue();

  useEffect(() => {
    setIsArabicCustomSlider(language === "ar");
  }, [language]);

  const rtlProp = isArabicCustomSlider ? { rtl: true } : {};

  return (
    <div ref={ref} >
      {newBusinessData?.length !== 0 ? (
        <div className={`animate__animated ${visible ? 'animate__fadeInDownBig':''}`}>
          <h3 className={`${styles.newStoriesHeading} text-[24px] font-[800] text-primary  pt-[35px]`}>
            {strings?.new_stores}
          </h3>
          <Carousel
            autoPlaySpeed={1000}
            autoPlay={true}
            responsive={storiesSlider}
            className={
              language === "ar"
                ? `${styles.customSlider} ${styles.arabicCustomSlider} `
                : ` ${styles.customSlider} `
            }
            showDots={false}
            arrows={true}
            {...rtlProp}
          >
            {newBusinessData?.length !== 0
              ? newBusinessData?.map((item, index) => {
                  return (
                    <>
                      <div
                        className={`${styles.userStoryBox}  bg-white position-relative h-[260px] w-[260px] shadow rounded-[10px] overflow-hidden`}
                        key={`item${index}`}
                        onClick={() =>
                          router.push(
                            `/vendor-detail?vendorId=${item?.vendorId}`
                          )
                        }
                      >
                        <div
                          className={`${styles.carImgBox} relative h-[180px] w-[180px] cursor-pointer`}
                          >
                          <Image
                            src={
                              item?.logo
                                ? ` ${FILE_URL}${item.logo}`
                                : images.desertCooler
                            }
                            layout="fill"
                            alt="bannerImg"
                            objectFit="cover"
                          />
                        </div>
                      </div>
                      <h5 className={`${styles.item_name} text-primary `}>
                        {convertFirstLetterToUpperCaseWithSpace(item?.name)}
                      </h5>
                    </>
                  );
                })
              : ""}
          </Carousel>
        </div>
      ) : (
        <Fragment />
      )}
    </div>
  );
}

export default NewStores;
