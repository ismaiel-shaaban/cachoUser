import { useMutation } from "react-query";
import SnackbarHandler from "src/Utils/SnackbarHandler";
import { AxiosResponse } from "axios";
import { fetcher } from "src/Utils/Helpers";
import { LOGIN_REQUEST } from "../Types/RequestTypes";
import { LOGIN_RESPONSE } from "../Types/ResponseTypes";

const verifyOtp = async (
  data: LOGIN_REQUEST
): Promise<AxiosResponse<LOGIN_RESPONSE>> => {
  return fetcher({
    url: "app/auth/verify-otp",
    method: "POST",
    data,
  });
};

function useVerifyOtpMutation() {
  return useMutation(verifyOtp, {
    onSuccess: (responseData) => {
      if (responseData) {
        const { status, message } = responseData.data;
        if (status === 200) {
          SnackbarHandler.successToast(message);
        }
      }
    },
  });
}

export default useVerifyOtpMutation;
