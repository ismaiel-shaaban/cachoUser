import React, { Fragment, useState } from "react";
import styles from "./SubCategoryModule.module.css";
import images from "src/Assets/images";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  FILE_URL,
  convertFirstLetterToUpperCaseWithSpace,
  dataLangTranslation,
  filterUrlData,
} from "src/Utils/Helpers";
import { SUB_CATEGORY_ITEMS } from "../../Types/ResponseTypes";
import Pagination from "src/Components/Pagination/Pagination";
import { strings } from "src/Utils/Localization";

type SUB_CATEGORY_PROPS = {
  subCategoryData: Array<SUB_CATEGORY_ITEMS>;
  totalPages: any;
  page: any;
};

function SubCategoryModule(props: SUB_CATEGORY_PROPS) {
  const router = useRouter();
  const queryData: any = router?.query;

  const { subCategoryData, page, totalPages } = props;
  const categoryName = encodeURIComponent(queryData?.categoryName);
  return (
    <>
      <section className="bg-sky py-[20px]">
        <div className={styles.allCategories}>
          {subCategoryData?.length !== 0 ? (
            subCategoryData?.map((_subcategory, index) => {
              const encodedSubcategoryName = encodeURIComponent(
                dataLangTranslation(_subcategory?.name, _subcategory?.arName)
              );
              return (
                <figure
                  className={`${styles.featuredCatRow} relative rounded-[10px] overflow-hidden`}
                  key={`_subcategory${index}`}
                  onClick={() =>
                    router?.push(
                      `/product-list?subcategoryId=${_subcategory?._id}&subname=${encodedSubcategoryName}&categoryId=${queryData?.categoryId}&categoryName=${categoryName}`
                    )
                  }
                >
                  <div className="relative w-[240px] h-[140px]">
                    <Image
                      src={
                        subCategoryData
                          ? `${FILE_URL}${_subcategory?.image}`
                          : images.womenPic
                      }
                      alt="womenPic"
                      width={100}
                      height={100}
                      layout="fill"
                    />
                  </div>
                  <small className={styles.smallText}>
                    {dataLangTranslation(
                      convertFirstLetterToUpperCaseWithSpace(
                        _subcategory?.name
                      ),
                      _subcategory?.arName
                    )}
                  </small>
                </figure>
              );
            })
          ) : (
            <>
              <div className={styles.placeholderImg}>
                <Image
                  src={images.productPlaceholder}
                  alt="productPlaceholder"
                />
                <h5>{strings?.no_sub_cat_avl}</h5>
              </div>
            </>
          )}
        </div>
      </section>
      {subCategoryData?.length !== 0 && subCategoryData !== undefined ? (
        <Pagination
          page={page}
          setPage={(_page: any) => {
            filterUrlData(
              router,
              "/category/subcategory",
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

export default SubCategoryModule;
