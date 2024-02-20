// import Layout from "src/Modules/Layout/Component/Layout/Layout";
import SalonProfile from "src/Modules/SalonModule/SalonProfile/SalonProfile";
// import "../../styles/globals.css";
import "../../styles/ProfileBody.module.css";
import withProtectedRoute from "src/HOCs/withProtectedRoute";
function SalonPage() {
  return (
    <>
      {/* <Layout> */}
      <SalonProfile />
      {/* </Layout> */}
    </>
  );
}
export default withProtectedRoute(SalonPage);
