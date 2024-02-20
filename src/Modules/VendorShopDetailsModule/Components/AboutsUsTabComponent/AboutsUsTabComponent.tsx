import React from "react";
import styles from "./AboutsUsTabComponent.module.css";
import { PRODUCTS_VENDOR_RESPONSE } from "src/Modules/CategoryModule/Types/ResponseTypes";
import { inOrderDays } from "src/Utils/Helpers";
import { strings } from "src/Utils/Localization";
import Link from "next/link";
// import { inOrderDays } from "src/Utils/Helpers";

type VENDOR_DETAILS_PROPS = {
  vendorDetails: PRODUCTS_VENDOR_RESPONSE;
};
function AboutsUsTabComponent(props: VENDOR_DETAILS_PROPS) {
  const { vendorDetails } = props;
  return (
    <div className={styles.AboutsUsTabComponentWrapper}>
      <article className={styles.listing}>
        <h3 className={styles.listTitle}>{strings?.company_name}</h3>
        <p className={styles.listDescription}>{vendorDetails.name}</p>
      </article>
      <article className={styles.listing}>
        <h3 className={styles.listTitle}>{strings?.description}</h3>
        <p className={styles.listDescription}>{vendorDetails.description}</p>
      </article>
      <article className={styles.listing}>
        <h3 className={styles.listTitle}>{strings?.company_url}</h3>
        <p
          className={`${styles.listDescription} lowercase hover:text-[#0000FF]`}
        >
          <Link href={vendorDetails?.url} passHref>
            <a target="_blank">{vendorDetails.url}</a>
          </Link>
        </p>
      </article>
      <article className={styles.listing}>
        <h3 className={styles.listTitle}>{strings?.phone_number}</h3>
        <p className={styles.listDescription}>{vendorDetails.phoneNumber}</p>
      </article>
      <article className={styles.listing}>
        <h3 className={styles.listTitle}>{strings?.email_address}</h3>
        <p className={`${styles.listDescription} lowercase`}>
          {vendorDetails.email}
        </p>
      </article>
      <article className={styles.listing}>
        <h3 className={styles.listTitle}>{strings.address}</h3>
        <p className={styles.listDescription}>{vendorDetails.address}</p>
      </article>
    </div>
  );
}

export default AboutsUsTabComponent;
