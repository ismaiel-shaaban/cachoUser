import React, { useEffect, useState } from "react";
import styles from "./AboutTheVendor.module.css";
import Image from "next/image";
import images from "src/Assets/images";
import { PRODUCT_DETAILS_DATA_RESPONSE } from "src/Modules/CategoryModule/Types/ResponseTypes";
import {
  FILE_URL,
  capitalizeFirstLetter,
  customQueryData,
  inOrderDays,
  // inOrderDays,
} from "src/Utils/Helpers";
import { useRouter } from "next/router";
import Loader from "src/Components/Loader/Loader";
import QRCode from "react-qr-code";
import { strings } from "src/Utils/Localization";

type ABOUT_VENDOR_PROPS = {
  productDetails: PRODUCT_DETAILS_DATA_RESPONSE | undefined;
  isLoading: boolean;
};

function AboutTheVendor(props: ABOUT_VENDOR_PROPS) {
  const { productDetails, isLoading } = props;

  const vendorInfo: any = productDetails?.productData?.vendor;
  const router = useRouter();
  const queryData: any = router?.query;

  const categoryName = encodeURIComponent(queryData?.categoryName);
  const subCategoryName = encodeURIComponent(queryData?.subname);

  const daysOnly = vendorInfo?.workingDays.map((item: any) =>
    item?.days?.replace(/"/g, "")
  );

  const date = new Date();
  const dayName = date.toLocaleString("en-US", { weekday: "long" });

  const formatTimeToAMPM = (time: any) => {
    const timeParts = time.split(":");
    let hours = parseInt(timeParts[0]);
    const minutes = timeParts[1];
    const ampm = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    hours = hours || 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  const [openTime, setOpenTime] = useState<any>(null);
  const [closeTime, setCloseTime] = useState<any>(null);

  const getOpenTimeForCurrentDay = (data: any) => {
    const currentDay = new Date().toLocaleString("en-US", { weekday: "long" });

    const filteredObject = data?.find((item: any) => {
      const days = item?.days?.replace(/"/g, "");

      return days === currentDay;
    });

    if (filteredObject) {
      const openTime = filteredObject.open
        ?.replace(/"/g, "")
        ?.split("T")[1]
        ?.slice(0, 5);
      return formatTimeToAMPM(openTime);
    }

    return null;
  };

  const getCloseTimeForCurrentDay = (data: any) => {
    const currentDay = new Date().toLocaleString("en-US", { weekday: "long" });

    const filteredObject = data?.find((item: any) => {
      const days = item?.days?.replace(/"/g, "");
      return days === currentDay;
    });

    if (filteredObject) {
      const closeTime = filteredObject.close
        .replace(/"/g, "")
        .split("T")[1]
        .slice(0, 5);
      return formatTimeToAMPM(closeTime);
    }

    return null;
  };

  useEffect(() => {
    const openTime = getOpenTimeForCurrentDay(vendorInfo?.workingDays);
    const closeTime = getCloseTimeForCurrentDay(vendorInfo?.workingDays);
    setOpenTime(openTime);
    setCloseTime(closeTime);
  }, []);
  const queryDataParams = customQueryData({
    subName: subCategoryName,
    subCategoryId: queryData?.subcategoryId,
    categoryName: categoryName,
    categoryId: queryData?.categoryId,
    productId: queryData.id,
    vendorId: vendorInfo?.vendorId,
    vendorName: queryData?.vendorName,
    businessName: vendorInfo?.name,
    vendorImage: queryData?.vendorImage,
  });
  return (
    <>
      {isLoading && <Loader />}
      <div
        className={styles.aboutVendor}
        onClick={() =>
          router.push(
            `/vendor-shop-details?productName=${queryData?.productName}${queryDataParams}`
          )
        }
      >
        <div className={styles.vendorDetail}>
          <figure className="relative">
            <div className="relative">
              <div className="relative w-[177px] h-[177px] overflow-hidden rounded-[10px]">
                <Image
                  src={
                    vendorInfo
                      ? `${FILE_URL}${vendorInfo?.logo}`
                      : images.productLogo
                  }
                  layout="fill"
                  objectFit="cover"
                  width={100}
                  height={100}
                />
              </div>

              <small className={`${styles.smallText} flex gap-2.5`}>
                {vendorInfo?.avgRating > 0
                  ? Number(vendorInfo?.avgRating).toFixed(1)
                  : 0}{" "}
                / 5
                <Image src={images.starIconwhite} />
              </small>
            </div>
          </figure>

          <article className={styles.productInfo}>
            <h3 className="text-[24px] font-[600] text-black">
              {vendorInfo?.name}
            </h3>
            <p className="text-[14px] font-[400] text-gray py-3">
              {capitalizeFirstLetter(vendorInfo?.address ?? "")}
              <article className={styles.hasMarin}>
                <p
                  className={`${styles.hours} text-[13px] font-[600] text-black`}
                >
                  {daysOnly?.includes(dayName) && (
                    <span className="text-[13px] font-[600] text-black">
                      {""}
                        {strings?.hours}:
                        <span className="text-[#888;] pl-[4px] font-[500]">
                         {openTime}-{closeTime}
                        </span>
                    </span>
                  )}{" "}
                </p>
                <p className="mt-2 font-[600] text-black">
                  {dayName}{" "}
                  <span
                    className={`text-[13px] font-[500] ${
                      daysOnly?.includes(dayName)
                        ? "text-green"
                        : "text-red-500"
                    }`}
                  >
                    {daysOnly?.includes(dayName)
                      ? `${strings.open}`
                      : `${strings.closed}`}
                  </span>

                  
                </p>
              </article>
            </p>
            <div className={styles.sharDirection}>
              {/* <button>
                <figure className=" rounded-[10px] ">
                  <em className="relative w-[177px] h-[177px]">
                    <Image src={images.shareImg} />
                  </em>
                  <small className="block">{strings.share}</small>
                </figure>
              </button> */}
              <button>
                <figure className=" rounded-[10px] ">
                  <em className="relative w-[177px] h-[177px]">
                    <Image src={images.getDirection} />
                  </em>
                  <h6 className="block text-[#000] font-[500] text-[12px]">{strings?.direction}</h6>
                </figure>
              </button>
            </div>
          </article>

          <figure className=" rounded-[10px] ">
            <div className={`${styles.qrImg} relative w-[140px] h-[140px]`}>
              <Image src={`${FILE_URL}${vendorInfo?.qrcode}`} layout="fill" />
            </div>
          </figure>
        </div>
        {/* <div className={styles.info}>
          <article className={styles.infoHours}>
            <h5 className="text-[16px] font-[600] text-black pb-2">
              Opening Hours
            </h5>
            <p className="text-[14px] font-[500] text-gray">
              {vendorInfo?.openingTiming}
            </p>
          </article>
          <article className={styles.infoDays}>
            <h5 className="text-[16px] font-[600] text-black pb-2">
              Working Days
            </h5>

            <p className="text-[14px] font-[500] text-gray">
              {" "}
              {inOrderDays(vendorInfo?.workingDays)?.join(", ")}
            </p>
          </article>
        </div> */}
      </div>
    </>
  );
}

export default AboutTheVendor;
