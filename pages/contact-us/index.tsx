import ContactUs from "src/Modules/ContactUsModule/ContactUs";
import Layout from "src/Modules/LayoutModule/Component/Layout/Layout";
import { strings } from "src/Utils/Localization";
// import ContactUsLayout from "src/Modules/Layout/Component/ContactUsLayout/ContactUsLayout";

function contactUsPage() {
  const breadCrumbData = [
    {
      title: `${strings.contact_us}`,
      path: "/Contact us",
    },
  ];

  return (
    <>
      {/* <ContactUsLayout> */}
      <Layout showNav={false} showBreadCrumbs={true} routes={breadCrumbData}>
        <ContactUs />
      </Layout>
    </>
  );
}
export default contactUsPage;
