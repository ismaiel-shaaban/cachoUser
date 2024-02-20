import React, { Fragment, useState } from "react";
import images from "src/Assets/images";
import CategoryCard from "src/Modules/LandingPageModule/Components/LandingPage/Category/CategoryCard/CategoryCard";
import styles from "./Category.module.css";
import useCategoryListQuery from "src/Modules/LandingPageModule/Hooks/useCategoryListQuery";
import { useRouter } from "next/router";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";
import Image from "next/image";
import {
  FILE_URL,
  convertFirstLetterToUpperCaseWithSpace,
  dataLangTranslation,
  filterUrlData,
} from "src/Utils/Helpers";
import Pagination from "src/Components/Pagination/Pagination";
import { strings } from "src/Utils/Localization";
import { Button } from "react-daisyui";
function Category() {
  const [search, setSearch] = useState("");
  const { token } = useAuthValue();
  const router = useRouter();
  const page = router?.query?.page ? Number(router?.query?.page) : 1;
  const categoryListQuery = useCategoryListQuery(page, search);
  const categoryListData = categoryListQuery?.data?.data?.data?.list ?? [];
  const countPage: number = categoryListQuery?.data?.data?.data?.count ?? 0;
  const limitPage: number = categoryListQuery?.data?.data?.data?.limit ?? 0;
  const totalPages = Math.ceil(countPage / limitPage);
  return (
    <>
      <section className="subCategoriesBox bg-sky py-5">
        <div className="subContainer max-w-[1100px] mx-auto">
          <div className={`bg-white flex flex-wrap justify-between ` }>
            {categoryListData?.length !== 0
              ? categoryListData?.map((category, index) => {
                  const encodedcategoryName = encodeURIComponent(
                    dataLangTranslation(category?.name, category?.arName)
                  );
                  return (
                    <div
                     
                      className={`w-[32%] md:w-[45%] sm:w-full ssm:w-full m-1 shadow-lg animate__animated animate__flipInX  ${styles.mainImage}`}
                      key={`category${index}`}
                     
                    >
                      <div className=" w-full  h-[100%]">
                        <div className=" w-[100%] h-[220px] relative">
                          <img className="h-48 h-36 w-full object-cover object-center" src={`${FILE_URL}${category?.image}`} alt="" />
                          <div className={`${styles.catName} bg-primary`}>

                            <span className="text-2xl " >
                            {dataLangTranslation(
                              convertFirstLetterToUpperCaseWithSpace(
                                category?.name
                              ),
                              category?.arName
                            )}
                          </span>
                          <Button 
                             onClick={() =>
                              router.push(
                                `/category/subcategory?categoryId=${category?._id}&categoryName=${encodedcategoryName}`
                              )
                            }
                            className="bg-white p-2 px-4 text-lg mt-4 rounded text-darkGray">shopping</Button>
                          </div>
                          {/* <Image
                            src={
                              categoryListData
                                ? `${FILE_URL}${category?.image}`
                                : images.cateItem
                            }
                            style={{width:'100%'}}
                            alt="img"
                            layout="fill"
                          /> */}
                        </div>
                     
                      </div>
                    </div>
                  );
                })
              : strings?.no_cat_avl}
          </div>
        </div>
      </section>
      {categoryListData?.length !== 0 && categoryListData !== undefined ? (
        <Pagination
          page={page}
          setPage={(_page: any) => {
            filterUrlData(router, "/category", "page", _page.toString());
          }}
          totalPages={totalPages}
        />
      ) : (
        <Fragment />
      )}
    </>
  );
}

export default Category;
