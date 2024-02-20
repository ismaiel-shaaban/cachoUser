import ContactUsHeader from "../ContactUsHeader/ContactUsHeader";
import Header from "../HomeHeader/Header";
import NotificationHeader from "../NotificationHeader/NotificationHeader";

type LAYOUT_PROPS = {
  children: any;
  notificationListCount:any
};
function NotificationLayout(props: LAYOUT_PROPS) {
  const { children,notificationListCount} = props;
  return (
    <>
      {/* <Header /> */}
      <NotificationHeader notificationListCount={notificationListCount}/>
      {children}
    </>
  );
}
export default NotificationLayout;
