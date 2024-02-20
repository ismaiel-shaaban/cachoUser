import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import SnackbarHandler from "src/Utils/SnackbarHandler";
import { fetcher } from "../../../Utils/Helpers";
import { LOGIN_REQUEST } from "../Types/RequestTypes";
import { LOGIN_RESPONSE } from "../Types/ResponseTypes";
import { getAuthValue, setAuthValue } from "./useAuthValue";
import { strings } from "src/Utils/Localization";

const login = async (
  data: LOGIN_REQUEST
): Promise<AxiosResponse<LOGIN_RESPONSE>> => {
  return fetcher({
    url: `app/auth/login`,
    method: "POST",
    data,
  });
};

function useLoginMutation() {
  return useMutation(login, {
    onSuccess: (responseData) => {
      if (responseData) {
        const { status } = responseData;
        if (status === 200) {
          SnackbarHandler.successToast(strings.otp_verification_msg);
        }
      }
    },
  });
}

export default useLoginMutation;
