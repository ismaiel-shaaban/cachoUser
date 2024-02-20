import Image from "next/image";
import images from "../../../../Assets/images";
import styles from "../ServiceTable/ServiceTable.module.css";
function ServiceTable() {
  return (
    <>
      <div
        className={`${styles.productTableMaindiv} m-[15px 18px] sm:p-[10px] sm:m-[0px] `}
      >
        <div className={styles.productTableDiv}>
          <Image src={images.shaving} alt="shaving" />
          <div className={styles.productDetails}>
            <h6 className={`font-[600] text-[18px] sm:text-[15px]`}>Shaving</h6>
            <p
              className={`text-[20px] font-[600] text-primary sm:text-18px sm:mt-[10px]`}
            >
              $5
            </p>
            <div className={styles.productDiscount}>
              <Image
                src={images.discountShape}
                alt=""
                className={styles.productDiscountImg}
              />
              <span className={styles.productDiscountOffer}>
                1 Offer Active
              </span>
            </div>
          </div>
        </div>

        <div className={styles.ratingDiv}>
          <p className={styles.ratingNo}>3.2</p>
          <span className={`ml-[4px]`}>
            <Image src={images.ratingStar} alt="str" />
          </span>
        </div>
      </div>
      <div>
        <hr className={styles.line} />
      </div>

      {/* HairCut */}
      <div
        className={`${styles.productTableMaindiv} m-[15px 18px] sm:p-[10px] sm:m-[0px] `}
      >
        <div className={styles.productTableDiv}>
          <Image src={images.hairCut} alt="shaving" />
          <div className={styles.productDetails}>
            <h6 className={`font-[600] text-[18px] sm:text-[15px]`}>Haircut</h6>
            <p
              className={`text-[20px] font-[600] text-primary sm:text-18px sm:mt-[10px]`}
            >
              $10
            </p>
            <div className={styles.productDiscount}>
              <Image
                src={images.discountShape}
                alt=""
                className={styles.productDiscountImg}
              />
              <span className={styles.productDiscountOffer}>
                1 Offer Active
              </span>
            </div>
          </div>
        </div>

        <div className={styles.ratingDiv}>
          <p className={styles.ratingNo}>3.2</p>
          <span className={`ml-[4px]`}>
            <Image src={images.ratingStar} alt="str" />
          </span>
        </div>
      </div>
      <div>
        <hr className={styles.line} />
      </div>

      {/* Massage */}
      <div
        className={`${styles.productTableMaindiv} m-[15px 18px] sm:p-[10px] sm:m-[0px] `}
      >
        <div className={styles.productTableDiv}>
          <Image src={images.massage} alt="shaving" />
          <div className={styles.productDetails}>
            <h6 className={`font-[600] text-[18px] sm:text-[15px]`}>Massage</h6>
            <p
              className={`text-[20px] font-[600] text-primary sm:text-18px sm:mt-[10px]`}
            >
              $42
            </p>
            <div className={styles.productDiscount}>
              <Image
                src={images.discountShape}
                alt=""
                className={styles.productDiscountImg}
              />
              <span className={styles.productDiscountOffer}>
                1 Offer Active
              </span>
            </div>
          </div>
        </div>

        <div className={styles.ratingDiv}>
          <p className={styles.ratingNo}>3.2</p>
          <span className={`ml-[4px]`}>
            <Image src={images.ratingStar} alt="str" />
          </span>
        </div>
      </div>
    </>
  );
}
export default ServiceTable;
