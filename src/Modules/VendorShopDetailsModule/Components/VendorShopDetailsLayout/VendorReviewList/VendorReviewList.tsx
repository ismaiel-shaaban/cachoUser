import React, { Fragment, useEffect, useState } from "react";
import styles from "./VendorReviewList.module.css";
import Image from "next/image";
import images from "src/Assets/images";
import { Rating } from "react-simple-star-rating";

import useProductReviewListQuery from "src/Modules/ProductListingPage/Hooks/useProductReviewListQuery";
import { PRODUCT_DETAILS_DATA_RESPONSE } from "src/Modules/CategoryModule/Types/ResponseTypes";
import moment from "moment";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";
import { useRouter } from "next/router";
import { FILE_URL, filterUrlData } from "src/Utils/Helpers";
import ReviewAndRatingDeleteModal, {
  reviewAndRatingDeleteModal,
} from "src/Modules/ProductListingPage/Components/ProductView/ProductTabList/Reviews/ReviewAndRatingDeleteModal/ReviewAndRatingDeleteModal";
import AddReviewModal from "src/Modules/ProductListingPage/Components/ProductView/ProductTabList/Reviews/AddReviewModal/AddReviewModal";
import EditReviewModal, {
  editModal,
} from "src/Modules/ProductListingPage/Components/ProductView/ProductTabList/Reviews/EditReviewModal/EditReviewModal";
import useGetVendorReviewAndRatingList from "src/Modules/ProductListingPage/Hooks/useGetVendorReviewAndRatingList";
import Pagination from "src/Components/Pagination/Pagination";
import { strings } from "src/Utils/Localization";

type PRODUCT_REVIEW_PROPS = {
  productDetails: any;
};
function VendorReviewList() {
  const { user, loggedIn } = useAuthValue();
  const router = useRouter();
  const query = router?.query;
  const page = router?.query?.page ? Number(router?.query?.page) : 1;
  const productReviewListQuery = useGetVendorReviewAndRatingList(
    page,
    query?.vendorId
  );
  const productReviewListData =
    productReviewListQuery?.data?.data?.data?.list ?? [];
  const countPage: number =
    productReviewListQuery?.data?.data?.data?.count ?? 0;
  const limitPage: number =
    productReviewListQuery?.data?.data?.data?.limit ?? 0;
  const totalPages = Math.ceil(countPage / limitPage);
  const routerName =
    router.asPath?.split("?")[0] == "/vendor-shop-details"
      ? `vendor-shop-details`
      : `vendor-detail`;
  return (
    <>
      <ul className={styles.reviewWrapper}>
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
                    {/* <Image
                        className={styles.image}
                        src={images.cateItem}
                        height={`44`}
                        width={`44`}
                      /> */}
                    <div className={styles.detail}>
                      <h3>{item.userId?.name}</h3>
                      <h5>{moment(item?.createdAt).fromNow()}</h5>
                      <h3>
                        Product Name :
                        <span className="font-[300] pl-[5px]">
                          {item?.productId?.name}
                        </span>
                      </h3>
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
            <h3 className="text-[#5A5A5A;] text-[16px] font-[400]">
              {strings?.no_review_and_ratings_found}
            </h3>
          </div>
        )}
      </ul>
      <EditReviewModal vendorProductListData={productReviewListData} />
      <AddReviewModal />
      <ReviewAndRatingDeleteModal
        productReviewListData={productReviewListData}
      />
      {productReviewListData?.length !== 0 &&
      productReviewListData !== undefined ? (
        <Pagination
          page={page}
          setPage={(_page: any) => {
            filterUrlData(router, routerName, "page", _page.toString());
          }}
          totalPages={totalPages}
        />
      ) : (
        <Fragment />
      )}
    </>
  );
}

export default VendorReviewList;
