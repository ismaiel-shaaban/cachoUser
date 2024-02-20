import React from "react";
import styles from "./SliderContent.module.css";
import Image from "next/image";
import images from "src/Assets/images";

function SliderContent(props: any) {
  const { slideritems } = props;

  return (
    <>
      <div>
        <div className="flex gap-[21px] items-start">
          <Image
            src={images.comma}
            alt="comma image"
            height={"50px"}
            width={"49px"}
          />
          <div className={`${styles.starImages} text-left`}>
            <Image
              src={images.reviewStar}
              alt="star review"
              height={"18px"}
              width={"18px"}
            />
            <Image
              src={images.reviewStar}
              alt="star review"
              height={"18px"}
              width={"18px"}
            />
            <Image
              src={images.reviewStar}
              alt="star review"
              height={"18px"}
              width={"18px"}
            />
            <Image
              src={images.reviewStar}
              alt="star review"
              height={"18px"}
              width={"18px"}
            />
            <Image
              src={images.reviewStar}
              alt="star review"
              height={"18px"}
              width={"18px"}
            />
            <p className="font-medium text-[18px] leading-[32px] text-[#616364] italic">
              “With Ehya, we’re able to easily track our performance in full
              detail. It’s become an essential tool for us to grow and engage
              with our audience.”
            </p>
          </div>
        </div>
        <div className="flex gap-[15px] mt-[30px] items-start">
          <div className="relative h-[56px] w-[56px] ">
            <Image
              src={slideritems?.sliderImage}
              alt="user review profile"
              layout="fill"
            />
          </div>
          <div className={`text-left ${styles.reviewHeading}`}>
            <h2 className="font-bold text-[20px] leading-[24px] tracking-[0.2px] text-[#057e91]">
              {slideritems?.sliderHeading}
            </h2>
            <p className="font-normal text-[16px] leading-[28px] text-[#616364]">
              {slideritems?.sliderPara}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SliderContent;
