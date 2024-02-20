import React, { Fragment, memo, useEffect, useState } from "react";
import styles from "./VendorShopDetailsLayout.module.css";
import Image from "next/image";
import { Tab } from "@headlessui/react";

import images from "src/Assets/images";
import CategoryTabComponent from "../CategoryTabComponent/CategoryTabComponent";
import AboutsUsTabComponent from "../AboutsUsTabComponent/AboutsUsTabComponent";
import OffersTabComponent from "../OffersTabComponent/OffersTabComponent";
import {
  PRODUCTS_VENDOR_RESPONSE,
  VENDOR_PRODUCTS_ITEMS,
} from "src/Modules/CategoryModule/Types/ResponseTypes";
import {
  FILE_URL,
  convertFirstLetterToUpperCaseWithSpace,
} from "src/Utils/Helpers";
import ReactPlayer from "react-player";
import OpenHoursModal, {
  openHoursModal,
} from "./OpenHoursModal/OpenHoursModal";
import useProductReviewListQuery from "src/Modules/ProductListingPage/Hooks/useProductReviewListQuery";
import useProductDetailsQuery from "src/Modules/CategoryModule/Hooks/useProductDetailsQuery";
import VendorReviewList from "./VendorReviewList/VendorReviewList";
import { strings } from "src/Utils/Localization";
import SocialShareModal, {
  shareModal,
} from "./SocialShareModal/SocialShareModal";
import { useRouter } from "next/router";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";
import useWhatsappClickMutation from "src/Modules/ProductListingPage/Hooks/useWhatsappClickMutation";

type VENDOR_SHOP_PROPS = {
  vendorDetails: PRODUCTS_VENDOR_RESPONSE | any;
  vendorProducts: VENDOR_PRODUCTS_ITEMS | any;
};
function VendorShopDetailsLayout(props: VENDOR_SHOP_PROPS) {
  const { vendorDetails, vendorProducts } = props;
  const { user, language, loggedIn } = useAuthValue();
  const router = useRouter();
  const vendorId = vendorDetails?.vendorId?._id;
  const vendorNameQuery = router.query?.vendorName;
  const vendorImageQuery = router.query?.vendorImage;

  const vendorNames =
  vendorNameQuery !== undefined ? vendorNameQuery : vendorDetails?.vendorId?.businessName;

  const vendorImages =
  vendorImageQuery !== undefined ? vendorImageQuery : vendorDetails?.logo;

  const daysOnly = vendorDetails?.workingDays.map((item: any) =>
    item.days.replace(/"/g, "")
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
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const formattedTime = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
    return formattedTime;
  };
  const formattedTime = formatDate(date);

  const [openTime, setOpenTime] = useState<any>(null);
  const [closeTime, setCloseTime] = useState<any>(null);
  const [hideVideoIcon, setHideVideoIcon] = useState<boolean>(false);
  const getOpenTimeForCurrentDay = (data: any) => {
    const currentDay = new Date().toLocaleString("en-US", { weekday: "long" });

    const filteredObject = data.find((item: any) => {
      const days = item.days.replace(/"/g, "");

      return days === currentDay;
    });

    if (filteredObject) {
      const openTime = filteredObject.open
        .replace(/"/g, "")
        .split("T")[1]
        .slice(0, 5);
      return formatTimeToAMPM(openTime);
    }

    return null;
  };

  const getCloseTimeForCurrentDay = (data: any) => {
    const currentDay = new Date().toLocaleString("en-US", { weekday: "long" });

    const filteredObject = data.find((item: any) => {
      const days = item.days.replace(/"/g, "");
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
    const openTime = getOpenTimeForCurrentDay(
      vendorDetails ? vendorDetails?.workingDays : []
    );
    const closeTime = getCloseTimeForCurrentDay(
      vendorDetails ? vendorDetails?.workingDays : []
    );
    setOpenTime(openTime);
    setCloseTime(closeTime);
  }, [vendorDetails]);
  const whatsappClickMutation = useWhatsappClickMutation();
  const handleWhatsappClick = () => {
    whatsappClickMutation.mutate(
      {
        vendorId: vendorId,
      },
      {
        onSuccess: (res) => {
          const { status } = res.data;
          if (status === 200 || 201) {
            window.open(vendorDetails?.whatsappLink);
          }
        },
      }
    );
  };
  const activeNotification = router.query.t;
  useEffect(() => {
    if (activeNotification) {
      const element: any = document.getElementById("offerTab");
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  const tabs = [
    {
      id: 1,
      label: strings?.product_category,
      renderComponent: <CategoryTabComponent vendorProducts={vendorProducts} />,
    },
    {
      id: 2,
      label: strings?.reviews,
      renderComponent: <VendorReviewList />,
    },
    {
      id: 3,
      label: strings?.about_us,
      renderComponent: <AboutsUsTabComponent vendorDetails={vendorDetails} />,
    },
    {
      id: 4,
      label: strings?.offers,
      renderComponent: <OffersTabComponent vendorDetails={vendorDetails} />,
    },
  ];

  return (
    <main className={`${styles.VendorShopDetailsLayout} px-10 py-5`}>
      {/* video section---------- */}
      <div className={`${styles.vendorLayoutContainer}`}>
        <article
          className={`${styles.videoSection} relative grid place-items-center cursor-pointer`}
        >
          {!hideVideoIcon ? (
            <div className={`${styles.playBtn} absolute`}>
              <Image src={images.videoPlayIcon} alt={`play icon`} />
            </div>
          ) : (
            <div className={`${styles.playBtn} absolute`}>
              <Image src={images.pauseButton} alt={`pause icon`} />
            </div>
          )}
          <ReactPlayer
            url={`${FILE_URL}${vendorDetails?.video}`}
            width="100%"
            height="300px"
            controls={true}
            playing={true}
            onPlay={() => setHideVideoIcon(true)}
            loop={true}
            onPause={() => setHideVideoIcon(false)}
            muted
          />
        </article>
        {/* video section */}

        <div className={`bg-white ${styles.wrapper}`}>
          {/* detail section-------------- */}
          <section className={styles.vendorLayouDetailSection}>
            <div className="relative">
              <div
                className={`${styles.companyLogo} w-[177px] h-[177px] relative rounded-[10px] overflow-hidden`}
              >
                {vendorDetails?.logo && (
                  <Image
                    src={
                      vendorDetails?.logo
                        ? `${FILE_URL}${vendorDetails?.logo}`
                        : images.mobilecoderzLogo
                    }
                    alt={`mobilecoderz logo`}
                    height={177}
                    width={177}
                  />
                )}
              </div>
              <div className={styles.companyRating}>
                {vendorDetails?.avgRating > 0
                  ? Number(vendorDetails?.avgRating).toFixed(1)
                  : 0}{" "}
                / 5{" "}
                <svg
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5148 7.56047C10.3512 7.71898 10.2761 7.94823 10.3133 8.17306L10.8748 11.2802C10.9221 11.5436 10.811 11.8101 10.5906 11.9623C10.3746 12.1202 10.0872 12.1391 9.85167 12.0128L7.05459 10.554C6.95733 10.5022 6.84934 10.4744 6.73882 10.4712H6.56768C6.50831 10.4801 6.45021 10.499 6.39716 10.5281L3.59945 11.9939C3.46115 12.0633 3.30453 12.088 3.15106 12.0633C2.77719 11.9926 2.52774 11.6364 2.58899 11.2606L3.15106 8.15348C3.18832 7.92676 3.11317 7.69625 2.9496 7.53521L0.669123 5.32483C0.478399 5.13979 0.412087 4.86191 0.49924 4.61119C0.583865 4.3611 0.799851 4.17859 1.06068 4.13754L4.19941 3.6822C4.43813 3.65757 4.6478 3.51232 4.75517 3.29759L6.13823 0.461994C6.17107 0.398841 6.21338 0.340739 6.26454 0.29148L6.32138 0.247272C6.35106 0.214432 6.38516 0.187276 6.42305 0.165172L6.49189 0.139911L6.59925 0.0957031H6.86513C7.10259 0.120333 7.31163 0.262429 7.42088 0.474625L8.82226 3.29759C8.92331 3.50411 9.11972 3.64747 9.34644 3.6822L12.4852 4.13754C12.7504 4.17543 12.9721 4.35858 13.0599 4.61119C13.1426 4.86444 13.0712 5.14231 12.8767 5.32483L10.5148 7.56047Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <article className={styles.companyDetails}>
              <h3 className={`${styles.companyName}`}>
                {convertFirstLetterToUpperCaseWithSpace(vendorDetails?.name)}
              </h3>
              <p className={styles.companyTitle}>{vendorDetails?.address}</p>
              <p onClick={openHoursModal}>
                {daysOnly?.includes(dayName) ? (
                  <span
                    className={`${styles.hoursDropDown} text-[13px] font-[600] text-black`}
                  >
                    <span>{strings?.hours}</span>:{""}
                    <span className="text-[#888;] pl-[4px] font-[500]">
                      {openTime}-{closeTime}
                    </span>
                    <span className="ml-[5px] inline-block relative top-[-2px]">
                      <Image src={images.dropdown} />
                    </span>
                  </span>
                ) : (
                  ""
                )}
              </p>
              <p
                className={`${styles.hours} mt-2 text-[13px] font-[600] text-black`}
              >
                {dayName}{" "}
                <span
                  className={`text-[13px] font-[500] ${
                    daysOnly?.includes(dayName)
                      ? "text-activeClr"
                      : "text-red-500"
                  }`}
                >
                  {daysOnly?.includes(dayName)
                    ? `${strings.open}`
                    : `${strings.closed}`}
                </span>
              </p>
              <div className={styles.actionBtns}>
                <button
                  type="button"
                  className={styles.actionBtn}
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps?q=${vendorDetails.geolocation.coordinates[1]},${vendorDetails.geolocation.coordinates[0]}`
                    )
                  }
                >
                  <span>
                    <Image src={images.getDirection} alt="getDirection" />
                  </span>
                  {strings?.direction}
                </button>

                <button
                  type="button"
                  className={styles.actionBtn}
                  onClick={() => {
                    if (!loggedIn) {
                      router.push("/login");
                    } else if (!user?.isProfileCompleted) {
                      router.push("/edit-profile");
                    } else {
                      router.push(
                        `/chat?vendorId=${vendorId}&vendorName=${vendorNames}&userImage=${vendorImages}`
                      );
                    }
                  }}
                >
                  <span>
                    <Image src={images.roundedChatIcon} alt="chatIcon" />
                  </span>
                  {strings?.chat}
                </button>
                {vendorDetails?.whatsappLink !== "" ? (
                  <button
                    type="button"
                    className={styles.actionBtn}
                    onClick={() => {
                      if (!loggedIn) {
                        router.push("/login");
                      } else if (!user?.isProfileCompleted) {
                        router.push("/edit-profile");
                      } else {
                        handleWhatsappClick();
                      }
                    }}
                  >
                    <span>
                      <Image
                        src={images.roundedWhatsappIcon}
                        alt="whatsappIcon"
                      />
                    </span>
                    {strings?.whatsaap}
                  </button>
                ) : (
                  <button
                    title={strings?.whatsapp_link_not_added}
                    className={`${styles.actionBtn} flex items-center gap-2.5 cursor-pointer `}
                    type="button"
                    disabled
                  >
                    <>
                      <span>
                        <Image
                          src={images.roundedWhatsappIcon}
                          alt="whatsappIcon"
                        />
                      </span>
                      {strings?.whatsaap}
                    </>
                  </button>
                )}
              </div>
            </article>
            <div
              className={`${styles.companyQR} relative overflow-hidden h-[180px] w-[180px]`}
            >
              {vendorDetails?.qrcode && (
                <Image
                  src={`${FILE_URL}${vendorDetails?.qrcode}`}
                  alt={`QR code`}
                  width={180}
                  height={180}
                />
              )}
            </div>
          </section>
          {/* detail section */}

          {/* tab section */}
          <section className={`${styles.tabAreaSection}`} id="offerTab">
            <Tab.Group defaultIndex={activeNotification ? 3 : 0}>
              <Tab.List className={styles.tabList}>
                {tabs.map((item, index) => {
                  return (
                    <Tab
                      key={index}
                      className={styles.tabListBtns}
                      onClick={() =>
                        activeNotification &&
                        router.push(
                          `/vendor-detail?vendorId=${vendorDetails?.vendorId}`
                        )
                      }
                    >
                      {item.label}{" "}
                    </Tab>
                  );
                })}
              </Tab.List>
              <Tab.Panels className={styles.tabPanels}>
                {tabs.map((item, index) => {
                  return (
                    <Tab.Panel className={styles.tabPanel} key={index}>
                      {item.renderComponent}
                    </Tab.Panel>
                  );
                })}
              </Tab.Panels>
            </Tab.Group>
          </section>
          {/* tab section */}
        </div>
      </div>
      <OpenHoursModal
        vendorDetails={vendorDetails}
        formatTimeToAMPM={formatTimeToAMPM}
        daysOnly={daysOnly}
        dayName={dayName}
      />
      {/* <SocialShareModal /> */}
    </main>
  );
}

export default memo(VendorShopDetailsLayout);
