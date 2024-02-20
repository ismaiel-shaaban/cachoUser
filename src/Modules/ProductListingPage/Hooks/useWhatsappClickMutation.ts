import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { fetcher, jsonToFormData } from "../../../Utils/Helpers";
import { WHATSAPP_CLICK_RESPONSE } from "../Types/ResponseTypes";

const whatsappClick = async ({
  vendorId,
}: string | any): Promise<AxiosResponse<WHATSAPP_CLICK_RESPONSE>> => {
  return fetcher({
    url: `app/user/click-whatsapp/${vendorId}`,
    method: "GET",
  });
};

function useWhatsappClickMutation() {
  return useMutation(whatsappClick, {
    onSuccess: (responseData) => {
      // SnackbarHandler.successToast(responseData?.data?.message);
    },
  });
}

export default useWhatsappClickMutation;
