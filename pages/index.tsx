import React, { useState } from "react";
import withProtectedRoute from "src/HOCs/withProtectedRoute";
import Landing from "src/Modules/LandingPageModule/Components/LandingPage/Landing";
import Layout from "src/Modules/LayoutModule/Component/Layout/Layout";
import { strings } from "src/Utils/Localization";
function LandingPage() {
  const breadCrumbData = [
    {
      title: strings?.category,
      path: "/category",
    },
  ];
  return (
    <>
      <Layout showNav={false} showBreadCrumbs={false} routes={breadCrumbData}>
        <Landing />
      </Layout>
    </>
  );
}

export default LandingPage;
