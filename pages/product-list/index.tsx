import { useRouter } from "next/router";
import React, { useState } from "react";
import withProtectedRoute from "src/HOCs/withProtectedRoute";
import useProductListQuery from "src/Modules/CategoryModule/Hooks/useProductListQuery";
import useSubCategoryQuery from "src/Modules/CategoryModule/Hooks/useSubCategoryQuery";
import useCategoryListQuery from "src/Modules/LandingPageModule/Hooks/useCategoryListQuery";

import Layout from "src/Modules/LayoutModule/Component/Layout/Layout";
import ProductListingPage from "src/Modules/ProductListingPage/Components/ProductListingPage";
import { strings } from "src/Utils/Localization";

function ProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const queryData: any = router?.query;

  const subcategoryId = queryData && queryData?.subcategoryId;

  const productListQuery = useProductListQuery(subcategoryId);

  const productList = productListQuery?.data?.data?.data?.list ?? [];

  const categoryName = encodeURIComponent(queryData?.categoryName);

  const catInfo = productList?.filter((item) => {
    if (item?.products?.subcategoryId === queryData?.subcategoryId) {
      return true;
    }
  });

  const categoryId = catInfo?.[0]?.products?.categoryId;
  const breadCrumbData = [
    {
      title: strings?.category,
      path: "/category",
    },
    {
      title: queryData?.subname,
      path: `/category/subcategory?categoryId=${queryData?.categoryId}&categoryName=${categoryName}`,
    },
    {
      title: strings?.product,
    },
  ];

  return (
    <>
      <Layout
        showNav={false}
        showBreadCrumbs={true}
        routes={breadCrumbData}
        //  title={"Category"}
      >
        <ProductListingPage />
      </Layout>
    </>
  );
}

export default ProductsPage;
