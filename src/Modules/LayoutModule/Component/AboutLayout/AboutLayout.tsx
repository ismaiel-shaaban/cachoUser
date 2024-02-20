import AboutHeader from "../AboutHeader/AboutHeader";
import Header from "../HomeHeader/Header";
// import SalonHeader from "../Breadcrumb/SalonHeader";

type LAYOUT_PROPS = {
  children: any;
};
function AboutLayout(props: LAYOUT_PROPS) {
  const { children } = props;
  return (
    <>
      <Header showNav={false} showPopup={false}  />
      <AboutHeader />
      {children}
    </>
  );
}

export default AboutLayout;
