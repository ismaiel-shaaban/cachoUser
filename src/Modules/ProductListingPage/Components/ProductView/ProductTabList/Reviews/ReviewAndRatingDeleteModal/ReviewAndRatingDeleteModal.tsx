import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { Rating } from "react-simple-star-rating";
import useEventEmitter, { emitEvent } from "src/Hooks/useEventEmmiter";
import Multiselect from "multiselect-react-dropdown";
import { useForm } from "react-hook-form";
import FormBuilder from "src/Components/FormBuilder/FormBuilder";
import { getRequiredRules } from "src/Utils/Validators";
import styles from "./ReviewAndRatingDeleteModal.module.css";
import useDeleteReviewMutation from "src/Modules/ProductListingPage/Hooks/useDeleteReviewMutation";
import SnackbarHandler from "src/Utils/SnackbarHandler";
import { queryClient } from "src/Utils/ReactQueryConfig";
import { GET_PRODUCT_REVIEW_UNIQUE_KEY } from "src/Modules/ProductListingPage/Hooks/useProductReviewListQuery";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";
import { RATING_AND_REVIEWS_LIST_KEY } from "src/Modules/ProductListingPage/Hooks/useGetVendorReviewAndRatingList";
import { useRouter } from "next/router";

const REVIEW_AND_RATING_MODAL = "review-rating-modal";
export const reviewAndRatingDeleteModal = (values: any) => {
  emitEvent(REVIEW_AND_RATING_MODAL, values);
};

function ReviewAndRatingDeleteModal(props: any) {
  const { productReviewListData } = props;
  let [isOpen, setIsOpen] = useState(false);
  const [reviewId, setReviewId] = useState("");
  const router=useRouter()
  const vendorId: any = router?.query?.vendorId;
  useEventEmitter(REVIEW_AND_RATING_MODAL, (values) => {
    setIsOpen(true);
    setReviewId(values);
  });

  const deleteReviewMutation = useDeleteReviewMutation();
  const handleDeleteReview = () => {
    deleteReviewMutation.mutate(
      {
        reviewId: reviewId,
      },
      {
        onSuccess: (res) => {
          const { message } = res?.data;
          SnackbarHandler.successToast(message);
          setIsOpen(false);
          queryClient.refetchQueries(GET_PRODUCT_REVIEW_UNIQUE_KEY);
          queryClient.refetchQueries(RATING_AND_REVIEWS_LIST_KEY(1,vendorId))
        },
      }
    );
  };
  const { user, language } = useAuthValue();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={
          "rounded-lg rounded-8 fixed inset-0 z-10 overflow-y-auto p-40 w-full "
        }
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div dir={language === "ar" ? "rtl" : "ltr"} className="w-full max-w-[607px]">
                <Dialog.Panel className="w-full max-w-[314px] mx-auto transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                  <div
                    className={` ${styles.bodyPanel} pt-[24px] pb-[20px] px-[40px] text-center`}
                  >
                    {/* deleteBtn */}
                    <div
                      className={`${styles.deleteBtn} mx-auto w-[50px] h-[50px] rounded-[30px] bg-[#44779d33]`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                      >
                        <path
                          d="M28 7.97317C23.56 7.53317 19.0933 7.3065 14.64 7.3065C12 7.3065 9.36 7.43984 6.72 7.7065L4 7.97317M11.3333 6.6265L11.6267 4.87984C11.84 3.61317 12 2.6665 14.2533 2.6665H17.7467C20 2.6665 20.1733 3.6665 20.3733 4.89317L20.6667 6.6265M25.1333 12.1865L24.2667 25.6132C24.12 27.7065 24 29.3332 20.28 29.3332H11.72C8 29.3332 7.88 27.7065 7.73333 25.6132L6.86667 12.1865M13.7733 21.9998H18.2133M12.6667 16.6665H19.3333"
                          stroke="#D46B8D"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>

                    {/* heading */}
                    <h2 className="py-[25px] font-[500] text-[15px]">
                      Are you sure you want to delete this?
                    </h2>

                    {/* btn-grp */}
                    <div
                      className={`${styles.buttonRow} pb-[10px] flex gap-[15px] justify-between`}
                    >
                      <button
                        type="button"
                        className={`${styles.cancelBtn} inline-flex justify-center   py-[12px] border-primary text-primary  text-[16px] rounded-[30px] `}
                        onClick={() => setIsOpen(false)}
                      >
                        No
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center capitalize  text-white bg-primary   py-[12px] font-medium text-[16px] rounded-[30px] "
                        onClick={handleDeleteReview}
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ReviewAndRatingDeleteModal;
