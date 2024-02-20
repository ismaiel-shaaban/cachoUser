import { useRouter } from "next/router";
import React from "react";
import withProtectedRoute from "src/HOCs/withProtectedRoute";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";
import useProductDetailsQuery from "src/Modules/CategoryModule/Hooks/useProductDetailsQuery";
import useVendorProductsQuery from "src/Modules/CategoryModule/Hooks/useVendorProductsQuery";
import useNewBusinessQuery from "src/Modules/LandingPageModule/Hooks/useNewBusinessQuery";
import Layout from "src/Modules/LayoutModule/Component/Layout/Layout";
import VendorShopDetailsLayout from "src/Modules/VendorShopDetailsModule/Components/VendorShopDetailsLayout/VendorShopDetailsLayout";
import useVendorDetailsQuery from "src/Modules/VendorShopDetailsModule/Hooks/useVendorDetailsQuery";

function index() {
  const router = useRouter();
  const queryData: any = router?.query;
  const vendorId = queryData?.vendorId;
  const vendorData = useVendorDetailsQuery(vendorId);
  const vendorDetails = vendorData?.data?.data?.data;
  const vendorProductsQuery = useVendorProductsQuery(queryData?.vendorId);

  const vendorProducts = vendorProductsQuery?.data?.data?.data?.list ?? [];
  return (
    <>
      <Layout showNav={false} showBreadCrumbs={true}>
        <VendorShopDetailsLayout
          vendorDetails={vendorDetails}
          vendorProducts={vendorProducts}
        />
      </Layout>
    </>
  );
}

export default index;
