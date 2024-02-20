// import Layout from "src/Modules/Layout/Component/Layout/Layout";
// import TermsLayout from "src/Modules/Layout/Component/TermsLayout/TermsLayout";
import { Fragment } from "react";
import Layout from "src/Modules/LayoutModule/Component/Layout/Layout";
import TermsAndConditions from "src/Modules/TermsAndConditionsModule/TermsAndConditions";
import { strings } from "src/Utils/Localization";

function termsConditionPage() {

  const breadCrumbData = [
    {
      title:`${strings.term_and_conditions}`,
      path: "/Terms",
    },
  ];

  return (
    <>
      <Layout showNav={false} showBreadCrumbs={true} routes={breadCrumbData}>
          <TermsAndConditions />
      </Layout>
    </>
  );
}
export default termsConditionPage;
