import React, {Fragment, useState} from "react";
import images from "src/Assets/images";
import BusinessTypeCard
    from "src/Modules/LandingPageModule/Components/LandingPage/BusinessType/BussinessTypeCard/BussinessTypeCard";
import styles from "./BusinessType.module.css";
import useBusinessTypeListQuery from "src/Modules/LandingPageModule/Hooks/useBusinessTypeListQuery";
import {useRouter} from "next/router";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";
import Image from "next/image";
import {
    convertFirstLetterToUpperCaseWithSpace,
    dataLangTranslation,
    filterUrlData,
} from "src/Utils/Helpers";
import Pagination from "src/Components/Pagination/Pagination";
import {strings} from "src/Utils/Localization";
import {Button} from "react-daisyui";

function BusinessTypes() {
    const [search, setSearch] = useState("");
    const {token} = useAuthValue();
    const router = useRouter();
    const page = router?.query?.page ? Number(router?.query?.page) : 1;
    const businessTypeListQuery = useBusinessTypeListQuery(page, search);
    const businessTypeListData = businessTypeListQuery?.data;


    return (
        <>
            <section className="subCategoriesBox bg-sky py-5">
                <div className="subContainer max-w-[1100px] mx-auto">
                    <div className={`bg-white flex flex-wrap space-x-3 `}>
                        <span></span>
                        {businessTypeListData?.docs.length !== 0
                            ? businessTypeListData?.docs.map((businessType, index) => {
                                const encodedcategoryName = encodeURIComponent(
                                    dataLangTranslation(businessType?.name, businessType?.nameAr)
                                );
                                return (
                                    <div

                                        className={`w-[32%] md:w-[45%] sm:w-full ssm:w-full m-1 shadow-lg animate__animated animate__flipInX  ${styles.mainImage}`}
                                        key={`category${index}`}

                                    >
                                        <div className=" w-full  h-[100%]">
                                            <div className=" w-[100%] h-[220px] relative">
                                                <img className="h-48 h-36 w-full object-cover object-center"
                                                     src={`${businessType?.image}`} alt=""/>
                                                <div className={`${styles.catName} bg-primary`}>

                            <span className="text-2xl ">
                            {dataLangTranslation(
                                convertFirstLetterToUpperCaseWithSpace(
                                    businessType?.name
                                ),
                                businessType?.nameAr
                            )}
                          </span>
                                                    <Button
                                                        onClick={() =>
                                                            router.push(
                                                                `/business-types/${businessType?._id}/businesses?&categoryName=${encodedcategoryName}`
                                                            )
                                                        }
                                                        className="bg-white p-2 px-4 text-lg mt-4 rounded text-darkGray">shopping</Button>
                                                </div>
                                                {/* <Image
                            src={
                              businessTypeListData
                                ? `${FILE_URL}${businessType?.image}`
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
            {businessTypeListData !== undefined && businessTypeListData?.docs.length !== 0 ? (
                <Pagination
                    page={page}
                    setPage={(_page: any) => {
                        filterUrlData(router, "/business-types", "page", _page.toString());
                    }}
                    totalPages={businessTypeListData?.totalPages}
                />
            ) : (
                <Fragment/>
            )}
        </>
    );
}

export default BusinessTypes;
