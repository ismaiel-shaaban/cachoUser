import React from "react";
import RightSideSlider from "./RightSideSlider/RightSideSlider";
import styles from "./ReviewSection.module.css";

function ReviewSection() {
  return (
    <>
      <section className="bg-[#F8FAFC] p-[100px] ssm:p-[10px] sm:p-[10px] md:p-[10px]">
        <div className="main-container w-full mx-auto flex flex-wrap">
          <div
            className={`max-w-[574px] w-full ${styles.leftside} lg:max-w-[474px]`}
          >
            <h2 className="font-bold text-[36px] leading-[52px] tracking-[0.3px] text-[#1c2a34]">
              Powering the growth of 100+ business & retailers in Indonesia.
            </h2>
            <p className="font-medium text-[16px] leading-[32px] tracking-[0.3px] text-[#616364] mt-[25px]">
              From single store, startups, to large multi-store brands.
            </p>
          </div>
          {/* review slider */}

          <RightSideSlider />
        </div>
      </section>
    </>
  );
}

export default ReviewSection;
