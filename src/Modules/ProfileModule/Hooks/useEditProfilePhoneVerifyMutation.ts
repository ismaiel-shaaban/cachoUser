import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { fetcher } from "../../../Utils/Helpers";
import { EDIT_PROFILE_PHONE_VERIFY_REQUEST } from "../Types/RequestTypes";
import { EDIT_PROFILE_PHONE_VERIFY_RESPONSE } from "../Types/ResponseTypes";
import { queryClient } from "src/Utils/ReactQueryConfig";
import { GET_PROFILE } from "./useUserProfileQuery";

const editProfilePhoneVerify = async (
  data: EDIT_PROFILE_PHONE_VERIFY_REQUEST
): Promise<AxiosResponse<EDIT_PROFILE_PHONE_VERIFY_RESPONSE>> => {
  return fetcher({
    url: `app/auth/edit-phone-verify-otp`,
    method: "POST",
    data: data,
  });
};

function useEditProfilePhoneVerifyMutation() {
  return useMutation(editProfilePhoneVerify);
}

export default useEditProfilePhoneVerifyMutation;
