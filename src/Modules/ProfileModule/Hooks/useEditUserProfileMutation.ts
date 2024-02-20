import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { fetcher, jsonToFormData } from "../../../Utils/Helpers";
import { EDIT_PROFILE_REQUEST } from "../Types/RequestTypes";
import { EDIT_PROFILE_RESPONSE } from "../Types/ResponseTypes";

const editUserProfile = async (
  data: EDIT_PROFILE_REQUEST
): Promise<AxiosResponse<EDIT_PROFILE_RESPONSE>> => {
  return fetcher({
    url: `app/auth/edit-profile`,
    method: "PATCH",
    data: jsonToFormData(data),
  });
};

function useEditUserProfileMutation() {
  return useMutation(editUserProfile);
}

export default useEditUserProfileMutation;
