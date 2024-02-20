import React, { Fragment, useEffect, useState } from "react";
import styles from "./Reviews.module.css";
import Image from "next/image";
import images from "src/Assets/images";
import { Rating } from "react-simple-star-rating";

import EditReviewModal, { editModal } from "./EditReviewModal/EditReviewModal";
import useProductReviewListQuery from "src/Modules/ProductListingPage/Hooks/useProductReviewListQuery";
import { PRODUCT_DETAILS_DATA_RESPONSE } from "src/Modules/CategoryModule/Types/ResponseTypes";
import moment from "moment";
import ReviewAndRatingDeleteModal, {
  reviewAndRatingDeleteModal,
} from "./ReviewAndRatingDeleteModal/ReviewAndRatingDeleteModal";
import AddReviewModal, { addModal } from "./AddReviewModal/AddReviewModal";
import useVendorProductListQuery from "src/Modules/ProductListingPage/Hooks/useVendorProductListQuery";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";
import { useRouter } from "next/router";
import { FILE_URL, filterUrlDataWithParamsId } from "src/Utils/Helpers";
import Pagination from "src/Components/Pagination/Pagination";
import { strings } from "src/Utils/Localization";

type PRODUCT_REVIEW_PROPS = {
  productDetails: any;
};
function ReviewTabComponent(props: PRODUCT_REVIEW_PROPS) {
  const { productDetails } = props;
  const { user, loggedIn } = useAuthValue();
  const router = useRouter();
  const productReviewListQuery = useProductReviewListQuery(
    productDetails?.productData?._id
  );
  const productReviewListData =
    productReviewListQuery?.data?.data?.data?.list ?? [];

  const vendorProductListQuery = useVendorProductListQuery(
    productDetails?.productData?.vendorId
  );
  const vendorProductListData =
    vendorProductListQuery?.data?.data?.data?.list ?? [];
  const page = router?.query?.page ? Number(router?.query?.page) : 1;
  const countPage: number = productReviewListQuery?.data?.data?.data.count ?? 0;
  const limitPage: number = productReviewListQuery?.data?.data?.data.limit ?? 0;
  const totalPages = Math.ceil(countPage / limitPage);
  const paramId = String(router.asPath?.split("?")[0].split("/").pop());
  return (
    <>
      <ul className={styles.reviewWrapper}>
        {/* <div>
          <button onClick={() => addModal(vendorProductListData)}>
            Add Review
          </button>
        </div> */}
        {productReviewListData?.length !== 0 ? (
          productReviewListData?.map((item) => {
            return (
              <li className={styles.reviewComponent}>
                {user?._id === item?.userId?._id && loggedIn ? (
                  <div className={styles.customWrapper}>
                    <button type="button" onClick={() => editModal(item)}>
                      <Image src={images.edit} />
                    </button>
                    <button
                      type="button"
                      onClick={() => reviewAndRatingDeleteModal(item?._id)}
                    >
                      <Image src={images.trash} />
                    </button>
                  </div>
                ) : (
                  <></>
                )}
                <div className={styles.reviewHeader}>
                  <div className={styles.headerDetail}>
                    <Image
                      className={styles.image}
                      src={
                        item?.userId?.pic
                          ? `${FILE_URL}${item?.userId?.pic}`
                          : images.cateItem
                      }
                      height={`44`}
                      width={`44`}
                    />
                    <div className={styles.detail}>
                      <h3>{item.userId?.name}</h3>
                      <h5>{moment(item?.createdAt).fromNow()}</h5>
                    </div>
                  </div>
                  <div className={`${styles.stars}`}>
                    <Rating initialValue={item?.stars} readonly={true} />
                  </div>
                </div>
                <p className={styles.reviewDescription}>{item?.review}</p>
              </li>
            );
          })
        ) : (
          <div className={styles.noReviewData}>
            <Image src={images.noReview} alt="noReview" />
            <p>{strings?.no_review_and_ratings_found}</p>
          </div>
        )}
      </ul>
      <EditReviewModal vendorProductListData={vendorProductListData} />
      <AddReviewModal productDetails={productDetails} />
      <ReviewAndRatingDeleteModal
        productReviewListData={productReviewListData}
      />
      {productReviewListData?.length !== 0 &&
      productReviewListData !== undefined ? (
        <Pagination
          page={page}
          setPage={(_page: any) => {
            filterUrlDataWithParamsId(
              router,
              paramId,
              "page",
              _page.toString()
            );
          }}
          totalPages={totalPages}
        />
      ) : (
        <Fragment />
      )}
    </>
  );
}

export default ReviewTabComponent;
