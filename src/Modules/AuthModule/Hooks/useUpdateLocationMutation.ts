import { useMutation } from "react-query";
import SnackbarHandler from "src/Utils/SnackbarHandler";
import { AxiosResponse } from "axios";
import { fetcher } from "src/Utils/Helpers";
import { LOCATION_UPDATE_REQUEST, LOGIN_REQUEST } from "../Types/RequestTypes";
import { LOGIN_RESPONSE } from "../Types/ResponseTypes";

const updateLocation = async (
  data: LOCATION_UPDATE_REQUEST
): Promise<AxiosResponse<any>> => {
  return fetcher({
    url: "app/user/updateLocation",
    method: "PATCH",
    data,
  });
};

function useUpdateLocationMutation() {
  return useMutation(updateLocation);
}

export default useUpdateLocationMutation;
