import ContactUsHeader from "../ContactUsHeader/ContactUsHeader";
import Header from "../HomeHeader/Header";

type LAYOUT_PROPS = {
  children: any;
};
function ContactUsLayout(props: LAYOUT_PROPS) {
  const { children } = props;
  return (
    <>
      {/* <Header /> */}
      <ContactUsHeader />
      {children}
    </>
  );
}
export default ContactUsLayout;
