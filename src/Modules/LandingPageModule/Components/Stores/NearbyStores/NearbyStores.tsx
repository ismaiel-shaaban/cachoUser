import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import images from "src/Assets/images";
import styles from "./NearbyStores.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useNearestBusinessQuery from "../../../Hooks/useNearestBusinessQuery";
import {
  FILE_URL,
  convertFirstLetterToUpperCaseWithSpace,
} from "src/Utils/Helpers";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";
import { useRouter } from "next/router";
import { strings } from "src/Utils/Localization";

function NearbyStores() {
  const [isArabicCustomSlider, setIsArabicCustomSlider] = useState(false);

  // slider
  const storiesSliders = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 3,
    },
    miniLaptop: {
      breakpoint: { max: 1199, min: 850 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 849, min: 576 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 575, min: 0 },
      items: 1,
    },
  };
  const { latitude, longitude } = useAuthValue();
  const [page, setPage] = useState(1);
  const nearestBusinessQuery = useNearestBusinessQuery(
    page,
    "",
    latitude,
    longitude
  );
  const nearestBusinessData =
    nearestBusinessQuery?.data?.data?.data?.list ?? [];
  const router = useRouter();
  const { language } = useAuthValue();

  useEffect(() => {
    setIsArabicCustomSlider(language === "ar");
  }, [language]);

  const rtlProp = isArabicCustomSlider ? { rtl: true } : {};

  return nearestBusinessData?.length !== 0 ? (
    <>
      <h3 className={`${styles.newStoriesHeading} pt-[35px]`}>
        {strings?.stores_near_you}
      </h3>

      <Carousel
        responsive={storiesSliders}
        className={
          language === "ar"
            ? `${styles.customSlider} ${styles.arabicCustomSlider} `
            : ` ${styles.customSlider} `
        }
        infinite={true}
        showDots={false}
        arrows={true}
        {...rtlProp}
      >
        {nearestBusinessData?.map((item: any, index: any) => {
          return (
            <figure
              className={`${styles.storesRow} relative p-[12px] bg-white rounded-[10px] overflow-hidden cursor-pointer`}
              key={`item${index}`}
              onClick={() =>
                router.push(`/vendor-detail?vendorId=${item?.vendorId}`)
              }
            >
              <em className="relative w-[96px] h-[96px]">
                <Image
                  src={
                    item?.logo ? `${FILE_URL}${item?.logo}` : images.storiesImg
                  }
                  alt="bannerImg"
                  layout="fill"
                />
              </em>
              <div className={styles.rightColContent}>
                <h5>{convertFirstLetterToUpperCaseWithSpace(item?.name)}</h5>
                <span
                  className={`${styles.midText} text-[11px] font-[500] border text-primary bg-[#F1F6FC]  border-lightPrimary`}
                >
                  {item.type}
                </span>
                <p>{item.address}</p>
              </div>
              <em className={`${styles.ratingBg} bg-[#EF9D2E]`}>
                <span>
                  {item?.avgRating > 0 ? Number(item?.avgRating).toFixed(1) : 0}
                </span>
                <Image src={images.starIcon} alt="icon" />
              </em>
            </figure>
          );
        })}
      </Carousel>
    </>
  ) : (
    <Fragment />
  );
}

export default NearbyStores;
