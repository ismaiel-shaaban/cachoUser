import Image from "next/image";
import React from "react";
import images from "src/Assets/images";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import styles from "./AuthHeader.module.css";
import useAuthValue, {
  getAuthValue,
  setAuthValue,
} from "../../Hooks/useAuthValue";
import { strings } from "src/Utils/Localization";

function AuthHeader() {
  const { language } = useAuthValue();
  return (
    <section className="topHeaderArea w-full bg-primary py-[10px] border-b-[1px] border-[#c2c2c229]">
      <div className="main-container mx-auto py-[11px] px-[10px] flex items-center justify-between ssm:p-[15px]">
        <Link href={""}>
          <div className="relative w-[135px] ssm:w-[110px] h-[44.7px] cursor-pointer ">
            <Image src={images.logo} alt="main-logo" layout="fill" />
          </div>
        </Link>
        {/* ===== language button start ==== */}

        <div className="flex items-center">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button
                className={` ${styles.countryBtn} "min-w-[133px] flex items-center justify-end"`}
              >
                <div className="h-[24px] w-[24px] ssm:h-[30px] ssm:w-[30px]  relative">
                  <Image src={images.flag} alt="flag" layout={"fill"} />
                </div>
                <p className="ml-[10px] font-semibold ssm:font-normal text-[15px] leading-[150%] ssm:leading-[120%] text-[#eeeeee]">
                  {language === "en" ? strings?.english : strings?.arabic}
                </p>
                <div className="ml-[5px] w-[11.67px] h-[6.37px] relative">
                  <Image src={images.langArrow} alt="arrow" layout="fill" />
                </div>
                {/* <ChevronDownIcon
                  className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                  aria-hidden="true"
                /> */}
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
                    ? ` ${styles.dropdownBox} absolute right-0 mt-4 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[9999] ${styles.arabicDropdownBox} absolute left-0 right-auto min-w-[108px] mt-4 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[9999] `
                    : ` ${styles.dropdownBox} absolute right-0 mt-4 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[9999]`
                }
              >
                <div className="">
                  <Menu.Item>
                    <button
                      className={
                        language !== "en"
                          ? `${styles.langBtn} border-b border-b-[#E4E4E4]`
                          : `${styles.langBtn} ${styles.active} border-b border-b-[#E4E4E4]`
                      }
                      onClick={() =>
                        setAuthValue({ ...getAuthValue(), language: "en" })
                      }
                    >
                      <p className="">{strings?.english}</p>
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      className={
                        language !== "ar"
                          ? `${styles.langBtn}`
                          : `${styles.langBtn} ${styles.active}`
                      }
                      onClick={() =>
                        setAuthValue({ ...getAuthValue(), language: "ar" })
                      }
                    >
                      <p className="">{strings?.arabic}</p>
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      {/* ===== language button end ==== */}
    </section>
  );
}

export default AuthHeader;
