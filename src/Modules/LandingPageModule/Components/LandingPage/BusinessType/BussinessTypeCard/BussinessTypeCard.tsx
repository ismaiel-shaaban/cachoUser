import Image from "next/image";
import React from "react";
import styles from "./BussinessTypeCard.module.css";

function BussinessTypeCard(props: any) {
  const { value } = props;
  return (
    <>
      <div
        className={`w-[104px] bg-[#F4F5F9] rounded-[8px] py-[10px] px-[16px] text-center ${styles.categoryCard} `}
      >
        <div className="w-[60px] h-[60px] relative mx-auto">
          <Image src={value?.image} alt="women_sallon" layout={"fill"} />
        </div>
        <p className="font-semibold text-[12px] leading-[150%] text-black mt-[15px] px-[5px]">
          {value?.title}
        </p>
      </div>
    </>
  );
}

export default BussinessTypeCard;
