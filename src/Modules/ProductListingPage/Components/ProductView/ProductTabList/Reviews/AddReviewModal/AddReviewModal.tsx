import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { Rating } from "react-simple-star-rating";
import styles from "./AddReviewModal.module.css";
import useEventEmitter, { emitEvent } from "src/Hooks/useEventEmmiter";
import Multiselect from "multiselect-react-dropdown";
import { useForm } from "react-hook-form";
import FormBuilder from "src/Components/FormBuilder/FormBuilder";
import { getRequiredRules } from "src/Utils/Validators";
import useAddReviewMutation from "src/Modules/ProductListingPage/Hooks/useAddReviewMutation";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";
import SnackbarHandler from "src/Utils/SnackbarHandler";
import { GET_PRODUCT_REVIEW_UNIQUE_KEY } from "src/Modules/ProductListingPage/Hooks/useProductReviewListQuery";
import { queryClient } from "src/Utils/ReactQueryConfig";
import { useRouter } from "next/router";
import { strings } from "src/Utils/Localization";

const ADD_MODAL = "add-modal";
export const addModal = (values: any) => {
  emitEvent(ADD_MODAL, values);
};
function AddReviewModal(props: any) {
  const { vendorId, vendorName } = props;
  const router = useRouter();
  const { control, formState, handleSubmit, watch } = useForm({
    defaultValues: {
      review: "",
      Product: "",
    },
    mode: "onChange",
  });

  let [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthValue();
  const [vendorProduct, setVendorProduct] = useState([]);
  const vendorProductName = vendorProduct.map((item: any) => item.name);
  const userName = router.query.userName;
  const [ratingValue, setRatingValue] = useState(0);
  const selcetedProduct: any = vendorProduct.filter(
    (item: any) => item?.name === watch("Product").toString()
  );
  useEventEmitter(ADD_MODAL, (value) => {
    setIsOpen(true);
    setVendorProduct(value);
  });

  const handleRating = (rate: number) => {
    setRatingValue(rate);
  };

  const addReviewMutation = useAddReviewMutation();
  const handleAddReview = handleSubmit((values: any) => {
    addReviewMutation.mutate(
      {
        userId: String(user?._id),
        vendorId: vendorId,
        productId: selcetedProduct[0]?._id,
        review: values?.review,
        stars: ratingValue,
      },
      {
        onSuccess: (res) => {
          if (res) {
            const { message } = res.data;
            SnackbarHandler.successToast(message);
            setIsOpen(false);
            queryClient.refetchQueries(GET_PRODUCT_REVIEW_UNIQUE_KEY);
            vendorId && userName && router.push("/");
          }
        },
      }
    );
  });
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={() => null}
        className={
          "rounded-lg rounded-8 fixed inset-0 z-[999] overflow-y-auto p-40 w-full "
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
              <Dialog.Panel className="w-full max-w-[607px] transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                <div
                  className={`${styles.borderBtm} pt-[20px] pb-[15px] px-[20px] text-center`}
                >
                  <div
                    className={`${styles.customUpper} font-normal text-[15px] text-black leading-[150%] `}
                  >
                    <h6 className={styles.reviewHeading}>{`${
                      strings?.please_rate
                    } ${userName ? userName : vendorName}`}</h6>
                    <button
                      className={styles.crossBtn}
                      onClick={() => {
                        vendorId && userName
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
                    <Rating onClick={handleRating} initialValue={ratingValue} />
                  </div>
                </div>

                {/* form */}
                <form
                  className={`${styles.ProductDetailsForm} px-[20px]`}
                  onSubmit={handleAddReview}
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
                            placeholder: strings?.select,
                          },
                          options: vendorProductName,
                          singleSelect: true,
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
                      className={`${styles.cancelBtn} inline-flex justify-center font-[500]   py-[12px] border-[#80A0C7] text-[#80A0C7]  text-[16px] rounded-[30px] `}
                      onClick={() => {
                        vendorId
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
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default AddReviewModal;
