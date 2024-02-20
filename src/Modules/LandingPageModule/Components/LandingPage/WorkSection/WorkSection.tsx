import Image from "next/image";
import React from "react";
import images from "src/Assets/images";
import WorkCard from "./WorkCard/WorkCard";
import styles from "./WorkSection.module.css";

function WorkSection() {
  const cardData = [
    {
      id: 1,
      cardImage: images.compassIcon,
      title: "Get all Services from a single platform.",
    },
    {
      id: 2,
      cardImage: images.msgIcon,
      title: "Communicate with your customers on time.",
    },
    {
      id: 3,
      cardImage: images.usersIcon,
      title: "Collaborate on real service to learn things.",
    },
    {
      id: 4,
      cardImage: images.pieChartIcon,
      title: "Get regular updates with customers.",
    },
  ];

  return (
    <>
      {/* ===== work section start =====  */}
      <section
        className={`bg-[#F6EDE9] mx-[50px] ssm:mx-[10px] sm:mx-[10px] md:mx-[10px] lg:mx-[10px] pt-[60px] pb-[65px] ${styles.work}`}
      >
        <div
          className={`max-w-[970px] mx-auto text-center w-full ${styles.mainDiv}`}
        >
          <h1 className="font-bold text-[40px] text-[#1c2a34] leading-[70px]">
            How the CACHOO work
          </h1>
          <p className="font-medium text-[18px] leading-[30px] text=-[#2c272e] mt-[15px]">
            See why millions of people across 195 countries use App Landing
          </p>
          <div className="flex flex-wrap gap-[20px] mt-[50px] ssm:mt-[30px]">
            {cardData?.map((value, index) => {
              return <WorkCard item={value} key={index} />;
            })}
          </div>
          <div className="flex items-center justify-center mt-[55px] gap-[31px] flex-wrap">
            <h3 className="font-bold text-[24px] leading-[70px] text-[#1c2a34]">
              Download App
            </h3>
            <div className="flex flex-wrap gap-[20px] justify-center">
              <div className="relative w-[200px] h-[60px]">
                <Image
                  src={images.googleplayImage}
                  alt="google play image"
                  layout="fill"
                />
              </div>
              <div className="relative w-[200px] h-[60px] ">
                <Image
                  src={images.appleStoreImage}
                  alt="google play image"
                  layout="fill"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ===== work section end =====  */}
    </>
  );
}

export default WorkSection;
