import Link from "next/link";
import styles from "../SalonAbout/SalonAbout.module.css";
import { strings } from "src/Utils/Localization";
function SalonAbout() {
  return (
    <>
      <p className={styles.salonAbout}>{strings?.about}</p>
      <p className={styles.salonAboutPara}>
        Lorem ipsum dolor sit amet consectetur. Potenti turpis amet pharetra at
        dignissim neque accumsan. Egestas nam aliquet eget viverra sapien
        imperdiet potenti. Egestas id vestibulum velit interdum nisi. Fringilla
        tincidunt tellus maecenas nunc lorem elit facilisis. Luctus felis nisl
        suscipit ut massa ornare pretium...{" "}
        <button className={styles.salonReadMore}>read more</button>
      </p>
    </>
  );
}
export default SalonAbout;
