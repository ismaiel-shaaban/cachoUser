import Image from "next/image";
import React from "react";
import images from "src/Assets/images";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import useAuthValue, {
  getAuthValue,
  setAuthValue,
} from "src/Modules/AuthModule/Hooks/useAuthValue";
import { Switch } from "@headlessui/react";
import styles from "./Header.module.css";
import LogOutConfirmationModal, {
  openLogOut,
} from "src/Modules/AuthModule/Components/LogOutConfirmationModal/LogOutConfirmationModal";
import LocationModal, {
  locationEventModal,
} from "../LocationModal/LocationModal";
import Loader from "src/Components/Loader/Loader";
import {
  FILE_URL,
  dataLangTranslation,
  getCurrentLocation,
} from "src/Utils/Helpers";
import ResponsiveHeader from "./ResponsiveHeader/ResponsiveHeader";
import { useRouter } from "next/router";
import useSuggestionSearchQuery from "../../Hooks/useSuggestionSearchQuery";
import { strings } from "src/Utils/Localization";
import useUpdateNotificationStatus from "../../Hooks/useUpdateNotificationStatus";
import { queryClient } from "src/Utils/ReactQueryConfig";
import { GET_NOTIFICATION_LIST_KEY } from "src/Modules/NotificationsModule/Hooks/useNotificationListInfiniteQuery";

type HEADER_PROPS = {
  showNav: boolean;
  showPopup: boolean;
  notificationCount?: any;
};

function  Header(props: HEADER_PROPS) {
  const { showNav, showPopup, notificationCount } = props;
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  // ====== switch state start
  const [enabled, setEnabled] = useState(false);
  // ====== switch state end
  const { location, loggedIn } = useAuthValue();

  useEffect(() => {
    if (location === undefined) {
      getCurrentLocation(loggedIn);
    }
  }, []);

  const suggestionSearchQuery = useSuggestionSearchQuery(search);
  const suggestionSearchData =
    suggestionSearchQuery?.data?.data?.data?.suggestionsAsObjects ?? [];
  const { user, language } = useAuthValue();
  const { mutate } = useUpdateNotificationStatus();
  return (
    <>
      {loader && <Loader />}

      <section
        className={
          language === "ar"
            ? ` ${styles.Header} bg-primary ssm:hidden sm:hidden md:hidden  py-[13px] sticky z-[99] top-[0]  ${styles.arabicHeader} `
            : ` ${styles.profileHeader} bg-primary ssm:hidden sm:hidden md:hidden py-[13px] sticky z-[99] top-[0]`
        }
      >
        <div className="main-container mx-auto p-[10px] flex">
          <div
            className=" w-[135px]
            h-[44.7px] relative"
            onClick={() => router.push("/")}
          >
            <Image
              src={images.logo}
              alt="main-logo"
              layout="fill"
              className={styles.logoMain}
            />
          </div>

          {/* location start ====== */}
          <Menu
            as="div"
            className={
              language === "ar"
                ? ` ${styles.menuCustom} relative inline-block text-left ml-[40px] border-l border-l-[#D9D9D933]   ${styles.arabicMenuCustom} `
                : `${styles.menuCustom} relative inline-block text-left ml-[40px] border-l border-l-[#D9D9D933]`
            }
          >
            <div>
              <Menu.Button
                className={`${styles.locationDrodown} min-w-[214px] flex pl-[16px] items-center`}
              >
                <Image
                  src={images.markLocation}
                  alt="mark-location"
                  width={"16px"}
                  height={"21px"}
                />

                <div
                  className={
                    language === "ar"
                      ? ` ml-[6px] mr-[6px] ml-[6px] `
                      : `ml-[6px] `
                  }
                >
                  <p className="font-normal text-[12px] leading-[150%] text-[#c5c5c5] text-left">
                    {strings?.location}
                  </p>
                  {!location ? (
                    <p className="font-medium text-[14px] text-[#ffffff] mt-[2px] text-left">
                      {strings?.please_choose_location}
                    </p>
                  ) : (
                    <h5
                      className={` ${styles.addressDropdown} font-medium text-[14px] text-[#ffffff] mt-[2px] text-left`}
                    >
                      {location}
                    </h5>
                  )}
                </div>

                <div
                  className={`${styles.arrowDown} relative w-[12px] h-[6px] ml-auto`}
                >
                  <Image
                    src={images.downIconLinear}
                    alt="down-arrow"
                    layout="fill"
                  />
                </div>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                className={`${styles.customMenuWrapper}  absolute right-0 mt-4 w-[256px] origin-top-right divide-y divide-gray-100 rounded-md bg-[#F1F6FC] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[9999]`}
              >
                <div className="">
                  <Menu.Item>
                    <button
                      className="flex w-full items-center gap-[15px] p-[15px] border-b border-b-[#E4E4E4]"
                      onClick={() => getCurrentLocation(loggedIn)}
                    >
                      <Image
                        src={images.gpsBlue}
                        alt={"gps green"}
                        height={"24px"}
                        width={"24px"}
                      />
                      <div>
                        <h5 className="text-left font-semibold leading-[150%] text-[#000000]">
                          {strings?.use_current_location}
                        </h5>
                        <p className="font-normal text-[12px] leading-[150%] text-[#8e8e8e] mt-[4px] text-left">
                          {strings?.enable_current_location}
                        </p>
                      </div>
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      className="flex w-full items-center gap-[15px] p-[15px] "
                      onClick={locationEventModal}
                    >
                      <Image
                        src={images.searchIcon}
                        alt={"gps green"}
                        height={"24px"}
                        width={"24px"}
                      />
                      <div>
                        <h5 className="text-left font-semibold leading-[150%] text-[#000000]">
                          {strings?.set_your_location}
                        </h5>
                        <p className="font-normal text-[12px] leading-[150%] text-[#8e8e8e] mt-[4px]">
                          {strings?.enter_location_manually}
                        </p>
                      </div>
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          {/* location  end ====== */}

          {/* ===== search bar section start ======== */}

          <div
            className={
              language === "ar"
                ? `${styles.searchBar} ml-auto flex items-center  ${styles.arabicsearchBar} `
                : `${styles.menuCustom} ml-auto flex items-center`
            }
          >
            {/* ====== search bar start ===== */}
            <div className={`relative`}>
              <div
                className={` ${styles.serachBox} relative min-w-[260px] mr-[52px] md:mr-[20px] md:ml-[15px]`}
              >
                <input
                  type={"text"}
                  placeholder={strings?.search_for_products_category}
                  className="w-full  py-[10px] px-[15px] rounded-[27px] text-[#fff] bg-subPrimary placeholder:font-normal placeholder:text-[13px] placeholder:leading-[150%] placeholder:text-[#fff] outline-none pr-[40px]"
                  onChange={(e: any) => setSearch(e.target.value)}
                />
                <div className="absolute top-[55%] right-[15px] translate-y-[-50%]">
                  <Image
                    src={images.searchWhite}
                    alt="search-white-icon"
                    width={"16px"}
                    height={"16px"}
                  />
                </div>
              </div>
              {search !== "" ? (
                <ul className={styles.searchList}>
                  {suggestionSearchData?.length !== 0 ? (
                    suggestionSearchData?.map((item) => {
                      return (
                        <li
                          className="text-[13px] font-[400] text-black"
                          onClick={() => {
                            router.push(
                              `/search-product?search=${dataLangTranslation(
                                item?.productcategoryName,
                                item?.productcategoryArName
                              )}`
                            );
                            sessionStorage.setItem(
                              "productCategoryQuery",
                              JSON.stringify([
                                item?.productcategoryName,
                                item?.productcategoryArName,
                              ])
                            );
                          }}
                        >
                          {dataLangTranslation(
                            item?.productcategoryName,
                            item?.productcategoryArName
                          )}
                        </li>
                      );
                    })
                  ) : (
                    <>{strings.no_product_categories_found}</>
                  )}
                </ul>
              ) : (
                <></>
              )}
            </div>
            {/* ======= search bar end ======= */}

            <Fragment>
              {/* ======== notification start ========= */}
              {loggedIn && (
                <>
                  <div
                    className="mr-[18px] cursor-pointer flex"
                    onClick={() => {
                      if (user?.isProfileCompleted) {
                        router.push("/chat");
                      } else {
                        router.push("/edit-profile");
                      }
                    }}
                  >
                    <Image src={images.userChat} alt="chaticon" />
                  </div>

                  <div
                    className={
                      language === "ar"
                        ? `${styles.notification} relative flex  ${styles.arabicnotification} cursor-pointer`
                        : `${styles.menuCustom} relative flex cursor-pointer`
                    }
                    onClick={() => {
                      router.push("/notifications"),
                        queryClient.refetchQueries(GET_NOTIFICATION_LIST_KEY);
                    }}
                  >
                    <div className="w-[22px] h-[22px] relative">
                      <Image src={images.notificationWhite} alt="chaticon" />
                    </div>

                    <span
                      className={
                        notificationCount !== 0
                          ? `absolute text-[9px] top-[-8px] font-semibold leading-[11px] flex items-center justify-center text-[#fff] bg-[#FF2828] rounded-[50%] h-[20px] w-[20px] right-[-8px] `
                          : ""
                      }
                    >
                      {notificationCount !== 0 ? notificationCount : ""}
                    </span>
                  </div>
                </>
              )}
              {/* ======== notification end ========= */}

              {/*============ image dropdown start ========== */}
              <Menu
                as="div"
                className={`${styles.dropdownBox}  relative inline-block text-left ml-[25px]`}
              >
                <div>
                  <Menu.Button className="flex items-center">
                    <div
                      className={`w-[40px]  
                    h-[40px] relative ${styles.upperBtn}`}
                    >
                      <Image
                        src={
                          !loggedIn
                            ? images.dummyProfile
                            : loggedIn && user?.pic
                            ? `${FILE_URL}${user?.pic}`
                            : images.avtar
                        }
                        alt="mark-location"
                        layout="fill"
                      />
                    </div>
                    <div className="ml-[5px]">
                      <div
                        className="w-[11.67px] 
                      h-[6.37px] relative"
                      >
                        <Image
                          src={images.langArrow}
                          alt="down-arrow"
                          layout="fill"
                        />
                      </div>
                    </div>
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    className={
                      language === "ar"
                        ? `${styles.searchBar} absolute right-0 mt-4 w-[256px] origin-top-right divide-y divide-gray-100 rounded-md bg-[#F1F6FC] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[9999]  ${styles.arabicMenuItem} `
                        : `${styles.menuCustom} absolute right-0 mt-4 w-[256px] origin-top-right divide-y divide-gray-100 rounded-md bg-[#F1F6FC] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[9999]`
                    }
                  >
                    <div className="">
                      {loggedIn ? (
                        <>
                          <Menu.Item>
                            <button
                              className="flex w-full items-center gap-[15px] p-[15px] border-b border-b-[#E4E4E4] cursor-pointer"
                              onClick={() => router.push("/profile")}
                            >
                              <div className="w-[22px] h-[22px] relative">
                                <Image
                                  src={images.profile}
                                  alt="profile_image"
                                  layout="fill"
                                />
                              </div>
                              <p className="font-medium text-[14px] leading-[16px] text-[#000000] opacity-[0.9] cursor-pointer">
                                {strings?.profile}
                              </p>
                            </button>
                          </Menu.Item>
                          <Menu.Item>
                            <button
                              className="flex w-full items-center gap-[15px] p-[15px] border-b border-b-[#E4E4E4] cursor-pointer"
                              onClick={() => router.push("/reviews")}
                            >
                              <div className="w-[21.08px] h-[20.4px] relative">
                                <Image
                                  src={images.star}
                                  alt="profile_image"
                                  layout="fill"
                                />
                              </div>
                              <p className="font-medium text-[14px] leading-[16px] text-[#000000] opacity-[0.9] cursor-pointer">
                                {strings?.reviews_and_rating}
                              </p>
                            </button>
                          </Menu.Item>
                          <Menu.Item>
                            <button className="flex w-full items-center gap-[15px] p-[15px] border-b border-b-[#E4E4E4] cursor-pointer">
                              <div className="w-[16.07px] h-[20.75px] relative">
                                <Image
                                  src={images.notification}
                                  alt="profile_image"
                                  layout="fill"
                                />
                              </div>
                              <p className="font-medium text-[14px] leading-[16px] text-[#000000] opacity-[0.9] cursor-pointer">
                                {strings?.notification}
                              </p>
                              <Switch
                                checked={user?.notification}
                                onChange={() => mutate()}
                                className={`${
                                  user?.notification
                                    ? `${styles.defaultNotification} "bg-primary" `
                                    : "bg-[#888888]"
                                }
                              relative inline-flex h-[18px] w-[33px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 ml-auto`}
                              >
                                <span className="sr-only">Use setting</span>
                                <span
                                  aria-hidden="true"
                                  className={`${
                                    user?.notification
                                      ? "translate-x-4"
                                      : "translate-x-0"
                                  }
                                pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                />
                              </Switch>
                            </button>
                          </Menu.Item>
                        </>
                      ) : (
                        <Menu.Item>
                          <button
                            className="flex w-full items-center gap-[15px] p-[15px] border-b border-b-[#E4E4E4] cursor-pointer"
                            onClick={() => router.push("/login")}
                          >
                            <div className="w-[14px] h-[19px] relative">
                              <Image
                                src={images.profile}
                                alt="profile_image"
                                layout="fill"
                              />
                            </div>
                            <p className="font-medium text-[14px] leading-[16px] text-[#000000] opacity-[0.9] cursor-pointer">
                              {strings?.login}
                            </p>
                          </button>
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        <>
                          <button className="border-b border-b-[#E4E4E4] w-full">
                            <Menu>
                              <div>
                                <Menu.Button className="flex w-full items-center gap-[15px] p-[15px]  cursor-pointer">
                                  <div className="w-[20px] h-[20px] relative">
                                    <Image
                                      src={images.language}
                                      alt="languagebtn"
                                      layout="fill"
                                    />
                                  </div>
                                  <p className="font-medium text-[14px] leading-[16px] text-[#000000] opacity-[0.9] cursor-pointer">
                                    {strings?.language}
                                  </p>
                                  <div
                                    className={`${styles.arrowDown1} w-[6.98px] h-[11.68px] relative ml-auto relative`}
                                  >
                                    <Image
                                      src={images.langDownArrow}
                                      alt="down Arrow"
                                      layout="fill"
                                    />
                                  </div>
                                </Menu.Button>
                              </div>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="">
                                  <div className="">
                                    <Menu.Item>
                                      <button
                                        className={
                                          language === "en"
                                            ? `${styles.langBtn} ${styles.active}`
                                            : `${styles.langBtn}`
                                        }
                                        onClick={() =>
                                          setAuthValue({
                                            ...getAuthValue(),
                                            language: "en",
                                          })
                                        }
                                      >
                                        <p className="">{strings?.english}</p>
                                      </button>
                                    </Menu.Item>
                                    <Menu.Item>
                                      <button
                                        className={
                                          language === "ar"
                                            ? `${styles.langBtn} ${styles.active}`
                                            : `${styles.langBtn}`
                                        }
                                        onClick={() =>
                                          setAuthValue({
                                            ...getAuthValue(),
                                            language: "ar",
                                          })
                                        }
                                      >
                                        <p className="">{strings?.arabic}</p>
                                      </button>
                                    </Menu.Item>
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          </button>
                        </>
                      </Menu.Item>
                      <Menu.Item>
                        <button
                          className="flex w-full items-center gap-[15px] p-[15px] border-b border-b-[#E4E4E4] cursor-pointer"
                          onClick={() => router.push("/about")}
                        >
                          <div className="w-[20px] h-[20px] relative">
                            <Image
                              src={images.about}
                              alt="about-image"
                              layout="fill"
                            />
                          </div>
                          <p className="font-medium text-[14px] leading-[16px] text-[#000000] opacity-[0.9] cursor-pointer">
                            {strings?.about}
                          </p>
                        </button>
                      </Menu.Item>
                      <Menu.Item>
                        <button
                          className="flex w-full items-center gap-[15px] p-[15px] border-b border-b-[#E4E4E4] cursor-pointer"
                          onClick={() => router.push("/terms-and-conditions")}
                        >
                          <div className="w-[20px] h-[20px] relative">
                            <Image
                              src={images.terms}
                              alt="terms_image"
                              layout="fill"
                            />
                          </div>
                          <p className="font-medium text-[14px] leading-[16px] text-[#000000] opacity-[0.9] cursor-pointer">
                            {strings?.term_and_conditions}
                          </p>
                        </button>
                      </Menu.Item>
                      <Menu.Item>
                        <button
                          className="flex w-full items-center gap-[15px] p-[15px] border-b border-b-[#E4E4E4] cursor-pointer"
                          onClick={() => router.push("/contact-us")}
                        >
                          <div className="w-[20px] h-[19.03px] relative">
                            <Image
                              src={images.messageIcon}
                              alt="messageIcon"
                              layout="fill"
                            />
                          </div>
                          <p className="font-medium text-[14px] leading-[16px] text-[#000000] opacity-[0.9] cursor-pointer">
                            {strings?.contact_us}
                          </p>
                        </button>
                      </Menu.Item>
                      {loggedIn && (
                        <Menu.Item>
                          <button
                            className="flex w-full items-center gap-[15px] p-[15px] border-b border-b-[#E4E4E4] cursor-pointer"
                            onClick={openLogOut}
                          >
                            <div className="w-[20px] h-[19.03px] relative">
                              <Image
                                src={images.logout}
                                alt="logoutIcon"
                                layout="fill"
                              />
                            </div>
                            <p className="font-medium text-[14px] leading-[16px] text-[#000000] opacity-[0.9] cursor-pointer">
                              {strings?.logout}
                            </p>
                          </button>
                        </Menu.Item>
                      )}
                    </div>
                  </Menu.Items>
                </Transition>
                {/* </Menu.Items> */}
                {/* </Transition> */}
              </Menu>
              {/*============ image dropdown end ========== */}
            </Fragment>
          </div>
          {/* ===== search bar section end ======== */}
        </div>
      </section>

      {/* ==== mobile header start ======== */}
      <section className="hidden ssm:block sm:block md:block">
        <ResponsiveHeader notificationCount={notificationCount} />
      </section>
      {/* ==== mobile header end ======== */}
      <LocationModal />

      {/* ==== log out pop start ======= */}
      <LogOutConfirmationModal />
      {/* ==== log out pop end ======= */}
    </>
  );
}

export default Header;
