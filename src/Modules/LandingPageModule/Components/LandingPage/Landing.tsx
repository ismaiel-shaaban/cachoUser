import React, { useEffect } from "react";
import HomePageBanner from "../HomePageBanner/HomePageBanner";
import Stores from "../Stores/Stores";
import { useRouter } from "next/router";
import useVendorProductListQuery from "src/Modules/ProductListingPage/Hooks/useVendorProductListQuery";
import AddReviewModal, {
  addModal,
} from "src/Modules/ProductListingPage/Components/ProductView/ProductTabList/Reviews/AddReviewModal/AddReviewModal";
import EditReviewModal, {
  editModal,
} from "src/Modules/ProductListingPage/Components/ProductView/ProductTabList/Reviews/EditReviewModal/EditReviewModal";
import useReviewDetailsQuery from "../../Hooks/useReviewDetailsQuery";
import PhoneNumWithLoginModal, {
  loginModal,
} from "./PhoneNumWithLoginModal/PhoneNumWithLoginModal";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";
function Landing() {
  const router = useRouter();
  const { loggedIn } = useAuthValue();
  const vendorId: any = router?.query?.vendorId;
  const productId: any = router?.query?.productId;
  const reviewId: any = router?.query?.reviewId;
  const userName: any = router?.query?.userName;
  const vendorProductListQuery = useVendorProductListQuery(vendorId);
  const vendorProductListData =
    vendorProductListQuery?.data?.data?.data?.list ?? [];
  const reviewDetails = useReviewDetailsQuery(reviewId);
  const reviewDetailsItem = reviewDetails?.data?.data?.data;
  useEffect(() => {
    if ((vendorId || productId || reviewId || userName) && !loggedIn) {
      loginModal();
    } else if (vendorId && productId && reviewId && userName) {
      editModal(reviewDetailsItem);
    } else if (vendorId && userName) {
      addModal(vendorProductListData);
    }
  }, [vendorId, reviewDetailsItem, loggedIn]);
  return (
    <>
      <HomePageBanner />
      <Stores />
      {/* <WorkSection />
      <BecomeVendor />
      <ReviewSection /> */}
      {/* <ContactSection /> */}
      <AddReviewModal vendorId={vendorId} />
      <EditReviewModal vendorProductListData={vendorProductListData} />
      <PhoneNumWithLoginModal />
    </>
  );
}

export default Landing;
