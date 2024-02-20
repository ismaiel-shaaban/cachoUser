import { useForm } from "react-hook-form";
import images from "../../../../Assets/images";
import Image from "next/image";
import useLoginMutation from "../../Hooks/useLoginMutation";
import AuthHeader from "../AuthHeader/AuthHeader";
import Link from "next/link";
import styles from "./Login.module.css";
import OtpVerify from "../OtpVerify/OtpVerify";
import { useEffect, useState } from "react";
import { USER_RESPONSE } from "../../Types/ResponseTypes";
import Loader from "src/Components/Loader/Loader";
import { getPhoneNumberValidationRules } from "src/Utils/Validators";
import FormInput from "src/Components/FormInput/FormInput";
import { strings } from "src/Utils/Localization";
import { useRouter } from "next/router";
import useAuthValue from "../../Hooks/useAuthValue";

function Login() {
  const router = useRouter();
  const {
    formState,
    reset,
    watch,
    setValue,
    formState: { errors },
    trigger,
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      phoneNumber: "",
      countryCode: "+966",
      countryName: "Saudi Arabia",
    },
    mode: "onChange",
  });

  const loginMutation = useLoginMutation();
  const handleLogin = handleSubmit((value: any) => {
    loginMutation.mutate(
      {
        phoneNumber: value?.phoneNumber,
        countryCode: value?.countryCode,
        countryName: value?.countryName,
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
                countryName: value?.countryName,
              })
            );
            router.push(`?s=showOtp`);
            reset();
          }
        },
      }
    );
  });
  const showOtp = router.query?.s;
  const { language } = useAuthValue();
  // const [headerHeight, setHeaderHeight] = useState("");
  // useEffect(() => {
  //   const topHeaderArea = document.querySelector(".topHeaderArea");
  //   setHeaderHeight(`${topHeaderArea?.clientHeight}px`);
  // });
  return (
    <>
      {loginMutation?.isLoading && <Loader />}
      {/* <section className={"h-screen w-full"}> */}
      <AuthHeader />
      {/* <section className="py-[20px] bg-authBgClr min-h-screen"> */}
      <section
        className={`py-[20px]  bg-authBgClr   ${styles.groundBG} groundBG`}
      >
        <div
          className={` ${styles.loginWrapper} min-h-[calc(100vh-65px)] main-container mx-auto py-[10px] flex items-center ssm:p-[15px] sm:justify-center md:justify-center`}
        >
          {/* ===== mobile image start ======== */}
          <article
            className={`${styles.phoneImg} flex items-center justify-center  ssm:order-2 relative`}
          >
            <div className={`w-[300px] ${styles.img}`}>
              <Image src={images.cachooImg} alt="mobile-image" />
            </div>
            {/* <Image src={images.phnImage} alt="mobile-image" layout={"fill"} /> */}
          </article>
          {/* ===== mobile image end
           ======== */}

          {/* ====== login form start========= */}
          {!showOtp ? (
            <article
              className={
                language === "ar"
                  ? ` ${styles.signupFormWrapper} text-center  sm:pl-[0px]   ssm:order-1  ssm:border-l-0 sm:border-l-0 md:border-l-0  ${styles.arabicsignupFormWrapper} text-center pl-[0px] pr-[60px] sm:pr-[0px] md:pr-[0px] sm:pl-[0px] md:pl-[0px] border-l border-l-[#D9D9D9] ssm:order-1 ssm:pl-[0px] ssm:border-l-0 sm:border-l-0 md:border-l-0 ssm:w-full `
                  : ` ${styles.signupFormWrapper} text-center  sm:pl-[0px]   ssm:order-1  ssm:border-l-0 sm:border-l-0 md:border-l-0 `
              }
            >
              <h1 className="font-semibold text-[28px] leading-[150%] text-[#000000] mb-[15px] ssm:text-[22px] ssm:leading-[120%]  ssm:mb-[10px]">
                {strings?.enter_phone_number}
              </h1>
              <p className="text-[16px] leading-[150%] text-[#000000] font-normal mb-[20px] ssm:text-[15px] ssm:leading-[120%] ssm:mb-[15px]">
                {strings?.we_need_to_send_you_a_verification}
                <br /> {strings?.code}
              </p>

              <form
                className={
                  language === "ar"
                    ? ` ${styles.signupForm} text-left ${styles.arabicSignupForm} text-left `
                    : ` ${styles.signupForm} text-left`
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
                    rules={getPhoneNumberValidationRules(watch("countryCode"))}
                    callingCodeName="countryCode"
                    countryName="countryName"
                    value={`${watch("countryCode")}${watch("phoneNumber")}`}
                  />
                </div>
                <button
                  className={
                    !formState?.isValid ? styles.disabledBtn : styles.defaultBtn
                  }
                  type="submit"
                  disabled={!formState?.isValid}
                >
                  {strings?.continue}
                </button>
              </form>

              <button>
                <p
                  className=" font-semibold ssm:font-normal text-[15px] leading-[150%] ssm:leading-[120%] text-activeClr mt-[25px] ssm:mt-[15px] cursor-pointer"
                  onClick={() => router.push("/")}
                >
                  {strings.skip_for_now}
                </p>
              </button>
              <hr className="mt-[25px] border-[#D9D9D9]" />
              <p className="mt-[20px] text-[#888888] font-normal text-[17px] leading-[150%]">
                {strings?.download_app_from}
              </p>
              <div className="flex justify-center mt-[25px] gap-[15px]">
                <div className="cursor-pointer h-[50px] w-[140px] relative rounded-[4px] shadow-[0_4px_4px_#00000040]">
                  <Image
                    src={images.googlePlay}
                    alt="google-play"
                    layout={"fill"}
                  />
                </div>

                <div
                  className={
                    " cursor-pointer h-[50px] w-[140px] relative rounded-[4px] shadow-[0_4px_4px_#00000040]"
                  }
                >
                  <Image src={images.appStore} alt="appStore" layout={"fill"} />
                </div>
              </div>
            </article>
          ) : (
            //  ====== login form end=========
            // ========= otp form start ========
            <article
              className={
                language === "ar"
                  ? `${styles.otpWRapper} text-center  border-l border-l-[#D9D9D9] ssm:order-1  ssm:border-l-0 sm:border-l-0 md:border-l-0 ssm:w-full ${styles.arabicBorderLine} pl-[0] pr-[50px] ssm:border-r-0 sm:border-r-0 md:border-r-0 ssm:w-full`
                  : `${styles.otpWRapper} text-center  border-l border-l-[#D9D9D9] ssm:order-1  ssm:border-l-0 sm:border-l-0 md:border-l-0 ssm:w-full`
              }
            >
              <OtpVerify />
              {/* ========= otp form end ======== */}
            </article>
          )}
        </div>
      </section>
      {/* </section> */}
    </>
  );
}

export default Login;
