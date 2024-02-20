import { useRouter } from "next/router";
import React, { useState } from "react";
import withProtectedRoute from "src/HOCs/withProtectedRoute";
import useProductListQuery from "src/Modules/CategoryModule/Hooks/useProductListQuery";
import useSubCategoryQuery from "src/Modules/CategoryModule/Hooks/useSubCategoryQuery";
import SearchProduct from "src/Modules/HomeModule/Components/SearchProduct/SearchProduct";
import useCategoryListQuery from "src/Modules/LandingPageModule/Hooks/useCategoryListQuery";

import Layout from "src/Modules/LayoutModule/Component/Layout/Layout";
function ProductsPage() {
  return (
    <>
      <Layout
        showNav={false}
        showBreadCrumbs={false}
        // routes={breadCrumbData}
        //  title={"Category"}
      >
        <SearchProduct />
      </Layout>
    </>
  );
}

export default ProductsPage;
