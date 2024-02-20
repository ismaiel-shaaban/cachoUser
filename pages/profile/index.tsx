import withProtectedRoute from "src/HOCs/withProtectedRoute";
import Layout from "src/Modules/LayoutModule/Component/Layout/Layout";
import UserProfile from "src/Modules/ProfileModule/Components/UserProfile/UserProfile";
import { strings } from "src/Utils/Localization";
// import "../../styles/globals.css";
// import "../../styles/ProfileBody.module.css";
function ProfilePage() {
  const breadCrumbData = [
    {
      title: strings?.profile,
      path: "",
    },
  ];
  return (
    <>
      <Layout showNav={false} showBreadCrumbs={true} routes={breadCrumbData}>
        <UserProfile />
      </Layout>
    </>
  );
}
export default withProtectedRoute(ProfilePage);
