import images from "src/Assets/images";
import styles from "./SalonProductReview.module.css";
import Image from "next/image";
function SalonProductReview() {
  return (
    <>
      <h3 className={`font-[600] text-[15px]`}>Reviews</h3>
      <div>
        <div
          className={`flex justify-between items-center mt-[15px] ${styles.reviewsDiv} sm:mt-[8px]`}
        >
          <div className={`flex flex-col p-[12px] sm:p-[8px]`}>
            <h6 className={` font-[500] text-[17px] sm:text-[15px]`}>
              Write a Reviews
            </h6>
            <span className={`font-[500] text-[10px] ${styles.reviewSpan}`}>
              Share your experience to help others
            </span>
          </div>
          <div className={`mr-[10px]`}>
            <button>
              <Image src={images.editImg} alt="edit" />
            </button>
          </div>
        </div>

        <div className={`flex mt-[25px] sm:mt-[20px]`}>
          <div className={`sm:w-[80px]`}>
            <Image src={images.userReview} alt="user" />
          </div>
          <div className={`ml-[16px]`}>
            <h6 className={`sm:text-[12px]`}>Himanshu</h6>
            <p
              className={`font-[500] text-[10px] ${styles.reviewSpan} sm:text-[8px]`}
            >
              3 Days ago
            </p>
          </div>
          <div className={`ml-[60%] sm:ml-[50%]`}>
            <Image src={images.reviewStarImg} alt="str" />
          </div>
        </div>
        <div className={`font-[400] text-[12px] ${styles.reviewParaDiv}`}>
          <p className={`font-[400] text-[12px] `}>
            Lorem ipsum dolor sit amet consectetur. Potenti turpis amet pharetra
            at dignissim neque accumsan. Egestas nam aliquet eget viverra sapien
            imperdiet potenti.
          </p>
        </div>
        <hr className={styles.line} />
        <div className={`flex mt-[25px] sm:mt-[20px]`}>
          <div className={`sm:w-[80px]`}>
            <Image src={images.reviewUserImg2} alt="user" />
          </div>
          <div className={`ml-[16px]`}>
            <h6 className={`sm:text-[12px]`}>Himanshu</h6>
            <p
              className={`font-[500] text-[10px] ${styles.reviewSpan} sm:text-[8px]`}
            >
              3 Days ago
            </p>
          </div>
          <div className={`ml-[60%] sm:ml-[50%]`}>
            <Image src={images.reviewStarImg2} alt="str" />
          </div>
        </div>
        <div className={`font-[400] text-[12px] ${styles.reviewParaDiv}`}>
          <p className={`font-[400] text-[12px]`}>
            Lorem ipsum dolor sit amet consectetur. Potenti turpis amet pharetra
            at dignissim neque accumsan. Egestas nam aliquet eget viverra sapien
            imperdiet potenti.
          </p>
        </div>
        <hr className={styles.line} />
      </div>
    </>
  );
}
export default SalonProductReview;
