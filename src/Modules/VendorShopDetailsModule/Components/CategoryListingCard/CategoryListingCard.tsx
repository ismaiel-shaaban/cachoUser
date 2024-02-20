import React from "react";
import styles from "./CategoryListingCard.module.css";
import Image from "next/image";
import images from "src/Assets/images";
import { PRODUCT_LIST_ITEMS } from "src/Modules/CategoryModule/Types/ResponseTypes";
import {
  FILE_URL,
  convertFirstLetterToUpperCaseWithSpace,
  dataLangTranslation,
} from "src/Utils/Helpers";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";

type CATEGORY_LIST_PROPS = {
  item: PRODUCT_LIST_ITEMS;
};
function CategoryListingCard(props: CATEGORY_LIST_PROPS) {
  const { item } = props;

  const { user, language } = useAuthValue();

  return (
    <article
      className={
        language === "ar"
          ? `${styles.categoryCardItem}  ${styles.categoryArabicCardItem}`
          : `${styles.categoryCardItem}`
      }
    >
      <div className={styles.categoryCardImage}>
        <Image
          src={item?.photos ? `${FILE_URL}${item?.photos}` : images.cateItem}
          alt={`card item image`}
          layout="fill"
        />
      </div>
      <div className={styles.cardDetails}>
        <h3 className={styles.cardTitle}>
          {dataLangTranslation(
            convertFirstLetterToUpperCaseWithSpace(item.name),
            item?.arName
          )}
        </h3>
        <h4 className={styles.price}>SAR {item.price}</h4>
        {/* <div className={styles.offer}>
          <h4 className={styles.offName}>Offer Name here</h4>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_954_4855)">
              <path
                d="M6.29265 10.1902C5.99975 10.483 5.99975 10.9579 6.29265 11.2508C6.58554 11.5437 7.06041 11.5437 7.35331 11.2508L6.29265 10.1902ZM11.3602 7.24388C11.6531 6.95098 11.6531 6.47611 11.3602 6.18322C11.0674 5.89032 10.5925 5.89032 10.2996 6.18322L11.3602 7.24388ZM4.41097 3.6506L4.22862 4.37809L4.41097 3.6506ZM6.93408 2.19388L7.65528 2.3997L6.93408 2.19388ZM2.39708 7.13877L1.85823 7.66044L2.39708 7.13877ZM2.39707 10.0522L1.85822 9.53053L2.39707 10.0522ZM4.41097 13.5404L4.22862 12.8129L4.41097 13.5404ZM6.93408 14.9971L7.65528 14.7913L6.93408 14.9971ZM10.9619 14.9971L10.2407 14.7913L10.9619 14.9971ZM13.485 13.5404L13.6673 12.8129L13.485 13.5404ZM15.4989 10.0522L16.0377 9.53053L15.4989 10.0522ZM15.4989 7.13877L16.0377 7.66044L15.4989 7.13877ZM13.485 3.6506L13.6673 4.37809L13.485 3.6506ZM10.9619 2.19388L10.2407 2.3997L10.9619 2.19388ZM7.35331 11.2508L11.3602 7.24388L10.2996 6.18322L6.29265 10.1902L7.35331 11.2508ZM4.22862 4.37809C5.71755 4.75131 7.23403 3.87577 7.65528 2.3997L6.21287 1.98806C6.01378 2.68569 5.29704 3.0995 4.59333 2.9231L4.22862 4.37809ZM2.93593 6.6171C1.99522 5.64541 2.91676 4.04926 4.22862 4.37809L4.59333 2.9231C1.81768 2.22735 -0.132134 5.60453 1.85823 7.66044L2.93593 6.6171ZM2.93593 10.5739C4.00361 9.47102 4.00361 7.71994 2.93593 6.6171L1.85823 7.66044C2.36285 8.18168 2.36285 9.00929 1.85822 9.53053L2.93593 10.5739ZM4.22862 12.8129C2.91676 13.1417 1.99522 11.5456 2.93593 10.5739L1.85822 9.53053C-0.132135 11.5864 1.81768 14.9636 4.59333 14.2679L4.22862 12.8129ZM7.65528 14.7913C7.23403 13.3152 5.71755 12.4397 4.22862 12.8129L4.59333 14.2679C5.29704 14.0915 6.01378 14.5053 6.21287 15.2029L7.65528 14.7913ZM10.2407 14.7913C9.86952 16.0918 8.02643 16.0918 7.65528 14.7913L6.21287 15.2029C6.99816 17.9546 10.8978 17.9546 11.6831 15.2029L10.2407 14.7913ZM13.6673 12.8129C12.1784 12.4397 10.6619 13.3152 10.2407 14.7913L11.6831 15.2029C11.8822 14.5053 12.5989 14.0915 13.3026 14.2679L13.6673 12.8129ZM14.96 10.5739C15.9007 11.5456 14.9792 13.1417 13.6673 12.8129L13.3026 14.2679C16.0783 14.9636 18.0281 11.5864 16.0377 9.53053L14.96 10.5739ZM14.96 6.6171C13.8923 7.71994 13.8923 9.47102 14.96 10.5739L16.0377 9.53053C15.5331 9.00929 15.5331 8.18168 16.0377 7.66044L14.96 6.6171ZM13.6673 4.37809C14.9792 4.04926 15.9007 5.64541 14.96 6.6171L16.0377 7.66044C18.0281 5.60453 16.0783 2.22735 13.3026 2.9231L13.6673 4.37809ZM10.2407 2.3997C10.6619 3.87577 12.1784 4.75131 13.6673 4.37809L13.3026 2.9231C12.5989 3.0995 11.8822 2.68569 11.6831 1.98806L10.2407 2.3997ZM11.6831 1.98806C10.8978 -0.763597 6.99816 -0.763597 6.21287 1.98806L7.65528 2.3997C8.02643 1.09919 9.86952 1.09919 10.2407 2.3997L11.6831 1.98806Z"
                fill="#0C9466"
              />
              <path
                d="M6.11469 6.47054C6.11469 6.86174 6.43182 7.17887 6.82302 7.17887C7.21422 7.17887 7.53135 6.86174 7.53135 6.47054C7.53135 6.07934 7.21422 5.76221 6.82302 5.76221C6.43182 5.76221 6.11469 6.07934 6.11469 6.47054Z"
                fill="#0C9466"
              />
              <path
                d="M10.3647 10.7205C10.3647 11.1117 10.6818 11.4289 11.073 11.4289C11.4642 11.4289 11.7814 11.1117 11.7814 10.7205C11.7814 10.3293 11.4642 10.0122 11.073 10.0122C10.6818 10.0122 10.3647 10.3293 10.3647 10.7205Z"
                fill="#0C9466"
              />
            </g>
            <defs>
              <clipPath id="clip0_954_4855">
                <rect
                  width="17"
                  height="17"
                  fill="white"
                  transform="translate(0.447998 0.0957031)"
                />
              </clipPath>
            </defs>
          </svg>
          1 Offer Active
        </div> */}
      </div>
    </article>
  );
}

export default CategoryListingCard;