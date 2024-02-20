import React, { Fragment, useRef, useState } from "react";
import styles from "./AllCategory.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import useCategoryListQuery from "src/Modules/LandingPageModule/Hooks/useCategoryListQuery";
import {
  FILE_URL,
  convertFirstLetterToUpperCaseWithSpace,
  dataLangTranslation,
} from "src/Utils/Helpers";
import 'animate.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import images from "src/Assets/images";
import { strings } from "src/Utils/Localization";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";
import { Button, Card } from "react-daisyui";
import { useElementVisibility } from "@reactuses/core";

function AllCategory() {
  const storiesSliders = {
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 6,
    },
    miniLaptop: {
      breakpoint: { max: 1121, min: 974 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 973, min: 776 },
      items: 4,
    },
    mobileLandsacpe: {
      breakpoint: { max: 776, min: 576 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 575, min: 425 },
      items: 2,
    },
    smallmobile: {
      breakpoint: { max: 425, min: 320 },
      items: 1,
    },
  };
  const ref = useRef<HTMLDivElement>(null);
  const [visible, stop] = useElementVisibility(ref);
  const [search, setSearch] = useState("");

  const router = useRouter();
  const query = router?.query;
  const page = query?.page ? Number(query?.page) : 1;
  const categoryListQuery = useCategoryListQuery(page, search);
  const categoryListData = categoryListQuery?.data?.data?.data?.list ?? [];
  const categoryList = categoryListData.slice(0, 5);
  const { language } = useAuthValue();
  const animation =[
    {
      class:"animate__fadeInLeftBig"
    },
    {
      class:"animate__fadeInUpBig"
    },
    {
      class:"animate__fadeInDownBig"
    },
    {
      class:"animate__fadeInRightBig"
    },
  ]
  return (
    <>
       
      <section className="subCategoriesBox py-5" ref={ref}>
        <div className="subContainer max-w-[1135px] mx-auto">
          {categoryList?.length !== 0 ? (
            <>
            <div  className="flex justify-between">


              <h2
                className={`${styles.titleCat} text-[24px] font-[800] text-primary !mb-[1.8rem]`}
              >
                {strings?.all_cat}
              </h2>
              <h2
                className={`${styles.titleCat} text-[24px] font-[800] text-primary !mb-[1.8rem]`}
              >
                 <button
                      onClick={() => router.push("/category")}
                      
                      type="button"
                  >
                     {strings?.view_all}
                     <br />
                    
                    </button>
              </h2>
            </div>

          
              {/* categoryList */}

              <div className={"flex flex-wrap -m-4"}>
                {categoryList.slice(0,4)?.map((category, index) => {
                  
                  return (
                    <div className={`p-4 sm:w-full ssm:w-full w-1/4 animate__animated transition-transform transform hover-flip ${visible ? animation[index].class :''} `  }>
                      <div className="h-full shadow border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                        <img className="h-48 h-36 w-full object-cover object-center"  src={`${FILE_URL}${category?.image}`}alt="blog"/>
                        <div className="p-6">
                          <h2 className="tracking-widest  title-font font-medium text-primary mb-1">{dataLangTranslation(
                            convertFirstLetterToUpperCaseWithSpace(
                              category?.name
                            ),
                            category?.arName
                          )}</h2>
                          <div className="flex items-center flex-wrap cursor-pointer "      onClick={() =>
                          router.push(
                            `/category/subcategory?categoryId=${
                              category?._id
                            }&categoryName=${dataLangTranslation(
                              category?.name,
                              category?.arName
                            )}`
                          )
                        }>

                            {
                              language === "ar" ? 
                              <span className="text-primary  inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-gray-200">
                                <svg className="w-6 h-6 " stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                  <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                              </span>
                                
                              : 
                              ''

                            }
                            <a className="text-subPrimary inline-flex items-center md:mb-2 lg:mb-0">
                              <svg className="w-6 h-6 " viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                              </svg>
                            </a>
                            {
                              language !== "ar" ? 
                              <span className="text-primary  inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-gray-200">
                                <svg className="w-6 h-6 " stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                  <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                              </span>
                                
                              : 
                              ''

                            }
                          
                          
                          </div>
                        </div>
                      </div>
                    </div>
                    // <figure
                    //   className={styles.catgoriesItem}
                    //   key={`category${index}`}
                      // onClick={() =>
                      //   router.push(
                      //     `/category/subcategory?categoryId=${
                      //       category?._id
                      //     }&categoryName=${dataLangTranslation(
                      //       category?.name,
                      //       category?.arName
                      //     )}`
                      //   )
                      // }
                    // >
                    //   <div
                    //     className={`${styles.cenetrItem} relative h-[300px] w-[300px] rounded-[10px] overflow-hidden cursor-pointer`}
                    //   >
                    //     <Image
                    //       src={`${FILE_URL}${category?.image}`}
                    //       alt="img"
                    //       layout="fill"
                         
                    //     />
                    //   </div>
                    //   <figcaption className={styles.catName}>
                    //     {dataLangTranslation(
                    //       convertFirstLetterToUpperCaseWithSpace(
                    //         category?.name
                    //       ),
                    //       category?.arName
                    //     )}
                    //   </figcaption>
                    // </figure>
                  //   <Card {...category}>
                  //   <Card.Image  src={`${FILE_URL}${category?.image}`} height={'100px'} alt="Shoes" />
                  //   <Card.Body className="items-center text-center">
                  //     <Card.Title tag="h2">Shoes!</Card.Title>
                      
                  //     <Card.Actions className="justify-end">
                  //       <Button color="primary">Buy Now</Button>
                  //     </Card.Actions>
                  //   </Card.Body>
                  // </Card>
                    
                  );
                })}
                {categoryListData?.length === 0 ? (
                  strings?.no_cat_avl
                ) : (""
                  // <div className={styles.categoriesItem}>
                  //   <button
                  //     onClick={() => router.push("/category")}
                  //     className={`${styles.viewAll} text-white text-[14px] font-600`}
                  //     type="button"
                  //   >
                  //     {strings?.view_all}
                  //     <br />
                  //     {strings?.categories}
                  //   </button>
                  // </div>
                )}
              </div>
            </>
          ) : (
            <Fragment />
          )}
        </div>
      </section>
    </>
  );
}

export default AllCategory;
