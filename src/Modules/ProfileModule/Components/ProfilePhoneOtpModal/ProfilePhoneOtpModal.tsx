import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
//@ts-ignore
import OtpInput from "react-otp-input";
import images from "src/Assets/images";
import useEventEmitter, { emitEvent } from "src/Hooks/useEventEmmiter";
import styles from "./ProfilePhoneOtpModal.module.css";
import Link from "next/link";
import useEditProfilePhoneVerifyMutation from "../../Hooks/useEditProfilePhoneVerifyMutation";
import { GET_PROFILE } from "../../Hooks/useUserProfileQuery";
import { queryClient } from "src/Utils/ReactQueryConfig";
import useResendOtpMutation from "../../Hooks/useResendOtpMutation";
import SnackbarHandler from "src/Utils/SnackbarHandler";
import { strings } from "src/Utils/Localization";
import AuthService from "src/Modules/AuthModule/Services/AuthService";

const PHONE_OTP_EVENT = "phone-otp-event";
export const openPhoneEvent = (data: any) => {
  emitEvent(PHONE_OTP_EVENT, data);
};

function ProfilePhoneOtpModal() {
  const router = useRouter();
  let [isOpen, setIsOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [phoneVerifyData, setPhoneVerifyData] = useState<any>();
  useEventEmitter(PHONE_OTP_EVENT, (data) => {
    setIsOpen(true);
    setPhoneVerifyData(data);
  });
  const editProfilePhoneVerifyMutation = useEditProfilePhoneVerifyMutation();
  const handleProfilePhoneOtp = () => {
    editProfilePhoneVerifyMutation.mutate(
      {
        phoneNumber: phoneVerifyData?.phoneNumber,
        countryCode: phoneVerifyData?.countryCode,
        countryName:phoneVerifyData?.countryName,
        otp: otp,
      },
      {
        onSuccess: (res) => {
          const { status } = res?.data;
          if (status === 200) {
            AuthService.resetAuthValue();
            sessionStorage.clear();
            router.push("/login");
          }
        },
      }
    );
  };
  const { mutate } = useResendOtpMutation();
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
              <Dialog.Panel
                className={`${styles.otpWrapper} w-full max-w-[400px] transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all`}
              >
                <div className="relative">
                  <div className="text-left">
                    <button
                      className="bg-inherit"
                      onClick={() => setIsOpen(false)}
                    >
                      <Image
                        src={images.arrowLeft}
                        alt="arrow left"
                        width={"28px"}
                        height={"28px"}
                      />
                    </button>
                  </div>
                  <button
                    className={styles.crossBtn}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <span>X</span>
                  </button>
                  <div className={styles.centerAlign}>
                    <h4 className="font-semibold text-[24px] leading-[150%] text-[#000000] mb-[15px] ssm:text-[18px] ssm:leading-[120%]  ssm:mb-[10px]">
                      {strings?.verify_your_contact_number}
                    </h4>
                    <p className="text-[16px] leading-[150%] text-[#000000] font-normal  ssm:text-[15px] ssm:leading-[120%] ssm:mb-[15px]">
                      {strings?.enter_the_code_we_just_text_you}
                    </p>
                    <form className={`${styles.otpBox} text-left mt-[25px]`}>
                      <label className="font-[500] text-[12px] leading-[150%] tracking-[0.085em]  text-[#000000] mb-[6px] block">
                        {strings?.verification_code}
                      </label>
                      <OtpInput
                        value={otp}
                        onChange={(otp: any) => setOtp(otp)}
                        numInputs={5}
                        //@ts-ignore
                        isInputNum={true}
                        className={styles.otpBox}
                        renderInput={(props: any) => <input {...props} />}
                      />

                      <button
                        className={
                          otp === "" || otp.length < 5
                            ? styles.disabledBtn
                            : styles.defaultBtn
                        }
                        type="button"
                        onClick={handleProfilePhoneOtp}
                        disabled={otp === "" || otp.length < 5}
                      >
                        {strings?.verify}
                      </button>
                    </form>

                    <p className="mt-[25px] font-normal text-[15px] leading-[150%] text-[#989898] mb-[20px] ssm:mb-[10px] sm:mb-[10px]">
                      {strings?.didnt_get_it}{" "}
                      <button
                        onClick={() => {
                          mutate(
                            {
                              phoneNumber: phoneVerifyData?.phoneNumber,
                              countryCode: phoneVerifyData?.countryCode,
                            },
                            {
                              onSuccess: (response) => {
                                const { status, data } = response;
                                if (status === 200 || 201) {
                                  SnackbarHandler.successToast(data?.message);
                                }
                              },
                            }
                          );
                        }}
                      >
                        <span className="font-semibold text-primary cursor-pointer ssm:font-normal border-b border-b-primary">
                          {strings?.click_to_resend}
                        </span>
                      </button>
                    </p>
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

export default ProfilePhoneOtpModal;
