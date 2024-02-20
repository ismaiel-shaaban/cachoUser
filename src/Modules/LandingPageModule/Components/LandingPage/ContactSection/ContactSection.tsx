import Image from "next/image";
import Link from "next/link";
import React from "react";
import images from "src/Assets/images";
import styles from "./ContactSection.module.css";

function ContactSection() {
  return (
    <>
      <section className=" py-[60px]">
        <div
          className={`main-container mx-auto w-full flex items-center ${styles.contact} justify-between flex-wrap ssm:gap-[20px] sm:gap-[20px] `}
        >
          <div className="max-w-[400px] w-full">
            <h2 className="font-bold text-[36px] leading-[44px] tracking-[0.3px] text-white">
              Grow your brand presence on social media
              <Image
                src={images.emoji}
                alt="emoji"
                width={"34.17px"}
                height={"32px"}
              />
            </h2>
            <p className="mt-[20px] font-medium text-[16px] leading-[32px] tracking-[0.3px] text-white">
              Join with more 1200+ happy customers
            </p>
            <div className="flex gap-[14.3px] items-center mt-[15px]">
              <ul className={`flex ${styles.growUser}`}>
                <li>
                  <Image src={images.item1} alt="user_images" layout="fill" />
                </li>
                <li>
                  <Image src={images.item2} alt="user_images" layout="fill" />
                </li>
                <li>
                  <Image src={images.item3} alt="user_images" layout="fill" />
                </li>
                <li>
                  <Image src={images.item4} alt="user_images" layout="fill" />
                </li>
                <li>
                  <Image src={images.item5} alt="user_images" layout="fill" />
                </li>
              </ul>
              <Link href={""}>
                <p className="font-medium text-[14px] leading-[32px] tracking-[0.3px] text-white underline cursor-pointer">
                  and others
                </p>
              </Link>
            </div>
          </div>
          {/* ===== contact button === */}
          <button className="font-semibold text-[18px] leading-[22px] tracking-[0.3px] text-primary py-[18px] px-[40px] bg-white rounded-[4px]">
            Contact Now
          </button>
        </div>
      </section>
    </>
  );
}

export default ContactSection;
