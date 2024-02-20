import Header from "../HomeHeader/Header";
// import SalonHeader from "../Breadcrumb/SalonHeader";
import TermsHeader from "../TermsHeader/TermsHeader";

type LAYOUT_PROPS = {
  children: any;
};
function Layout(props: LAYOUT_PROPS) {
  const { children } = props;
  return (
    <>
      {/* <Header /> */}
      <TermsHeader />
      {children}
    </>
  );
}

export default Layout;
