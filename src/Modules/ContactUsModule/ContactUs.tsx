import images from "src/Assets/images";
import styles from "./ContactUs.module.css";
import Image from "next/image";
import { strings } from "src/Utils/Localization";
import Link from "next/link";
function ContactUs() {
  return (
    <>
      <section
        className={`bg-sky flex flex-wrap justify-center ${styles.salonWrapper}`}
      >
        <div
          className={`bg-white px-[20px] py-[15px] w-full max-w-[800px] `}
        >
          <h3 className="font-[600] text-[14px]">{strings?.drop_us_line}</h3>
          <div className={`${styles.contactRow} mt-[69px] flex justify-between `}>
            <div className="min-w-[40%]">
              {/* email-box-start */}

              <div className={`flex gap-[10px]  rounded-[10px] items-center py-[13px] px-[10px] ${styles.contactDiv}`}
              >
                <Link href="mailto:support@cachooapp.com">
                  <a>
                      <Image src={images.mailImg} alt="mail" /> 
                  </a>
                </Link>
                <span className="mb-[4px]">support@cachooapp.com</span>
              </div>
              {/* email-box-end */}


              {/* phone-number-box-start */}
              {/* <div
                className={`flex gap-[10px] rounded-[10px] items-center py-[13px] px-[10px] mt-[13px] ${styles.contactDiv}`}
              >
                  <a onClick={()=>window.open(`tel:${"+91 8823632829"}`, "_self")}>
                      <Image src={images.phoneImg} alt="phone" /> 
                  </a>
                <span className="mb-[4px]">+91 8823632829</span>
              </div> */}
              {/* phone-number-box-close */}
            </div>
            <div className="max-w-[350px] w-full h-[162px] relative">
              <Image src={images.contactUsImg} alt="contact" layout="fill" objectFit="contain" height={'100%'}/>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default ContactUs;
