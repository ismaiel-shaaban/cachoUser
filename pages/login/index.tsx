import withAuthRoute from "src/HOCs/withAuthRoute";
import Login from "src/Modules/AuthModule/Components/Login/Login";
import Landing from "src/Modules/LandingPageModule/Components/LandingPage/Landing";
import Layout from "src/Modules/LayoutModule/Component/Layout/Layout";
import { strings } from "src/Utils/Localization";

function LoginIndex() {
  return (
    <>
      <Login />
    </>
  );
}
export default LoginIndex;
