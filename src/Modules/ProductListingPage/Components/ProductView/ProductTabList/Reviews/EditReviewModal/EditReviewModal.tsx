import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { Rating } from "react-simple-star-rating";
import styles from "./EditReviewModal.module.css";
import useEventEmitter, { emitEvent } from "src/Hooks/useEventEmmiter";
import Multiselect from "multiselect-react-dropdown";
import { useForm } from "react-hook-form";
import FormBuilder from "src/Components/FormBuilder/FormBuilder";
import { getRequiredRules } from "src/Utils/Validators";
import useEditReviewMutation from "src/Modules/ProductListingPage/Hooks/useEditReviewMutation";
import {
  PRODUCT_REVIEW_LIST_DATA,
  VENDOR_PRODUCT_REVIEW_LIST,
} from "src/Modules/ProductListingPage/Types/ResponseTypes";
import SnackbarHandler from "src/Utils/SnackbarHandler";
import { queryClient } from "src/Utils/ReactQueryConfig";
import { GET_PRODUCT_REVIEW_UNIQUE_KEY } from "src/Modules/ProductListingPage/Hooks/useProductReviewListQuery";
import { strings } from "src/Utils/Localization";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";
import { useRouter } from "next/router";
import { RATING_AND_REVIEWS_LIST_KEY } from "src/Modules/ProductListingPage/Hooks/useGetVendorReviewAndRatingList";
import { GET_REVIEW_LIST_UNIQUE_KEY } from "src/Modules/ReviewsModule/Hooks/useReviewListQuery";

type EDIT_REVIEW_PROPS = {
  vendorProductListData: VENDOR_PRODUCT_REVIEW_LIST | any;
};
const EDIT_MODAL = "edit-modal";
export const editModal = (values: any) => {
  emitEvent(EDIT_MODAL, values);
};
function EditReviewModal(props: EDIT_REVIEW_PROPS) {
  const { vendorProductListData } = props;
  let [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const vendorId: any = router?.query?.vendorId;
  const productId: any = router?.query?.productId;
  const reviewIdParams: any = router?.query?.reviewId;
  const userName: any = router?.query?.userName;
  const [reviewId, setReviewId] = useState("");
  const [reviewData, setReviewData] = useState<PRODUCT_REVIEW_LIST_DATA>();
  const productName = vendorProductListData?.filter(
    (item: any) =>
      (item?.productId ? item?.productId?.name : item?.name) ===
      reviewData?.productId?.name
  );
  const [ratingValue, setRatingValue] = useState(0);
  const { control, formState, handleSubmit, reset, watch } = useForm({
    mode: "onChange",
  });
  useEventEmitter(EDIT_MODAL, (values) => {
    setIsOpen(true);
    setReviewId(values?._id);
    setReviewData(values);
    reset({
      review: values?.review,
    });
  });
  const handleRating = (rate: number) => {
    setRatingValue(rate);
  };
  const editReviewMutation = useEditReviewMutation();
  const handleEditReview = handleSubmit((values) => {
    editReviewMutation.mutate(
      {
        reviewId: reviewId,
        review: String(values?.review),
        stars:
          ratingValue > 0 ? Number(ratingValue) : Number(reviewData?.stars),
      },
      {
        onSuccess: (res) => {
          if (res) {
            const { message } = res?.data;
            SnackbarHandler.successToast(message);
            setIsOpen(false);
            queryClient.refetchQueries(GET_PRODUCT_REVIEW_UNIQUE_KEY);
            queryClient.refetchQueries(GET_REVIEW_LIST_UNIQUE_KEY(1));
            queryClient.refetchQueries(
              RATING_AND_REVIEWS_LIST_KEY(1, vendorId)
            );
            vendorId && productId && reviewIdParams && router.push("/");
          }
        },
      }
    );
  });
  const { language } = useAuthValue();
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={() => null}
        className={"rounded-lg rounded-8 fixed inset-0 z-[999]  p-40 w-full "}
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

        <div className="fixed inset-0 ">
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
              <div
                dir={language === "ar" ? "rtl" : "ltr"}
                className="w-full max-w-[607px]"
              >
                <Dialog.Panel
                  className={
                    language === "ar"
                      ? `${styles.wrapperbox} w-full max-w-[607px] transform  rounded-2xl bg-white text-left align-middle shadow-xl transition-all ${styles.arabicWrapperbox} `
                      : ` ${styles.wrapperbox} w-full max-w-[607px] transform  rounded-2xl bg-white  text-left align-middle shadow-xl transition-all`
                  }
                >
                  <div
                    className={`${styles.borderBtm} pt-[20px] pb-[15px] px-[20px] text-center`}
                  >
                    <div
                      className={`${styles.customUpper} font-normal text-[15px] text-black leading-[150%] `}
                    >
                      <h6 className={styles.reviewHeading}>
                        {`${strings.please_edit} ${userName ? userName : ""}`}
                      </h6>
                      <button
                        className={styles.crossBtn}
                        onClick={() => {
                          vendorId && reviewIdParams && productId && userName
                            ? (setIsOpen(false), router.push("/"))
                            : setIsOpen(false);
                        }}
                      >
                        <span>X</span>
                      </button>
                    </div>
                  </div>
                  <div className={` ${styles.bodyPanel} py-[20px] px-[20px]`}>
                    <div className={styles.stars}>
                      <Rating
                        initialValue={reviewData?.stars}
                        onClick={handleRating}
                      />
                    </div>
                  </div>

                  {/* form */}
                  <form
                    className={`${styles.ProductDetailsForm} px-[20px]`}
                    onSubmit={handleEditReview}
                  >
                    <FormBuilder
                      control={control}
                      formState={formState}
                      formConfigArray={[
                        [
                          {
                            name: "Product",
                            type: "multiSelect",
                            label: strings?.product,
                            multiSelectInputProps: {
                              placeholder: productName
                                ? productName[0]?.productId
                                  ? productName[0]?.productId?.name
                                  : productName[0]?.name
                                : strings?.select,
                            },
                            // options: productName,
                            singleSelect: true,
                            disabledMultipleSelect: true,
                          },
                        ],
                        [
                          {
                            name: "review",
                            type: "textArea",
                            label: strings?.write_review,
                            textInputProps: {
                              placeholder: strings?.write_rev_here,
                              // maxLength: 150,
                            },
                            rules: getRequiredRules(strings?.reviews),
                          },
                        ],
                      ]}
                    />

                    <div
                      className={`${styles.buttonRow}   pb-[30px] flex gap-[15px] justify-between`}
                    >
                      <button
                        type="button"
                        className={`${styles.cancelBtn} inline-flex justify-center   py-[12px] border border-[#80A0C7] text-[#80A0C7]  text-[16px] rounded-[30px] `}
                        onClick={() => {
                          vendorId && reviewIdParams && productId
                            ? (setIsOpen(false), router.push("/"))
                            : setIsOpen(false);
                        }}
                      >
                        {strings?.cancel}
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center capitalize  text-white bg-primary   py-[12px] font-medium text-[16px] rounded-[30px] "
                      >
                        {strings?.update}
                      </button>
                    </div>
                  </form>
                  {/* form */}
                </Dialog.Panel>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default EditReviewModal;
