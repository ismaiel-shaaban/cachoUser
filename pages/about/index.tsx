import About from "src/Modules/AboutModule/About";
import Layout from "src/Modules/LayoutModule/Component/Layout/Layout";
import { strings } from "src/Utils/Localization";
// import AboutLayout from "src/Modules/Layout/Component/AboutLayout/AboutLayout";

function aboutPage() {
  const breadCrumbData = [
    {
      title: `${strings.about}`,
      path: "/About",
    },
  ];

  return (
    <>
      <Layout showNav={false} showBreadCrumbs={true} routes={breadCrumbData}>
          <About />
      </Layout>
    </>
  );
}
export default aboutPage;
