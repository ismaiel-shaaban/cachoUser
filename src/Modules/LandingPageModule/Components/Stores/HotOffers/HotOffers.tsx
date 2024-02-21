import React, { Fragment, useEffect, useRef, useState } from "react";
import styles from "./HotOffers.module.css";
import Image from "next/image";
import images from "src/Assets/images";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useHotOffersListQuery from "src/Modules/LandingPageModule/Hooks/useHotOffersListQuery";
import { useRouter } from "next/router";
import {
  FILE_URL,
  convertFirstLetterToUpperCaseWithSpace,
  dataLangTranslation,
} from "src/Utils/Helpers";
import { strings } from "src/Utils/Localization";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";
import { useElementVisibility } from "@reactuses/core";
import {OfferModel} from "../../../../../Models/offer.model";

function HotOffers() {
  const [isArabicCustomSlider, setIsArabicCustomSlider] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, stop] = useElementVisibility(ref);
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
  const router = useRouter();
  const query = router?.query;
  const page = query?.page ? Number(query?.page) : 1;

  const hotOffersListQuery = useHotOffersListQuery(page, "");
  console.log(hotOffersListQuery)
    const hotOffersListData:OfferModel[] =
    hotOffersListQuery?.data?.docs ?? [];

  const { language } = useAuthValue();
  useEffect(() => {
    setIsArabicCustomSlider(language === "ar");
  }, [language]);

  const rtlProp = isArabicCustomSlider ? { rtl: true } : {};
  const svgElement = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      width="35"
      height="35"
      viewBox="0 0 256 256"
      xmlSpace="preserve"
    >
      <defs></defs>
      <g
        style={{
          stroke: 'none',
          strokeWidth: 0,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeLinejoin: 'miter',
          strokeMiterlimit: 10,
          fill: 'none',
          fillRule: 'nonzero',
          opacity: 1,
        }}
        transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
      >
        <path
          d="M 46.977 6.625 l 8.562 -4.185 c 2.181 -1.066 4.815 -0.21 5.953 1.934 l 4.467 8.418 c 0.651 1.226 1.831 2.084 3.198 2.324 l 9.387 1.647 c 2.391 0.419 4.019 2.66 3.679 5.064 l -1.335 9.436 c -0.194 1.375 0.256 2.762 1.222 3.76 l 6.626 6.849 c 1.688 1.745 1.688 4.514 0 6.259 l -6.626 6.849 c -0.965 0.998 -1.416 2.385 -1.222 3.76 l 1.335 9.436 c 0.34 2.404 -1.288 4.644 -3.679 5.064 l -9.387 1.647 c -1.367 0.24 -2.548 1.097 -3.198 2.324 l -4.467 8.418 c -1.138 2.145 -3.771 3 -5.953 1.934 l -8.562 -4.185 c -1.247 -0.61 -2.706 -0.61 -3.953 0 l -8.562 4.185 c -2.181 1.066 -4.815 0.21 -5.953 -1.934 l -4.467 -8.418 c -0.651 -1.226 -1.831 -2.084 -3.198 -2.324 l -9.387 -1.647 c -2.391 -0.419 -4.019 -2.66 -3.679 -5.064 l 1.335 -9.436 c 0.194 -1.375 -0.256 -2.762 -1.222 -3.76 l -6.626 -6.849 c -1.688 -1.745 -1.688 -4.514 0 -6.259 l 6.626 -6.849 c 0.965 -0.998 1.416 -2.385 1.222 -3.76 l -1.335 -9.436 c -0.34 -2.404 1.288 -4.644 3.679 -5.064 l 9.387 -1.647 c 1.367 -0.24 2.548 -1.097 3.198 -2.324 l 4.467 -8.418 c 1.138 -2.145 3.771 -3 5.953 -1.934 l 8.562 4.185 C 44.271 7.234 45.729 7.234 46.977 6.625 z"
          style={{
            stroke: 'none',
            strokeWidth: 1,
            strokeDasharray: 'none',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            strokeMiterlimit: 10,
            fill: 'rgb(216,35,35)',
            fillRule: 'nonzero',
            opacity: 1,
          }}
          transform=" matrix(1 0 0 1 0 0) "
          strokeLinecap="round"
        />
        <path
          d="M 33.809 43.004 c -4.801 0 -8.707 -3.906 -8.707 -8.707 c 0 -4.801 3.906 -8.707 8.707 -8.707 s 8.707 3.906 8.707 8.707 C 42.516 39.098 38.61 43.004 33.809 43.004 z M 33.809 29.59 c -2.596 0 -4.707 2.111 -4.707 4.707 c 0 2.596 2.111 4.707 4.707 4.707 s 4.707 -2.111 4.707 -4.707 C 38.516 31.702 36.404 29.59 33.809 29.59 z"
          style={{
            stroke: 'none',
            strokeWidth: 1,
            strokeDasharray: 'none',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            strokeMiterlimit: 10,
            fill: 'rgb(255,255,255)',
            fillRule: 'nonzero',
            opacity: 1,
          }}
          transform=" matrix(1 0 0 1 0 0) "
          strokeLinecap="round"
        />
        <path
          d="M 29.056 64.41 c -0.482 0 -0.966 -0.174 -1.35 -0.525 c -0.815 -0.746 -0.87 -2.011 -0.125 -2.825 L 59.47 26.24 c 0.746 -0.814 2.011 -0.871 2.825 -0.125 c 0.814 0.746 0.87 2.011 0.124 2.826 l -31.888 34.82 C 30.137 64.191 29.597 64.41 29.056 64.41 z"
          style={{
            stroke: 'none',
            strokeWidth: 1,
            strokeDasharray: 'none',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            strokeMiterlimit: 10,
            fill: 'rgb(255,255,255)',
            fillRule: 'nonzero',
            opacity: 1,
          }}
          transform=" matrix(1 0 0 1 0 0) "
          strokeLinecap="round"
        />
        <path
          d="M 57.169 64.41 c -4.801 0 -8.707 -3.906 -8.707 -8.707 s 3.906 -8.707 8.707 -8.707 s 8.707 3.906 8.707 8.707 S 61.97 64.41 57.169 64.41 z M 57.169 50.996 c -2.596 0 -4.707 2.111 -4.707 4.707 s 2.111 4.707 4.707 4.707 s 4.707 -2.111 4.707 -4.707 S 59.765 50.996 57.169 50.996 z"
          style={{
            stroke: 'none',
            strokeWidth: 1,
            strokeDasharray: 'none',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            strokeMiterlimit: 10,
            fill: 'rgb(255,255,255)',
            fillRule: 'nonzero',
            opacity: 1,
          }}
          transform=" matrix(1 0 0 1 0 0) "
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
  return (
    <div ref={ref} className="my-10">
      <h3 className={`${styles.newStoriesHeading} text-[24px] font-[800] text-primary flex pt-[35px]`}>
        <span>
        {strings?.hot_offers}
        </span>
        <span className={`${language === "ar" ? 'mr-2'  : 'ml-2'}`}>
          {svgElement}
        </span>
      </h3>
      {hotOffersListData?.length !== 0 ? (
        <div  className={`animate__animated ${visible ? 'animate__fadeInDownBig':''}`}>

        <Carousel
          responsive={storiesSlider}
          autoPlaySpeed={1000}
          autoPlay={true}
          className={
            language === "ar"
              ? `${styles.customSlider} ${styles.arabicCustomSlider} `
              : ` ${styles.customSlider} `
          }
          infinite={true}
          showDots={false}
          {...rtlProp}
        >
          {hotOffersListData?.map((item:any, index:any) => {
            return (
              <>
                <div
                  className={`${styles.featuredCatRow} position-relative shadow  rounded-[10px] overflow-hidden cursor-pointer`}
                  key={`item${index}`}
                >
                  <div
                    className={`${styles.carImgBox} relative overflow-hidden h-[260px] w-[260px]`}
                  >
                    <Image
                      src={
                        item?.image
                          ? `${item?.image}`
                          : images.featureCategory
                      }
                      alt="bannerImg"
                      layout="fill"
                      objectFit="cover"
                    />
                     <div className="absolute top-6 -left-4 bg-red-500 text-white py-1 px-4 rounded-tr-md rounded-bl-md shadow-lg" style={{ transform: 'rotate(-39deg)', borderRadius: '17px 17px 0 0'}}>
                    <p className="text-sm font-semibold">Discount 50%</p>
                  </div>
                  </div>
                 
                </div>
                <small className={`${styles.smallText} text-primary`}>
                  {dataLangTranslation(
                    convertFirstLetterToUpperCaseWithSpace(item.name),
                    item?.arName
                  )}
                </small>
              </>
            );
          })}
        </Carousel>
        </div>
      ) : (
        <Fragment />
      )}
    </div>
  );
}

export default HotOffers;
