import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { fetcher } from "src/Utils/Helpers";
import { USER_PROFILE_RESPONSE } from "../Types/ResponseTypes";

export const GET_PROFILE = `get-profile`;
const getProfile = async (): Promise<AxiosResponse<USER_PROFILE_RESPONSE>> => {
  return fetcher({
    url: `app/auth/profile`,
    method: "GET",
  });
};
function useUserProfileQuery(cb?: any) {
  return useQuery(GET_PROFILE, () => getProfile(), {
    onSuccess: (response) => {
      const { status, data } = response;
      if (status === 200 || 201) {
        cb && cb(data?.data);
      }
    },
  });
}
export default useUserProfileQuery;
