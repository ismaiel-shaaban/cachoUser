// import Layout from "src/Modules/Layout/Component/Layout/Layout";
// import TermsLayout from "src/Modules/Layout/Component/TermsLayout/TermsLayout";
import { Fragment } from "react";
import Layout from "src/Modules/LayoutModule/Component/Layout/Layout";
import PrivacyPolicy from "src/Modules/PrivacyPolicy/PrivacyPolicy";
import { strings } from "src/Utils/Localization";

function privacyPage() {
  const breadCrumbData = [
    {
      title: `${strings.term_and_conditions}`,
      path: "/privacy",
    },
  ];

  return (
    <>
      <Layout showNav={false} showBreadCrumbs={true} routes={breadCrumbData}>
        <PrivacyPolicy />
      </Layout>
    </>
  );
}
export default privacyPage;
