import images from "../../../Assets/images";
import styles from "./SalonProductProfile.module.css";
import Image from "next/image";
import SalonProductAbout from "../SalonProductAbout/SalonProductAbout";
import SalonProductOffer from "../SalonProductOffer/SalonProductOffer";
import SalonProductReview from "../SalonProductReview/SalonProductReview";

function SalonProductProfile() {
  return (
    <>
      <section
        className={`bg-globalColor flex flex-wrap justify-center ${styles.salonWrapper}`}
      >
        <div className={`bg-white ${styles.salonProductDiv}`}>
          <div className={`flex justify-center px-[12px] py-[18px]`}>
            <Image src={images.shampooImg} alt="shampoo" />
          </div>
          <div className={`flex justify-between`}>
            <div className={`flex flex-col my-[15px] mx-[18px]`}>
              <h3 className={`font-[700] text-[24px]`}>Shampoo</h3>
              <div className={`flex flex-col mt-[10px]`}>
                <div className={`flex items-center`}>
                  <div>
                    <Image src={images.salon} alt="salon" />
                  </div>
                  <span
                    className={`font-[400] text-[13px] ml-[12px] mt-[6px] md:text-[12px] sm:text-[11px] sm:mb-[10px]`}
                  >
                    Salon
                  </span>
                </div>

                <div className={`flex items-center mt-[12px]`}>
                  <div className={`sm:w-[35px]`}>
                    <Image src={images.locationImg} alt="salon" />
                  </div>

                  <span
                    className={`font-[400] text-[13px] ml-[12px] md:text-[12px] sm:text-[11px]`}
                  >
                    1901 Thornridge Cir. Shiloh, Hawaii 81063
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.profileStarMaindiv}>
              <div className={`flex justify-end items-center`}>
                <div>
                  <p
                    className={`mr-[20px] text-[24px] font-[600] ${styles.profileNum} sm:text-[15px]`}
                  >
                    $27
                  </p>
                </div>
                <div className={styles.ratingDiv}>
                  <p
                    className={`font-[600] text-[13px] xsm:text-[12px] ${styles.ratingNo} sm:text-[11px]`}
                  >
                    3.2
                  </p>
                  <span className={`ml-[4px]`}>
                    <Image src={images.ratingStar} alt="str" />
                  </span>
                </div>
              </div>
              {/* </div> */}
              <div className={`flex mt-[40px] sm:mt-[50px] `}>
                <button className={`${styles.directionBtn}`}>
                  <div className={`flex sm:w-[20px] sm:my-[8px] sm:mx-[15px]`}>
                    <Image src={images.frame} alt="direc" />
                  </div>

                  <span
                    className={`ml-[12px] ${styles.directionSpan} sm:hidden`}
                  >
                    Directions
                  </span>
                </button>
                <button className={`${styles.whatsappBtn}`}>
                  <div className={`flex sm:w-[20px] sm:my-[8px] sm:mx-[15px]`}>
                    <Image src={images.whatsapp} alt="direc" />
                  </div>
                  <span className={`${styles.whatsappSpan} sm:hidden`}>
                    Whatsapp
                  </span>
                </button>
              </div>
            </div>
          </div>
          <hr className={styles.line} />
          <div className={styles.salonaboutMaindiv}>
            <SalonProductAbout />
          </div>
          <hr className={styles.line} />
          <div className={`my-[15px] mx-[18px]`}>
            <SalonProductOffer />
          </div>
          <hr className={styles.line} />
          <div className={`mt-[15px] mx-[18px]`}>
            <SalonProductReview />
          </div>
        </div>
      </section>
    </>
  );
}
export default SalonProductProfile;
