import React, { useState } from "react";
import Image from "next/image";
import images from "src/Assets/images";
import styles from "./SubCategory.module.css";
import { useRouter } from "next/router";
import useSubCategoryQuery from "src/Modules/CategoryModule/Hooks/useSubCategoryQuery";

function SubCategory() {
  return (
    <>
      <section className="subCategoriesBox bg-sky py-5">
        <div className="subContainer max-w-[800px] mx-auto">
          <div className={`bg-white ${styles.catgoriesRow}`}>
            {[1, 2, 3, 4, 5, 6, 7, 8]?.map((item) => {
              return (
                <div className={styles.catgoriesItem}>
                  <div className="categoriesBox relative h-[140px]">
                    <div className="relative w-[240px] h-[140px]">
                      <Image src={images.cateItem} alt="img" layout="fill" />
                    </div>
                    <span className={styles.catName}>Barber</span>
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
export default SubCategory;
