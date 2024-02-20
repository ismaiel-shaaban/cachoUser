import Layout from "src/Modules/LayoutModule/Component/Layout/Layout";
import ProductCategories from "src/Modules/ProductCategoriesModule/ProductCategories/ProductCategories";
// import "../../styles/globals.css";
// import "../../styles/ProfileBody.module.css";
function ProductPage() {
  //Not Using this component

  const breadCrumbData = [
    {
      title: "Not Using this component",
      path: "/category",
    },
  ];

  return (
    <>
      <Layout showNav={false} showBreadCrumbs={true} routes={breadCrumbData}>
        <ProductCategories />
      </Layout>
    </>
  );
}
export default ProductPage;
