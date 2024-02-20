import React, { useEffect, useState } from "react";
import styles from "./OtpVerify.module.css";
import Image from "next/image";
import images from "src/Assets/images";
//@ts-ignore
import OtpInput from "react-otp-input";
import Link from "next/link";
import useVerifyOtpMutation from "../../Hooks/useVerifyOtpMutation";
import useResendOtpMutation from "../../Hooks/useResendOtpMutation";
import useAuthValue, {
  getAuthValue,
  setAuthValue,
} from "../../Hooks/useAuthValue";
import { useRouter } from "next/router";
import Loader from "src/Components/Loader/Loader";
import { strings } from "src/Utils/Localization";
import { fetcher, getCurrentLocation, getUniqueId } from "src/Utils/Helpers";
import FireBaseHandler from "src/Utils/FireBaseHandler";
import { isSupported } from "firebase/messaging";

function OtpVerify() {
  const [otp, setOtp] = useState("");

  const router = useRouter();
  const { loggedIn } = useAuthValue();
  const verifyOtpMutation = useVerifyOtpMutation();
  const resendOtpMutation = useResendOtpMutation();
  const lastRoute = JSON.parse(String(sessionStorage.getItem("lastRoute")));
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
            getCurrentLocation(loggedIn);
            setAuthValue({
              ...getAuthValue(),
              user: user,
              loggedIn: true,
              token: data?.token,
            });
            lastRoute ? router.push(lastRoute) : router?.push("/");
            localStorage.removeItem("num");
            (async () => {
              const isMessagingSupported = await isSupported();
              if (isMessagingSupported) {
                const fcmToken = await FireBaseHandler.getToken();
                fetcher({
                  url: "app/auth/update-device-token",
                  method: "PATCH",
                  data: {
                    deviceId: getUniqueId(),
                    deviceType: "WEB",
                    deviceToken: fcmToken,
                  },
                });
              }
            })();
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

  const { language } = useAuthValue();

  return (
    <>
      <div>
        <div className="text-left">
          <button
            className="bg-inherit"
            onClick={() => {
              router.push("/login");
              localStorage.removeItem("num");
            }}
          >
            <Image
              src={images.arrowLeft}
              alt="arrow left"
              width={"28px"}
              height={"28px"}
            />
          </button>
        </div>
        <h4 className="font-semibold text-[24px] leading-[150%] text-[#000000] mb-[15px] ssm:text-[22px] ssm:leading-[120%]  ssm:mb-[10px]">
          {strings?.verify_your_contact_number}
        </h4>
        <p className="text-[16px] leading-[150%] text-[#000000] font-normal mb-[20px] ssm:text-[15px] ssm:leading-[120%] ssm:mb-[15px]">
          {strings?.enter_the_code_we_just_text_you}
        </p>
        <form
          className={
            language === "ar"
              ? ` ${styles.otpBox} text-left mt-[25px] ${styles.otpBoxArabic} text-right mt-[25px] `
              : `${styles.otpBox} text-left mt-[25px]`
          }
        >
          <label className="font-medium text-[12px] leading-[150%] tracking-[0.085em]  text-[#000000] mb-[6px] block">
            {strings?.verification_code}
          </label>
          <OtpInput
            value={otp}
            onChange={(otp: any) => setOtp(otp)}
            numInputs={5}
            //@ts-ignore
            isInputNum={true}
            className={styles.otpBoxInput}
            //@ts-ignore
            renderInput={(props: any) => <input {...props} />}
          />

          <button
            className={
              otp === "" || otp.length < 5
                ? styles.disabledBtn
                : styles.defaultBtn
            }
            type="button"
            onClick={handleOtp}
            disabled={otp === "" || otp.length < 5}
          >
            {strings?.verify}
          </button>
        </form>

        <p className="mt-[25px] font-normal text-[15px] leading-[150%] text-[#989898] mb-[50px] ssm:mb-[10px] sm:mb-[10px]">
          {strings?.didnt_get_it}
          <Link href="">
            <span
              className="font-semibold text-primary cursor-pointer ssm:font-normal border-b border-b-primary"
              onClick={(e: any) => {
                e.preventDefault();
                handleResendOtp();
              }}
            >
              {strings?.click_to_resend}
            </span>
          </Link>
        </p>
      </div>
    </>
  );
}

export default OtpVerify;
