import Image from "next/image";
import images from "../../../../Assets/images";
import styles from "../ProductTable/ProductTable.module.css";
function ProductTable() {
  return (
    <>
      <div
        className={`m-[15px 18px] sm:p-[10px] sm:m-[0px] ${styles.productTableMaindiv}`}
      >
        <div className={styles.productTableDiv}>
          <Image src={images.shampoo1} alt="shaving" />
          <div className={styles.productDetails}>
            <h6 className={`font-[600] text-[18px] sm:text-[15px] `}>
              Shampoo
            </h6>
            <p
              className={`text-[20px] font-[600] text-primary sm:text-18px sm:mt-[10px]`}
            >
              $27
            </p>
            <div className={styles.productDiscount}>
              <div className={styles.productDiscountImg}>
                <Image src={images.discountShape} alt="" />
              </div>
              <span className={styles.productDiscountOffer}>
                1 Offer Active
              </span>
            </div>
          </div>
        </div>

        <div className={styles.ratingDiv}>
          <p className={styles.ratingNo}>3.2</p>
          <div className={`ml-[4px]`}>
            <Image src={images.ratingStar} alt="str" />
          </div>
        </div>
      </div>
      <div>
        <hr className={styles.line} />
      </div>

      {/* HairCut */}
      <div
        className={`m-[15px 18px] sm:p-[10px] sm:m-[0px] ${styles.productTableMaindiv}`}
      >
        <div className={styles.productTableDiv}>
          <Image src={images.shampoo2} alt="shaving" />
          <div className={styles.productDetails}>
            <h6 className={`font-[600] text-[18px] sm:text-[15px] `}>
              Shampoo
            </h6>
            <p
              className={`text-[20px] font-[600] text-primary sm:text-18px sm:mt-[10px]`}
            >
              $27
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
        className={`m-[15px 18px] sm:p-[10px] sm:m-[0px] ${styles.productTableMaindiv}`}
      >
        <div className={styles.productTableDiv}>
          <Image src={images.shampoo3} alt="shaving" />
          <div className={styles.productDetails}>
            <h6 className={`font-[600] text-[18px] sm:text-[15px] `}>
              Shampoo
            </h6>
            <p
              className={`text-[20px] font-[600] text-primary sm:text-18px sm:mt-[10px]`}
            >
              $27
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
export default ProductTable;
