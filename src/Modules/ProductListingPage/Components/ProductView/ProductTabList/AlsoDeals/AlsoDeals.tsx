import React, { Fragment, useEffect, useState } from "react";
import styles from "./AlsoDeals.module.css";
import Image from "next/image";
import images from "src/Assets/images";
import {
  PRODUCT_DETAILS_DATA_RESPONSE,
  VENDOR_PRODUCTS_ITEMS,
} from "src/Modules/CategoryModule/Types/ResponseTypes";
import useProductListQuery from "src/Modules/CategoryModule/Hooks/useProductListQuery";
import {
  FILE_URL,
  convertFirstLetterToUpperCaseWithSpace,
  dataLangTranslation,
  filterUrlDataWithParamsId,
} from "src/Utils/Helpers";
import Loader from "src/Components/Loader/Loader";
import router, { useRouter } from "next/router";
import Pagination from "src/Components/Pagination/Pagination";
import { strings } from "src/Utils/Localization";

type ALSO_DEALS_PROPS = {
  vendorProducts: Array<VENDOR_PRODUCTS_ITEMS>;
  vendorId: any;
};

function AlsoDeals(props: ALSO_DEALS_PROPS) {
  const { vendorProducts, vendorId } = props;
  const [productCategoryId, setProductCategoryId] = useState("");
  const { data, isLoading } = useProductListQuery(
    "",
    productCategoryId,
    vendorId
  );

  const productCategoriesData = data?.data?.data?.list;

  useEffect(() => {
    if (vendorProducts?.length !== 0) {
      const firstItem = vendorProducts[0] ?? "";
      setProductCategoryId(firstItem?._id);
    }
  }, [vendorProducts]);
  const page = router?.query?.page ? Number(router?.query?.page) : 1;
  const countPage: number = data?.data?.data?.count ?? 0;
  const limitPage: number = data?.data?.data?.limit ?? 0;
  const totalPages = Math.ceil(countPage / limitPage);
  const paramId = String(router.asPath?.split("?")[0].split("/").pop());
  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.alsoDeals}>
        <div className={`${styles.tabButton} flex gap-2.5 items-center`}>
          {vendorProducts?.length !== 0
            ? vendorProducts?.sort()?.map((item, index) => {
                const isFirstItem = index === 0;
                return (
                  <button
                    className={
                      item?._id === productCategoryId
                        ? styles.activeTab
                        : styles.inActiveTab
                    }
                    key={`item${index}`}
                    onClick={() => setProductCategoryId(item?._id)}
                    type="button"
                  >
                    {dataLangTranslation(item?.name, item?.arName)}
                  </button>
                );
              })
            : "No Vendor Product Available"}
        </div>
        <article className={styles.productDealDetail}>
          {productCategoriesData?.length !== 0 ? (
            productCategoriesData?.map((item, index) => {
              return (
                <div className={styles.productDeal} key={`index${item}`}>
                  <figure className={styles.prodImg}>
                    <div className="relative w-[96px] h-[96px] rounded-[12px] overflow-hidden">
                      <Image
                        src={
                          item?.photos
                            ? `${FILE_URL}${item?.photos}`
                            : images.discountShapes
                        }
                        alt="image"
                        layout="fill"
                        width={100}
                        height={100}
                      />
                    </div>
                  </figure>
                  <div className={styles.rightInfo}>
                    <h3
                      className={`${styles.dealTitle} text-[16px] font-[600] text-black `}
                    >
                      {dataLangTranslation(
                        convertFirstLetterToUpperCaseWithSpace(item?.name),
                        item?.arName
                      )}
                    </h3>
                    <span
                      className={`${styles.dealPrice} text-[16px] font-[500] text-black`}
                    >
                      SAR {item?.price}
                    </span>
                    {/* <div className={styles.discountShapes}>
                      <h5 className="text-[10px] font-[400] text-black ">
                        1 Offer Active
                      </h5>
                    </div> */}
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.noData}>{strings.No_Data_available}</div>
          )}
        </article>
      </div>
      {productCategoriesData?.length !== 0 &&
      productCategoriesData !== undefined ? (
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

export default AlsoDeals;
