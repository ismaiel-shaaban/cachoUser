import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import styles from "./ReportPopup.module.css";
import useEventEmitter, { emitEvent } from "src/Hooks/useEventEmmiter";
import Image from "next/image";
import images from "src/Assets/images";
import FormBuilder from "src/Components/FormBuilder/FormBuilder";
import { useForm } from "react-hook-form";
import { getRequiredRules } from "src/Utils/Validators";
import SnackbarHandler from "src/Utils/SnackbarHandler";
import useReportChatAndUserMutation from "src/Modules/ChatModule/Hooks/useReportChatAndUserMutation";
import { useRouter } from "next/router";
import { strings } from "src/Utils/Localization";
import { FILE_URL } from "src/Utils/Helpers";

const REPORT_POPUP = "report-popup";
export const reportPopup = (data: any) => {
  emitEvent(REPORT_POPUP, data);
};
function ReportPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [reportUserId, setReportUserId] = useState<any>();
  const [chatData, setChatData] = useState<any>();
  const { control, formState, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      reportReason: "",
      reportDescription: "",
    },
    mode: "onChange",
  });

  useEventEmitter(REPORT_POPUP, (data) => {
    setIsOpen(true);
    setReportUserId(data?.reportedUserId ? data?.reportedUserId : data);
    setChatData(data?.chatInfo ? data?.chatInfo : null);
  });
  const { mutate } = useReportChatAndUserMutation();
  const handleReportUser = handleSubmit((values) => {
    const reportRequest = !chatData
      ? {
          reportedUser: reportUserId,
          reportedUserType: "USER",
          reportType: 2,
          reportReason: (values?.reportReason).toString(),
          reportDescription: values?.reportDescription,
        }
      : {
          reportedUser: reportUserId,
          reportedUserType: "VENDOR",
          reportType: 1,
          reportReason: (values?.reportReason).toString(),
          reportDescription: values?.reportDescription,
          chatId: chatData?._id,
          chatText: chatData?.message,
        };
    if ((values?.reportReason).toString() === "") {
      SnackbarHandler.errorToast(strings?.please_select_reason);
    } else {
      mutate(reportRequest, {
        onSuccess: (response) => {
          const { status, data } = response;
          if (status === 200) {
            setIsOpen(false);
            reset();
            SnackbarHandler.successToast(data?.message);
          }
        },
      });
    }
  });
  const router = useRouter();

  const vendorName = router?.query?.vendorName;
  const vendorImage = router?.query?.userImage;
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
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
              <Dialog.Panel className="w-full max-w-[425px] transform  rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                <div className={styles.reportWrapper}>
                  <div className={styles.centerAlign}>
                    <div
                      className={`${styles.imgWrap} relative w-[60px] h-[60px] rounded-[20px]`}
                    >
                      <Image
                        src={
                          vendorImage !== null
                            ? `${FILE_URL}${vendorImage}`
                            : images.chatProfile
                        }
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <h4
                      className={`${styles.text} text-[17px] font-[700] text-black text-center`}
                    >
                      {`${strings?.report} ${vendorName}`}{" "}
                    </h4>
                  </div>
                  <div className={styles.formWrapBox}>
                    <form onSubmit={handleReportUser}>
                      <FormBuilder
                        control={control}
                        formState={formState}
                        formConfigArray={[
                          {
                            name: "reportReason",
                            type: "multiSelect",
                            label: strings?.select_reason,
                            multiSelectInputProps: {
                              placeholder: strings?.select_reason,
                            },
                            options: ["Offensive Messages", "Spam", "Other"],
                            singleSelect: true,
                          },
                          watch("reportReason").toString() === "Other"
                            ? {
                                name: "reportDescription",
                                type: "textArea",
                                label: strings?.write_description,
                                textInputProps: {
                                  placeholder: `${strings.write_description}`,
                                  // maxLength: 150,
                                },
                                rules: getRequiredRules(strings?.description),
                              }
                            : {
                                name: "demo1",
                                type: "custom",
                                JSX: () => {
                                  <Fragment />;
                                },
                              },
                        ]}
                      />

                      <div className={styles.buttonWrapper}>
                        <button
                          type="button"
                          className={`${styles.cancelBtn} "max-w-[300px]  text-17 font-medium  w-full text-white rounded-[30px] min-h-[54px] `}
                          onClick={() => setIsOpen(false)}
                        >
                          {strings.cancel}
                        </button>
                        <button
                          type="submit"
                          className="max-w-[300px]  text-17 font-medium bg-primary w-full text-white rounded-[30px] min-h-[54px]"
                        >
                          {strings?.submit}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ReportPopup;
