import { strings } from "src/Utils/Localization";
import styles from "./PrivacyPolicy.module.css";

function PrivacyPolicy() {
  return (
    <>
      <section
        className={`bg-sky flex flex-wrap justify-center ${styles.salonWrapper} ${styles.textWrapper}`}
      >
        <div
          className={`bg-white px-[20px] py-[15px] w-full max-w-[800px] overflow-hidden`}
        >
          <div className="pandDoc">
            <iframe
              width="100%"
              height="100%"
              src="/pdf/privacy.pdf#toolbar=0"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
export default PrivacyPolicy;
