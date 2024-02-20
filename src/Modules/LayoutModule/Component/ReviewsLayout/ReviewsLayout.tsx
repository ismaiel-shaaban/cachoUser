import Header from "../HomeHeader/Header";
import ReviewsHeader from "../ReviewsHeader/ReviewsHeader";

type LAYOUT_PROPS = {
  children: any;
};
function ReviewsLayout(props: LAYOUT_PROPS) {
  const { children } = props;
  return (
    <>
      {/* <Header /> */}
      <ReviewsHeader />
      {children}
    </>
  );
}

export default ReviewsLayout;
