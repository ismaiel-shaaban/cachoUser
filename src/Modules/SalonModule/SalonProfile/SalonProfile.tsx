import images from "../../../Assets/images";
import styles from "./SalonProfile.module.css";
// import "../../../Modules/SalonModule/SalonProfile/SalonProfile.module.css";
import SalonAbout from "../SalonAbout/SalonAbout";
import SalonDescription from "../SalonDescription/SalonDescription";
import Image from "next/image";
function SalonProfile() {
  return (
    <>
      <section className={styles.salonWrapper}>
        <div className={styles.mainDiv}>
          <div className={styles.profileDiv}>
            <Image src={images.profileImg} alt={"logo"} />
          </div>
          <div className={styles.profileStar}>
            <div className={styles.profileParaMainDiv}>
              <h3 className={styles.profilePara}>Notdone Salon</h3>
              <div className={styles.profileSalonMainDiv}>
                <div className={styles.salonTimeDiv}>
                  <Image src={images.salon} alt="salon" />
                  <h6 className={styles.profileSalonHead}>Salon</h6>
                </div>
                <div className={styles.salonTimeDiv}>
                  <Image src={images.profileTime} alt="salon" />
                  <p className={styles.profileSalon}>
                    <span className={styles.salonTimePara}>Opening Hour </span>
                    09:00 am to 8:00 pm
                  </p>
                </div>

                <div className={styles.profileSalonLocation}>
                  <Image src={images.locationImg} alt="salon" />
                  <span className={styles.profileSalon}>
                    1901 Thornridge Cir. Shiloh, Hawaii 81063
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.profileStarMaindiv}>
              <div className={`${styles.profileStarSpan}`}>
                <div className={`${styles.starSpanDiv}`}>
                  <div className={`w-[12px] ml-[7px] mt-[6px]`}>
                    <Image src={images.starImage} alt={"str"} />
                  </div>
                  <span className={`${styles.divSpan}`}>4.5</span>
                </div>
                <div className={styles.reviewDiv}>
                  <div className={`${styles.reviewNo}`}>
                    <p className={`${styles.reviewPara}`}>
                      35K<span className={`${styles.reviews}`}>Reviews</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className={`flex mt-[50px] md:mt-[0px] sm:mt-[0px]`}>
                <button
                  className={`${styles.directionBtn}`}
                  onClick={() =>
                    window.open(
                      "https://www.google.com/maps/@28.628223,77.389849,15z?entry=ttu"
                    )
                  }
                >
                  <div className={`flex`}>
                    <Image src={images.frame} alt="direc" />
                  </div>

                  <span className={` ${styles.directionSpan}`}>Directions</span>
                </button>
                <button className={styles.whatsappBtn}>
                  <div className={`flex`}>
                    <Image src={images.whatsapp} alt="direc" />
                  </div>
                  <span className={styles.whatsappSpan}>Whatsapp</span>
                </button>
              </div>
            </div>
          </div>
          <hr className={styles.line} />
          <div className={styles.salonaboutMaindiv}>
            <SalonAbout />
          </div>
          <hr className={styles.line} />
          <div className={styles.salonDescriptionMaindiv}>
            <SalonDescription />
          </div>
        </div>
      </section>
    </>
  );
}
export default SalonProfile;
