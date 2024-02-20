import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
//@ts-ignore
import images from "src/Assets/images";
import styles from "./PhoneNumWithLoginModal.module.css";
import useEventEmitter, { emitEvent } from "src/Hooks/useEventEmmiter";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";
import FormInput from "src/Components/FormInput/FormInput";
import { useForm } from "react-hook-form";
import { getPhoneNumberValidationRules } from "src/Utils/Validators";
import { strings } from "src/Utils/Localization";
import useLoginMutation from "src/Modules/AuthModule/Hooks/useLoginMutation";
import VerifyLoginOtpModal, {
  verifyLoginOtpModal,
} from "./VerifyLoginOtpModal/VerifyLoginOtpModal";
const LOGIN_EVENT = "LOGIN_EVENT";
export const loginModal = () => {
  emitEvent(LOGIN_EVENT);
};

function PhoneNumWithLoginModal() {
  const router = useRouter();
  let [isOpen, setIsOpen] = useState(false);

  useEventEmitter(LOGIN_EVENT, () => {
    setIsOpen(true);
  });

  const { language } = useAuthValue();
  const {
    formState,
    watch,
    setValue,
    formState: { errors },
    trigger,
    reset,
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      phoneNumber: "",
      countryCode: "",
    },
    mode: "onChange",
  });
  const loginMutation = useLoginMutation();
  const handleLogin = handleSubmit((value: any) => {
    loginMutation.mutate(
      {
        phoneNumber: value?.phoneNumber,
        countryCode: value?.countryCode,
      },
      {
        onSuccess: (responseData: any) => {
          const { status, data } = responseData;
          if (status === 200) {
            localStorage.setItem(
              "num",
              JSON.stringify({
                phoneNumber: value?.phoneNumber,
                countryCode: value?.countryCode,
              })
            );
            verifyLoginOtpModal();
            setIsOpen(false);
            reset();
          }
        },
      }
    );
  });
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          open={true}
          onClose={() => null}
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
                <div
                  dir={language === "ar" ? "rtl" : "ltr"}
                  className={"max-w-[401px] w-[100%]"}
                >
                  <Dialog.Panel className="w-full max-w-[401px] transform  rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                    <button
                      className={styles.crossBtn}
                      onClick={() => {
                        setIsOpen(false), router.push("/");
                      }}
                    >
                      <Image src={images.crossIconBlack} alt="cross" />
                    </button>
                    <div className="text-center  sm:pl-[0px] md:pl-[0px] pt-[30px] px-[20px] pb-[50px]">
                      <h1 className="font-semibold text-[28px] leading-[150%] text-[#000000] mb-[15px] ssm:text-[22px] ssm:leading-[120%] ssm:font-normal ssm:mb-[10px]">
                        {strings.login_to_continue}
                      </h1>
                      <p className="text-[16px] leading-[150%] text-[#000000] font-[400] mb-[20px] ssm:text-[15px] ssm:leading-[120%] ssm:mb-[15px]">
                        {strings?.login_modal_message}
                      </p>

                      <form
                        className={
                          language === "ar"
                            ? ` ${styles.signupForm} text-left ${styles.arabicSignupForm} text-left `
                            : `  ${styles.signupForm} text-left`
                        }
                        onSubmit={handleLogin}
                      >
                        <div className={`${styles.phnInput} `}>
                          <FormInput
                            name="phoneNumber"
                            type="phone"
                            label={strings?.phone_number}
                            control={control}
                            setValue={setValue}
                            trigger={trigger}
                            inputProps={{
                              placeholder: strings?.phone_number,
                            }}
                            rules={getPhoneNumberValidationRules(
                              watch("countryCode")
                            )}
                            callingCodeName="countryCode"
                            value={`${watch("countryCode")}${watch(
                              "phoneNumber"
                            )}`}
                          />
                        </div>
                        <button
                          className={
                            !formState?.isValid
                              ? styles.disabledBtn
                              : styles.defaultBtn
                          }
                          type="submit"
                          disabled={!formState?.isValid}
                        >
                          {strings.continue}
                        </button>
                      </form>
                    </div>
                  </Dialog.Panel>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <VerifyLoginOtpModal />
    </>
  );
}

export default PhoneNumWithLoginModal;
