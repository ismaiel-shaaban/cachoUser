import Link from "next/link";
import styles from "../SalonProductAbout/SalonProductAbout.module.css";
function SalonProductAbout() {
  return (
    <>
      <p className={`font-[600] text-[17px]`}>About</p>
      <p
        className={`${styles.salonAboutPara} font-[500] text-[13px] sm:text-[11px]`}
      >
        Lorem ipsum dolor sit amet consectetur. Potenti turpis amet pharetra at
        dignissim neque accumsan. Egestas nam aliquet eget viverra sapien
        imperdiet potenti. Egestas id vestibulum velit interdum nisi. Fringilla
        tincidunt tellus maecenas nunc lorem elit facilisis. Luctus felis nisl
        suscipit ut massa ornare pretium...{" "}
        <button
          className={`${styles.salonReadMore} font-[500] text-[13px] sm:text-[11px]`}
        >
          read more
        </button>
      </p>
    </>
  );
}
export default SalonProductAbout;
