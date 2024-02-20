import React from "react";
import withProtectedRoute from "src/HOCs/withProtectedRoute";
import Category from "src/Modules/LandingPageModule/Components/LandingPage/Category/Category";
import Breadcrumb from "src/Modules/LayoutModule/Component/Breadcrumb/Breadcrumb";
import Layout from "src/Modules/LayoutModule/Component/Layout/Layout";
import { strings } from "src/Utils/Localization";

// import SalonHeader from 'src/Modules/Layout/Component/SalonHeader/SalonHeader'

function index() {
  const breadCrumbData = [
    {
      title: strings?.category,
      path: "/category",
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
        <Category />
      </Layout>
    </>
  );
}

export default index;
