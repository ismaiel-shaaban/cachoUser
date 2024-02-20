// import ReviewsLayout from "src/Modules/Layout/Component/ReviewsLayout/ReviewsLayout";
import withProtectedRoute from "src/HOCs/withProtectedRoute";
import Layout from "src/Modules/LayoutModule/Component/Layout/Layout";
import ReviewsModule from "src/Modules/ReviewsModule/Components/ReviewsModule";
import { strings } from "src/Utils/Localization";

function ReviewsPage() {
  const breadCrumbData = [
    {
      title: strings?.reviews_and_rating,
      path: "",
    },
  ];
  return (
    <>
      <Layout showNav={false} showBreadCrumbs={true} routes={breadCrumbData}>
        <ReviewsModule />
      </Layout>
    </>
  );
}
export default withProtectedRoute(ReviewsPage);
