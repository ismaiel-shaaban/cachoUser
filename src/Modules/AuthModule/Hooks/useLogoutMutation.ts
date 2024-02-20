import { useMutation } from "react-query";
import { AxiosResponse } from "axios";
import { fetcher } from "src/Utils/Helpers";
import router from "next/router";
import AuthService from "../Services/AuthService";

const logout = async (): Promise<AxiosResponse<any>> => {
  return fetcher({
    url: "app/auth/logout",
    method: "PATCH",
  });
};

function useLogoutMutation(cb: any) {
  return useMutation(logout, {
    onSuccess: (responseData) => {
      if (responseData) {
        const { status, message } = responseData.data;
        if (status === 200 || 201) {
          AuthService.resetAuthValue();
          sessionStorage.clear();
          router.push("/");
          cb && cb();
        }
      }
    },
    onError: () => {
      AuthService.resetAuthValue();
      sessionStorage.clear();
      router.push("/");
      cb && cb();
    },
  });
}

export default useLogoutMutation;
