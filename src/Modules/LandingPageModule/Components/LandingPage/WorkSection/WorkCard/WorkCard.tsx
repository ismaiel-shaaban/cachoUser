import Image from "next/image";
import React from "react";
import styles from "./WorkCard.module.css";

function WorkCard(props: any) {
  const { item } = props;
  return (
    <>
      <div
        className={`w-[100%] py-[30px] pl-[30px] pr-[51px] bg-white rounded-[15px] flex items-center gap-[25px] ssm:px-[20px] ssm:py-[20px] ${styles.WorkCard}`}
      >
        <div className="w-[70px]">
          <Image src={item?.cardImage} alt="compass image" />
        </div>
        <h4 className=" text-[20px] ssm:text-[16px] font-semibold leading-[32px] ssm:leading-[26px] text-[#12141D] text-left ">
          {item?.title}
        </h4>
      </div>
    </>
  );
}

export default WorkCard;
