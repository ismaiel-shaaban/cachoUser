import images from "src/Assets/images";
import Image from "next/image";
import styles from "./SalonProductOffer.module.css";

function SalonProductOffer() {
  return (
    <>
      <h3 className={`font-[600] text-[17px] sm:text-[15px]`}>Offers</h3>
      <div className={`mt-[15px] ${styles.discRoundDiv} sm:mt-[10px]`}>
        <div
          className={`ml-[20px] mt-[2px] mb-[4px] ${styles.discImg} sm:ml-[15px] mt-[0px] mb-[0px]`}
        >
          <span className={`p-[8px] relative top-[8px]`}>
            {" "}
            <Image src={images.discountShape} alt="disc-round" />
          </span>
        </div>
        <div className={`ml-[15px] sm:ml-[8px]`}>
          <p className={`font-[400] text-[12px] sm:text-[10px]`}>
            Christmas Offer
          </p>
          <h6 className={`font-[600] text-[15px] sm:text-[13px]`}>
            10% Flat Off
          </h6>
        </div>
      </div>
    </>
  );
}
export default SalonProductOffer;
