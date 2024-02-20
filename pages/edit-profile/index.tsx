import withProtectedRoute from "src/HOCs/withProtectedRoute";
import Layout from "src/Modules/LayoutModule/Component/Layout/Layout";
import EditUserProfile from "src/Modules/ProfileModule/Components/EditUserProfile/EditUserProfile";
import UserProfile from "src/Modules/ProfileModule/Components/UserProfile/UserProfile";
import { strings } from "src/Utils/Localization";
// import "../../styles/globals.css";
// import "../../styles/ProfileBody.module.css";
function EditProfilePage() {
  const breadCrumbData = [
    {
      title: strings?.edit_profile,
      path: "",
    },
  ];
  return (
    <>
      <Layout showNav={false} showBreadCrumbs={true} routes={breadCrumbData}>
        <EditUserProfile />
      </Layout>
    </>
  );
}
export default withProtectedRoute(EditProfilePage);
