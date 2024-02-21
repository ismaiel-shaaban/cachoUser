import { useRouter } from "next/router";
import React, { useState } from "react";
import { useStateManager } from "react-select";
import useSubCategoryQuery from "src/Modules/CategoryModule/Hooks/useSubCategoryQuery";
import useBusinessTypeListQuery from "src/Modules/LandingPageModule/Hooks/useBusinessTypeListQuery";
import Layout from "src/Modules/LayoutModule/Component/Layout/Layout";
import withProtectedRoute from "src/HOCs/withProtectedRoute";
import { strings } from "src/Utils/Localization";
import SubCategoryModule from "src/Modules/CategoryModule/Components/SubCategoryModule/SubCategoryModule";

function index() {
  const router = useRouter();
  const [serch, setSearch] = useState("");
  const queryData: any = router?.query;
  const page = router?.query?.page ? Number(router?.query?.page) : 1;
  const subCategoryQuery = useSubCategoryQuery(page, queryData?.categoryId);
  const subCategoryData = subCategoryQuery?.data?.data?.data?.list ?? [];
  const countPage: number = subCategoryQuery?.data?.data?.data?.count ?? 0;
  const limitPage: number = subCategoryQuery?.data?.data?.data?.limit ?? 0;
  const totalPages = Math.ceil(countPage / limitPage);
  const categoryName = encodeURIComponent(subCategoryData[0]?.parentId?.name);
  const paramsCategoryName = queryData?.categoryName?.replace(
    /\s*,\s*/g,
    " & "
  );

  const breadCrumbData = [
    {
      title: strings?.all_cat,
      path: "/category",
    },

    {
      title: queryData?.categoryName ? paramsCategoryName : categoryName,
      path: queryData?.categoryName
        ? ` category/subcategory?categoryId=${queryData?.categoryId}&categoryName=${queryData?.categoryName}`
        : `category/subcategory?categoryId=${subCategoryData[0]?.parentId?._id}`,
    },
  ];
  return (
    <>
      <Layout showNav={false} showBreadCrumbs={true} routes={breadCrumbData}>
        <SubCategoryModule
          subCategoryData={subCategoryData}
          totalPages={totalPages}
          page={page}
        />
      </Layout>
    </>
  );
}

export default index;
