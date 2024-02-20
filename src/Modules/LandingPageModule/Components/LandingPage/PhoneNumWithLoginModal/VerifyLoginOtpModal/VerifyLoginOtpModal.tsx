import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import styles from "./VerifyLoginOtpModal.module.css";
import useEventEmitter, { emitEvent } from "src/Hooks/useEventEmmiter";

import Image from "next/image";
//@ts-ignore
import OtpInput from "react-otp-input";
import Link from "next/link";
import images from "src/Assets/images";
import useAuthValue, {
  getAuthValue,
  setAuthValue,
} from "src/Modules/AuthModule/Hooks/useAuthValue";
import AuthService from "src/Modules/AuthModule/Services/AuthService";
import { useRouter } from "next/router";
import { strings } from "src/Utils/Localization";
import useResendOtpMutation from "src/Modules/AuthModule/Hooks/useResendOtpMutation";
import useVerifyOtpMutation from "src/Modules/AuthModule/Hooks/useVerifyOtpMutation";
const VERIFY_LOGIN_OTP_MODAL = "VERIFY_LOGIN_OTP_MODAL";
export const verifyLoginOtpModal = () => {
  emitEvent(VERIFY_LOGIN_OTP_MODAL);
};

function VerifyLoginOtpModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthValue();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  useEventEmitter(VERIFY_LOGIN_OTP_MODAL, () => {
    setIsOpen(true);
  });
  const verifyOtpMutation = useVerifyOtpMutation();
  const resendOtpMutation = useResendOtpMutation();
  const numDetails = JSON.parse(String(localStorage.getItem("num")));
  const handleOtp = () => {
    verifyOtpMutation.mutate(
      {
        phoneNumber: numDetails.phoneNumber,
        countryCode: numDetails.countryCode,
        otp: otp,
      },
      {
        onSuccess: (responseData: any) => {
          const { status, data } = responseData?.data;
          const { user } = data;
          if (status === 200) {
            setAuthValue({
              ...getAuthValue(),
              user: user,
              loggedIn: true,
              token: data?.token,
            });
            setIsOpen(false);
            localStorage.removeItem("num");
          }
        },
      }
    );
  };
  const handleResendOtp = () => {
    resendOtpMutation?.mutate({
      phoneNumber: numDetails.phoneNumber,
      countryCode: numDetails.countryCode,
    });
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => null}
          open={isOpen}
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
            <div className="flex min-h-full items-center justify-center p-4 ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full  max-w-[463px] p-[56px] transform overflow-hidden rounded-2xl align-middle bg-white transition-all">
                  <button
                    className={styles.crossBtn}
                    onClick={() => {
                      setIsOpen(false), router.push("/");
                    }}
                  >
                    <Image src={images.crossIconBlack} alt="cross" />
                  </button>
                  <h4 className="font-semibold text-center   text-[24px] leading-[150%] text-[#000000] mb-[15px] ssm:text-[22px] ssm:leading-[120%] ssm:font-normal ssm:mb-[10px]">
                    {strings.verify_your_contact_number}
                  </h4>
                  <p className="text-[16px] text-center  font-[400] leading-[150%] text-[#747474;] font-normal mb-[20px] ssm:text-[15px] ssm:leading-[120%] ssm:mb-[15px]">
                    {strings.enter_the_code_we_just_text_you}
                  </p>
                  <form className={`${styles.otpBox} text-left mt-[25px]`}>
                    <label className="font-[500] text-[12px] leading-[150%] tracking-[0.085em]  text-[#000000] mb-[6px] block">
                      {strings.verfication_code}
                    </label>
                    <OtpInput
                      value={otp}
                      onChange={(otp: any) => setOtp(otp)}
                      numInputs={5}
                      //@ts-ignore
                      isInputNum={true}
                      renderInput={(props) => <input {...props} />}
                    />

                    <button
                      className={`${styles.disabledBtn} ${styles.defaultBtn}`}
                      type="button"
                      onClick={handleOtp}
                    >
                      {strings.verify}
                    </button>
                  </form>

                  <p className="mt-[25px] font-normal text-[15px] text-center leading-[150%] text-[#989898] ">
                    {strings.didnt_get_it}{" "}
                    <button onClick={handleResendOtp}>
                      <span className="font-semibold text-primary cursor-pointer ssm:font-normal border-b border-b-primary">
                        {strings.click_to_resend}
                      </span>
                    </button>
                  </p>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default VerifyLoginOtpModal;
