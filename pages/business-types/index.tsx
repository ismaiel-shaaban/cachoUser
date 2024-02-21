import React from "react";
import withProtectedRoute from "src/HOCs/withProtectedRoute";
import Breadcrumb from "src/Modules/LayoutModule/Component/Breadcrumb/Breadcrumb";
import Layout from "src/Modules/LayoutModule/Component/Layout/Layout";
import { strings } from "src/Utils/Localization";
import BusinessTypes from "src/Modules/LandingPageModule/Components/LandingPage/BusinessType/BusinessType";

// import SalonHeader from 'src/Modules/Layout/Component/SalonHeader/SalonHeader'

function index() {
  const breadCrumbData = [
    {
      title: strings?.category,
      path: "/business-types",
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
        <BusinessTypes />
      </Layout>
    </>
  );
}

export default index;
