import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { fetcher } from "../../../Utils/Helpers";
import { EDIT_PROFILE_PHONE_VERIFY_REQUEST, RESEND_OTP_REQUEST } from "../Types/RequestTypes";
import { EDIT_PROFILE_PHONE_VERIFY_RESPONSE, RESEND_OTP_RESPONSE } from "../Types/ResponseTypes";
import { queryClient } from "src/Utils/ReactQueryConfig";
import { GET_PROFILE } from "./useUserProfileQuery";

const resendOtp = async (
  data: RESEND_OTP_REQUEST
): Promise<AxiosResponse<RESEND_OTP_RESPONSE>> => {
  return fetcher({
    url: `app/auth/resend-otp`,
    method: "POST",
    data: data,
  });
};

function useResendOtpMutation() {
  return useMutation(resendOtp, {
  });
}

export default useResendOtpMutation;
