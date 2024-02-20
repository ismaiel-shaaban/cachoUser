import Image from "next/image";
import images from "../../../Assets/images";
import styles from "./ProductCategories.module.css";
function ProductCategories() {
  return (
    <>
      <section className={`bg-globalColor flex pt-[20px] ${styles.prdSec}`}>
        <div className={`ml-[100px] lg:ml-[20px] ${styles.prdClass}`}>
          <h4 className={`font-[600] text-[15px] xsm:text-[13px]`}>
            Product Categories
          </h4>

          <div className={`mt-[10px] flex flex-col`}>
            <div className={"mb-[15px]"}>
              <label>
                <input
                  type="checkbox"
                  id="agree"
                  // checked={}
                />
                <span
                  className={`font-[600] ml-[10px] text-[14px] xsm:text-[13px]`}
                >
                  Above 4+ Rating
                </span>
              </label>
            </div>
            <label>
              <input
                type="checkbox"
                id="agree"
                // checked={}
              />
              <span
                className={`font-[400] ml-[10px] text-[14px] ${styles.checkFont} xsm:text-[13px]`}
              >
                Near by
              </span>
            </label>
          </div>
        </div>
        <div
          className={`bg-white max-w-800 p-[20px] w-full ml-[40px] lg:ml-[20px] ${styles.salonBlock}`}
        >
          <h6 className={`font-[600]`}>228 Salons Near You</h6>
          <div className={`${styles.productTableMaindiv}`}>
            <div className={`flex`}>
              <div className={`xsm:w-[120px] sm:w-[140px]`}>
                {" "}
                <Image src={images.productImg1} alt="shaving" />
              </div>

              <div className={`ml-[14.95px]`}>
                <h6
                  className={`font-[600] text-[18px] xsm:font-[600] xsm:text-[13px] sm:text-[14px]`}
                >
                  Notdone Salon
                </h6>
                <div
                  className={`bg-primary w-1/4 mt-[8px] ${styles.salonDivBtn} sm:w-[30%] sm:mt-[6px]`}
                >
                  <p
                    className={`flex justify-center text-[13px] p-[2px] xsm:text-[12px] xsm:p-[2px] sm:p-[3px] sm:text-[12px]`}
                  >
                    Salon
                  </p>
                </div>
                <div className={`flex mt-[13px] sm:mt-[12px]`}>
                  <span
                    className={`font-[400] text-[13px] ${styles.checkFont} xsm:text-[10px] sm:text-[11px]`}
                  >
                    1901 Thornridge Cir. Shiloh, Hawaii 81063
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.ratingDiv}>
              <p
                className={`font-[600] text-[13px] ml-[5px] xsm:text-[12px] xsm:ml-[3px] ${styles.ratingNo}`}
              >
                4.5
              </p>
              <div className={`ml-[4px] xsm:ml-[2px] `}>
                <Image src={images.ratingStar} alt="str" />
              </div>
            </div>
          </div>
          <div>
            <hr className={styles.line} />
          </div>

          {/* HairCut */}
          <div className={`${styles.productTableMaindiv}`}>
            <div className={`flex`}>
              <div className={`xsm:w-[120px] sm:w-[140px]`}>
                {" "}
                <Image src={images.productImg2} alt="shaving" />
              </div>
              <div className={`ml-[14.95px]`}>
                <h6
                  className={`font-[600] text-[18px] xsm:font-[600] xsm:text-[13px] sm:text-[14px]`}
                >
                  Notdone Salon
                </h6>
                <div
                  className={`bg-primary w-1/4 mt-[8px] ${styles.salonDivBtn} sm:w-[30%] sm:mt-[6px]`}
                >
                  <p
                    className={`flex justify-center text-[13px] p-[2px]  xsm:text-[12px] xsm:p-[2px] sm:p-[3px] sm:text-[12px]`}
                  >
                    Salon
                  </p>
                </div>
                <div className={`flex mt-[13px] sm:mt-[12px]`}>
                  <span
                    className={`font-[400] text-[13px] ${styles.checkFont}  xsm:text-[10px] sm:text-[11px]`}
                  >
                    1901 Thornridge Cir. Shiloh, Hawaii 81063
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.ratingDiv}>
              <p
                className={`font-[600] text-[13px] ml-[5px] xsm:text-[12px] xsm:ml-[3px] ${styles.ratingNo}`}
              >
                4.5
              </p>
              <span className={`ml-[4px]`}>
                <Image src={images.ratingStar} alt="str" />
              </span>
            </div>
          </div>
          <div>
            <hr className={styles.line} />
          </div>

          {/* Massage */}
          <div className={`${styles.productTableMaindiv}`}>
            <div className={`flex`}>
              <div className={`xsm:w-[120px] sm:w-[140px]`}>
                {" "}
                <Image src={images.productImg3} alt="shaving" />
              </div>
              <div className={`ml-[14.95px]`}>
                <h6
                  className={`font-[600] text-[18px] xsm:font-[600] xsm:text-[13px] sm:text-[14px]`}
                >
                  Notdone Salon
                </h6>
                <div
                  className={`bg-primary w-1/4 mt-[8px] ${styles.salonDivBtn} sm:w-[30%] sm:mt-[6px]`}
                >
                  <p
                    className={`flex justify-center text-[13px] p-[2px]  xsm:text-[12px] xsm:p-[2px] sm:p-[3px] sm:text-[12px]`}
                  >
                    Salon
                  </p>
                </div>
                <div className={`flex mt-[13px] sm:mt-[12px]`}>
                  <span
                    className={`font-[400] text-[13px] ${styles.checkFont}  xsm:text-[10px] sm:text-[11px]`}
                  >
                    1901 Thornridge Cir. Shiloh, Hawaii 81063
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.ratingDiv}>
              <p
                className={`font-[600] text-[13px] ml-[5px] xsm:text-[12px] xsm:ml-[3px] ${styles.ratingNo}`}
              >
                4.5
              </p>
              <span className={`ml-[4px]`}>
                <Image src={images.ratingStar} alt="str" />
              </span>
            </div>
          </div>

          <div>
            <hr className={styles.line} />
          </div>
          <div className={`${styles.productTableMaindiv}`}>
            <div className={`flex`}>
              <div className={`xsm:w-[120px] sm:w-[140px]`}>
                {" "}
                <Image src={images.productImg4} alt="shaving" />
              </div>
              <div className={`ml-[14.95px]`}>
                <h6
                  className={`font-[600] text-[18px]  xsm:font-[600] xsm:text-[13px] sm:text-[14px]`}
                >
                  Notdone Salon
                </h6>
                <div
                  className={`bg-primary w-1/4 mt-[8px] ${styles.salonDivBtn} sm:w-[30%] sm:mt-[6px]`}
                >
                  <p
                    className={`flex justify-center text-[13px] p-[2px]  xsm:text-[12px] xsm:p-[2px] sm:p-[3px] sm:text-[12px]`}
                  >
                    Salon
                  </p>
                </div>
                <div className={`flex mt-[13px] sm:mt-[12px]`}>
                  <span
                    className={`font-[400] text-[13px] ${styles.checkFont}  xsm:text-[10px] sm:text-[11px]`}
                  >
                    1901 Thornridge Cir. Shiloh, Hawaii 81063
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.ratingDiv}>
              <p
                className={`font-[600] text-[13px] ml-[5px] xsm:text-[12px] xsm:ml-[3px] ${styles.ratingNo}`}
              >
                4.5
              </p>
              <span className={`ml-[4px]`}>
                <Image src={images.ratingStar} alt="str" />
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default ProductCategories;
