// import NotificationLayout from "src/Modules/Layout/Component/NotificationLayout/NotificationLayout";
import Layout from "src/Modules/LayoutModule/Component/Layout/Layout";
import Notifications from "src/Modules/NotificationsModule/Component/Notifications";
function notificationPage() {
  const breadCrumbData = [
    {
      title: "Notification",
      path: "/Notification",
    },
  ];
  return (
    <>
      <Layout showNav={false} showBreadCrumbs={false} routes={breadCrumbData}>
        <Notifications />
      </Layout>
    </>
  );
}   
export default notificationPage;
 