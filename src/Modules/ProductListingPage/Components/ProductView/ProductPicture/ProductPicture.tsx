import React, { Fragment, useEffect, useState } from "react";
import styles from "./ProductPicture.module.css";
import Image from "next/image";
import images from "src/Assets/images";
import ProductViewModal, {
  ViewAllEvent,
} from "./ProductViewModal/ProductViewModal";
import { PRODUCT_DETAILS_DATA_RESPONSE } from "src/Modules/CategoryModule/Types/ResponseTypes";
//@ts-ignore
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { PRODUCT_SLIDER } from "src/Modules/AuthModule/Types/CommonTypes";
import {
  FILE_URL,
  convertFirstLetterToUpperCaseWithSpace,
  dataLangTranslation,
} from "src/Utils/Helpers";
import ReadMoreLessMore from "src/Components/ReadMoreLessMore/ReadMoreLessMore";
import Loader from "src/Components/Loader/Loader";
import useWhatsappClickMutation from "src/Modules/ProductListingPage/Hooks/useWhatsappClickMutation";
import { useRouter } from "next/router";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";
import { strings } from "src/Utils/Localization";

type PRODUCT_DETAIL_PROPS = {
  productDetails: PRODUCT_DETAILS_DATA_RESPONSE | undefined;
  imageList: Array<string>;
  isLoading: boolean;
};

function ProductPicture(props: PRODUCT_DETAIL_PROPS) {
  const { productDetails, imageList, isLoading } = props;
  const router = useRouter();
  const attributesData = productDetails?.productAttributes?.list ?? [];
  const modifiedImageList: Array<PRODUCT_SLIDER> = imageList?.map((item) => {
    const imageUrl = FILE_URL + item;
    return { original: imageUrl, thumbnail: imageUrl };
  });
  const vendorId = productDetails?.productData?.vendorId;
  const productVendorInfo = productDetails?.productData?.vendor;

  const whatsappClickMutation = useWhatsappClickMutation();
  const handleWhatsappClick = () => {
    whatsappClickMutation.mutate(
      {
        vendorId: vendorId,
      },
      {
        onSuccess: (res) => {
          const { status } = res.data;
          if (status === 200 || 201) {
            window.open(productVendorInfo?.whatsappLink);
          }
        },
      }
    );
  };
  const vendorName = router.query?.vendorName;
  const vendorImage = router.query?.vendorImage;
  const { user, language, loggedIn } = useAuthValue();
  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.ProductPictureView}>
        <div className={`${styles.showPictures} `}>
          {modifiedImageList?.length !== 0 ? (
            <ImageGallery
              className={styles.imageGallery}
              items={modifiedImageList}
              autoPlay={false}
              showFullscreenButton={true}
              showPlayButton={false}
              showNav={true}
            />
          ) : (
            <Fragment />
          )}
        </div>
        {/* right-product-detail */}
        <div className={styles.picturesViewDetail}>
          <h3 className="text-[24px] font-[700] text-black">
            {dataLangTranslation(
              convertFirstLetterToUpperCaseWithSpace(
                productDetails?.productData?.name
              ),
              productDetails?.productData?.arName
            )}
          </h3>
          <h4
            className={`${styles.titleFour} text-[18px] font-[700] text-black`}
          >
            SAR {productDetails?.productData?.price}{" "}
          </h4>
          <p className="text-[14px] font-[400] text-lightBlack py-1.5">
            <ReadMoreLessMore
              showChar={150}
              text={productDetails?.productData?.description}
            />{" "}
          </p>
          <ul>
            {attributesData?.length !== 0
              ? attributesData?.slice(0, 5)?.map((_attributes, index) => {
                  return (
                    <li
                      className={`${styles.list} flex justify-between py-2`}
                      key={`_attributes${index}`}
                    >
                      <p className="text-[12px] font-[700] text-black">
                        {_attributes?.attributeName}
                      </p>
                      <span className="text-[12px] font-[400] text-black">
                        {_attributes?.name}
                      </span>
                    </li>
                  );
                })
              : strings?.no_attributes_avl}
          </ul>

          <a
            href="#"
            className={`${styles.viewMore} text-activeClr capitalize text-[12px] font-[500] text-center block`}
            onClick={() => ViewAllEvent(attributesData)}
          >
            {strings?.view_more}
          </a>

          <div
            className={
              language === "ar"
                ? `${styles.wrapperbox} flex justify-center gap-2.5 ${styles.arabicWrapperbox} `
                : ` ${styles.wrapperbox} flex justify-center gap-2.5`
            }
          >
            <button
              className={`${styles.chatbox} flex items-center gap-2.5 bg-primary border-1 border-primary`}
              onClick={() => {
                if (!loggedIn) {
                  router.push("/login");
                } else if (!user?.isProfileCompleted) {
                  router.push("/edit-profile");
                } else {
                  router.push(
                    `/chat?vendorId=${vendorId}&vendorName=${vendorName}&userImage=${vendorImage}`
                  );
                }
              }}
            >
              <>
                <Image src={images.whiteChat} alt="chatImg" />
                <span className="text-white">{strings.chat}</span>
              </>
            </button>
            {productVendorInfo?.whatsappLink !== "" ? (
              <button
                className={`${styles.Whatsappbox} flex items-center gap-2.5`}
                onClick={() => {
                  if (!loggedIn) {
                    router.push("/login");
                  } else if (!user?.isProfileCompleted) {
                    router.push("/edit-profile");
                  } else {
                    handleWhatsappClick();
                  }
                }}
              >
                <>
                  <Image src={images.whatsAppWhite} alt="whatsappImg" />
                  <span className="text-white">{strings?.whatsaap}</span>
                </>
              </button>
            ) : (
              <button
                title={strings?.whatsapp_link_not_added}
                className={`${styles.Whatsappbox} flex items-center gap-2.5 cursor-pointer `}
                type="button"
                disabled
              >
                <>
                  <Image src={images.whatsAppWhite} alt="whatsappImg" />
                  <span className="text-white">{strings?.whatsaap}</span>
                </>
              </button>
            )}
          </div>
        </div>
      </div>
      <ProductViewModal />
    </>
  );
}

export default ProductPicture;
