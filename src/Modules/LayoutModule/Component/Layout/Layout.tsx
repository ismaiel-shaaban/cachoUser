import Footer from "src/Modules/LandingPageModule/Components/LandingPage/Footer/Footer";
import { BREADCRUMB } from "../../Types/ResponseTypes";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import Header from "../HomeHeader/Header";
import { useRouter } from "next/router";
import NotificationLayout from "../NotificationLayout/NotificationLayout";
import useNotificationListQuery from "src/Modules/NotificationsModule/Hooks/useNotificationListQuery";

type LAYOUT_PROPS = {
  showNav: boolean;
  children: any;
  routes?: Array<BREADCRUMB>;
  title?: any;
  showBreadCrumbs?: boolean;
  showFooter?: boolean;
  showPopup?: boolean;
};
function Layout(props: LAYOUT_PROPS) {
  const {
    showNav,
    children,
    routes,
    title,
    showBreadCrumbs = true,
    showFooter = true,
    showPopup = false,
  } = props;
  const router = useRouter();
  const notificationList=useNotificationListQuery()
  const notificationCount=notificationList?.data?.data?.unreadCount;
  const notificationListCount=notificationList?.data?.data?.count;
  return (
    <>
      <Header showNav={showNav} showPopup={showPopup} notificationCount={notificationCount}/>
      {showBreadCrumbs && <Breadcrumb routes={routes} title={title} />}
      {router?.pathname === "/notifications" ? (
        <NotificationLayout notificationListCount={notificationListCount}>{children}</NotificationLayout>
      ) : (
        children
      )}
      <Footer />
    </>
  );
}

export default Layout;
