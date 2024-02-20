import { useRouter } from "next/router";
import React from "react";
import withProtectedRoute from "src/HOCs/withProtectedRoute";
import useProductDetailsQuery from "src/Modules/CategoryModule/Hooks/useProductDetailsQuery";
import useVendorProductsQuery from "src/Modules/CategoryModule/Hooks/useVendorProductsQuery";
import Layout from "src/Modules/LayoutModule/Component/Layout/Layout";
// import Layout from "src/Modules/Layout/Component/Layout/Layout";
// import SalonHeader from "src/Modules/Layout/Component/SalonHeader/SalonHeader";
import VendorShopDetailsLayout from "src/Modules/VendorShopDetailsModule/Components/VendorShopDetailsLayout/VendorShopDetailsLayout";
import { strings } from "src/Utils/Localization";

function VendorShopDetails() {
  const router = useRouter();
  const queryData: any = router?.query;
  const categoryName = encodeURIComponent(queryData?.categoryName);
  const { data } = useProductDetailsQuery(queryData?.productId);
  const vendorDetails = data?.data?.data?.productData?.vendor;
  const vendorProductsQuery = useVendorProductsQuery(queryData?.vendorId);

  const vendorProducts = vendorProductsQuery?.data?.data?.data?.list ?? [];

  const breadCrumbData = [
    {
      title: strings?.category,
      path: "/category",
    },
    {
      title: queryData?.productName,
      path:
        queryData?.subname && queryData?.categoryName
          ? `/product-list/${queryData?.productId}?productName=${queryData?.productName}&subname=${queryData?.subname}&subcategoryId=${queryData?.subCategoryId}&categoryName=${queryData?.categoryName}&categoryId=${queryData?.categoryId}&vendorName=${queryData?.vendorName}&vendorImage=${queryData?.vendorImage}`
          : `/search-product/${queryData?.productId}?productName=${queryData?.productName}&subcategoryId=${queryData?.subCategoryId}&categoryId=${queryData?.categoryId}&vendorName=${queryData?.vendorName}&vendorImage=${queryData?.vendorImage}`,
    },
    {
      title: queryData?.businessName,
      path: "",
    },
  ];
  return (
    <>
      <Layout showNav={false} showBreadCrumbs={true} routes={breadCrumbData}>
        {/* <SalonHeader />  */}
        <VendorShopDetailsLayout
          vendorDetails={vendorDetails}
          vendorProducts={vendorProducts}
        />
      </Layout>
    </>
  );
}

export default VendorShopDetails;
