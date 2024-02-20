import React, { Fragment, useEffect, useState } from "react";
import styles from "./CategoryTabComponent.module.css";
import CategoryListingCard from "../CategoryListingCard/CategoryListingCard";
import { VENDOR_PRODUCTS_ITEMS } from "src/Modules/CategoryModule/Types/ResponseTypes";
import useProductListQuery from "src/Modules/CategoryModule/Hooks/useProductListQuery";
import Pagination from "src/Components/Pagination/Pagination";
import { useRouter } from "next/router";
import { dataLangTranslation, filterUrlData } from "src/Utils/Helpers";
import { strings } from "src/Utils/Localization";
import images from "src/Assets/images";
import Image from "next/image";

function CategoryTabComponent(props: VENDOR_PRODUCTS_ITEMS | any) {
  const { vendorProducts } = props;
  const router = useRouter();
  const [productCategoryId, setProductCategoryId] = useState("");
  const { data } = useProductListQuery("", productCategoryId);

  const productCategoriesData = data?.data?.data?.list ?? [];

  useEffect(() => {
    if (vendorProducts?.length !== 0) {
      const firstItem = vendorProducts[0];
      setProductCategoryId(firstItem?._id);
    }
  }, [vendorProducts]);
  const page = router?.query?.page ? Number(router?.query?.page) : 1;
  const countPage: number = data?.data?.data?.count ?? 0;
  const limitPage: number = data?.data?.data?.limit ?? 0;
  const totalPages = Math.ceil(countPage / limitPage);
  const routerName =
    router.asPath?.split("?")[0] == "/vendor-shop-details"
      ? `vendor-shop-details`
      : `vendor-detail`;
  return (
    <div className={styles.CategoryTabComponentLayout}>
      <nav className={styles.inputSelector}>
        {vendorProducts?.length !== 0 ? (
          vendorProducts.map((item: any, index: any) => {
            return (
              // <li className={styles.option}>
              //   <input type="radio" id={`${item.label}`} name="listing" />
              //   <label htmlFor={`${item.label}`}>{item.name}</label>
              // </li>
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
        ) : (
          <></>
        )}
      </nav>
      {productCategoriesData?.length !== 0 ? (
        <div className={styles.cardListing}>
          {productCategoriesData.map((item: any) => (
            <CategoryListingCard item={item} />
          ))}
        </div>
      ) : (
        <>
          <div className={styles.noProductFound}>
            <Image src={images.productPlaceholder} alt="productPlaceholder" />
            <h3 className="text-[#5A5A5A;] text-[16px] font-[400]">{`${strings.No_Data_available}`}</h3>
          </div>
        </>
      )}
      {productCategoriesData?.length !== 0 &&
      productCategoriesData !== undefined ? (
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
    </div>
  );
}

export default CategoryTabComponent;
