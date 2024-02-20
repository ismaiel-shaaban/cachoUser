import Image from "next/image";
import React from "react";
import images from "src/Assets/images";
import styles from "./BecomeVendor.module.css";
import { strings } from "src/Utils/Localization";

function BecomeVendor() {
  return (
    <>
      <section
        className={`pt-[111px] ssm:pt-[50px] pb-[90px] ssm:pb-[50px] relative ${styles.vendor}`}
      >
        <div className="main-container mx-auto flex w-full gap-[100px] items-center flex-wrap ssm:justify-center sm:justify-center md:gap-[50px]">
          <div className="relative max-w-[400px] w-full ">
            <Image src={images.workMan} alt="work man" />
          </div>
          <div className={`ssm:text-center sm:text-center ${styles.sideDiv}`}>
            <h2 className="font-bold text-[34px] leading-[140%] text-[#1c2a34]">
              Vendor <span className="text-[#057E91]">get to work</span>
            </h2>
            <p className="font-normal text-[20px] leading-[30px] text-[#616364] max-w-[456px] w-full mt-[25px]">
              Our team always ready to accept your challenge. To meet your goals
              is our main objective. Professional service, 24/7 client support,
              teamwork, and collaboration.
            </p>
            <div className="flex mt-[35px] ssm:justify-center sm:justify-center">
              <div>
                <h5 className="font-semibold text-[24px] leading-[28.8px] text-center text-black">
                  52K
                </h5>
                <p className="font-normal leading-[28px] text-center text-black">
                 {strings?.services}
                </p>
              </div>
              <div className="ml-[60px]">
                <h5 className="font-semibold text-[24px] leading-[28.8px] text-center text-black">
                  21K
                </h5>
                <p className="font-normal leading-[28px] text-center text-black">
                  Vendors
                </p>
              </div>
              <div className="ml-[50px]">
                <h5 className="font-semibold text-[24px] leading-[28.8px] text-center text-black">
                  10K+
                </h5>
                <p className="font-normal leading-[28px] text-center text-black">
                  Products
                </p>
              </div>
            </div>
            <button
              className={`${styles.viewBtn} font-bold text-[24px] leading-[34px] text-white py-[16px] px-[40px]`}
            >
              Become a Vendor
            </button>
          </div>
        </div>
        <div
          className={`absolute bottom-[145px]
    right-[-23px] rotate-[78.5deg] ${styles.vendorSideImage}`}
        >
          <Image
            src={images.vendorSideImage}
            alt="vendor pattern"
            height={"111px"}
            width={"218px"}
          />
        </div>
      </section>
    </>
  );
}

export default BecomeVendor;
