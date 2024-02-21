import React, {useState} from "react";
import Image from "next/image";
import images from "src/Assets/images";
import styles from "./Businesses.module.css";
import {useRouter} from "next/router";
import useBusinessesQuery from "../../../../../BusinessTypesModule/Hooks/useBusinessesQuery";
import {convertFirstLetterToUpperCaseWithSpace, dataLangTranslation} from "../../../../../../Utils/Helpers";

interface ComponentProps {
    businessType: string,
    page?: number
}

function Businesses(props: ComponentProps) {
    const businessListData = useBusinessesQuery(
        props.page ? props.page : 1,
        props.businessType,
    )?.data;
    return (
        <>
            <section className="subCategoriesBox bg-sky py-5">

                <div className="subContainer max-w-[800px] mx-auto">
                    <div className={`bg-white ${styles.catgoriesRow}`}>
                        {businessListData?.docs?.map((item, index) => {
                            return (
                                <div className={styles.catgoriesItem}>
                                    <div className="categoriesBox relative h-[140px]">
                                        <div className="relative w-[240px] h-[140px]">
                                            <Image src={item.logo} alt="img" layout="fill"/>
                                        </div>
                                        <span>
                                            {dataLangTranslation(
                                                convertFirstLetterToUpperCaseWithSpace(
                                                    item?.name
                                                ),
                                                item?.name
                                            )}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Businesses;
