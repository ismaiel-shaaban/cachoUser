import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import images from "src/Assets/images";
import SnackbarHandler from "src/Utils/SnackbarHandler";
import useAuthValue, { getAuthValue, setAuthValue } from "../../Hooks/useAuthValue";
import AuthHeader from "../AuthHeader/AuthHeader";
import { useRouter } from "next/router";
;
import Loader from "src/Components/Loader/Loader";
import { getCurrentLocation } from "src/Utils/Helpers";
import LocationModal, { locationEventModal } from "src/Modules/LayoutModule/Component/LocationModal/LocationModal";
import { strings } from "src/Utils/Localization";

function GetLocation() {
  const [loader, setLoader] = useState(false);
  const{loggedIn}=useAuthValue()
  return (
    <>
      <AuthHeader />
      {loader && <Loader />}
      <section className="py-[50px] ssm:py-[10px]">
        <div className="main-container p-[10px] mx-auto flex items-center gap-[159px] ssm:gap-[30px] sm:gap-[30px] md:gap-[30px] flex-wrap ssm:p-[15px] sm:justify-center md:justify-center">
          <div className="languageImg relative max-w-[474px] w-full h-[474px]">
            <Image src={images.location} alt="location-image" layout="fill" />
          </div>
          <div className="languageRight ssm:w-full">
            {/* <button className="bg-inherit">
              <Image
                src={images.arrowLeft}
                alt="arrow left"
                width={"28px"}
                height={"28px"}
              />
            </button> */}
            <h2 className="font-semibold ssm:font-normal text-[24px] ssm:text-[22px] ssm:leading-[120%] leading-[150%] text-[#000000] mt-[25px]">
              {strings?.set_your_location}
            </h2>
            <p className="font-normal text-[16px] ssm:text-[15px] sm:leading-[120%] leading-[150%] text-[#000000] mt-[15px]">
             {strings?.see_nearby_services}
            </p>

            {/* ====== get location button start========= */}
            <button
              className="bg-primary min-w-[318px] ssm:min-w-[auto] w-full gap-[20px] flex items-center py-[6px] px-[16px] rounded-[27.5px] mt-[40px]"
              onClick={()=>getCurrentLocation(loggedIn)}
            >
              <Image src={images.gps} alt="gps_image" />
              <div className="btnContent">
                <h5 className="font-semibold text-[15px] leading-[150%] text-[#ffffff]">
                  {strings?.use_current_location}
                </h5>
                <p className="font-normal text-[12px] leading-[150%] text-[#ffffff] text-left">
                  {strings?.enable_current_location}
                </p>
              </div>
            </button>
            {/* ====== get location button end========= */}

            {/* ===========enter manual location start ========= */}
            <button
              className="bg-#F5F5F5 min-w-[318px] ssm:min-w-[auto] w-full gap-[8px] flex items-center py-[14px] px-[15px]
              border border-[#888888] rounded-[27.5px] mt-[25px]"
              onClick={locationEventModal}
            >
              <Image
                src={images.searchIcon}
                alt="search_Icon"
                height={"20px"}
                width={"20px"}
              />
              <h5 className="font-normal text-[17px] leading-[150%] text-[#000000]">
               {strings?.enter_location_manually}
              </h5>
            </button>
            {/* ===========enter manual location end ========= */}
          </div>
        </div>
      </section>
      <LocationModal />
    </>
  );
}

export default GetLocation;
