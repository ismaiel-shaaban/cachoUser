import { useRouter } from "next/router";
import withProtectedRoute from "src/HOCs/withProtectedRoute";
import useProductDetailsQuery from "src/Modules/CategoryModule/Hooks/useProductDetailsQuery";
import Layout from "src/Modules/LayoutModule/Component/Layout/Layout";
import ProductView from "src/Modules/ProductListingPage/Components/ProductView/ProductView";
import { strings } from "src/Utils/Localization";

export function getServerSideProps(context: any) {
  return {
    props: { params: context.params },
  };
}

function ProductDetailsPage({ params }: any) {
  const { id }: any = params;
  const router = useRouter();
  const queryData: any = router?.query;
  const { data, isLoading } = useProductDetailsQuery(id);
  const productDetails = data?.data?.data;

  const categoryName = queryData?.categoryName;

  // const imageList={arrivalProductDetails?.photos || [] || {}}

  // {
  //   title: queryData?.productName  ? queryData?.productName: productDetails?.productData?.subcategoryName ,
  //   path: (queryData && queryData?.subname) ?`/product-list?subcategoryId=${queryData?.subcategoryId}&subname=${queryData?.subname}` :`/product-list?subcategoryId=${productDetails?.productData?.subcategoryId}&subname=${encodedsubCategoryName}` ,
  // },

  const breadCrumbData = [
    {
      title: strings?.category,
      path: "/category",
    },
    {
      title: queryData?.productName,
      path: `/product-list?subcategoryId=${queryData?.subcategoryId}&subname=${queryData?.subname}&categoryId=${queryData?.categoryId}&categoryName=${categoryName}`,
    },
    {
      title: "Detail",
      path: "",
    },
  ];
  return (
    <>
      <Layout showNav={false} showBreadCrumbs={true} routes={breadCrumbData}>
        <ProductView productDetails={productDetails} isLoading={isLoading} />
      </Layout>
    </>
  );
}

export default ProductDetailsPage;
