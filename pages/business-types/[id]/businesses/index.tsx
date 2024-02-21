import React from "react";
import withProtectedRoute from "src/HOCs/withProtectedRoute";
import Breadcrumb from "src/Modules/LayoutModule/Component/Breadcrumb/Breadcrumb";
import Layout from "src/Modules/LayoutModule/Component/Layout/Layout";
import { strings } from "src/Utils/Localization";
import BusinessTypes from "src/Modules/LandingPageModule/Components/LandingPage/BusinessType/BusinessType";
import {useRouter} from "next/router";
import Businesses
    from "../../../../src/Modules/LandingPageModule/Components/LandingPage/BusinessType/Businesses/Businesses";

// import SalonHeader from 'src/Modules/Layout/Component/SalonHeader/SalonHeader'

function index() {

    const router = useRouter();
    const page: number = isNaN(Number(router.query.page)) ? 1 : Number(router.query.page);
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
                <Businesses businessType={router.query.id ? router.query.id.toString():''} page={page} />

        </Layout>
        </>
);
}

export default index;
