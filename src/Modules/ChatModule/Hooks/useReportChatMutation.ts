import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { fetcher, jsonToFormData } from "../../../Utils/Helpers";
import { CHAT_REPORT_REQUEST } from "../Types/RequestTypes";
import { CHAT_REPORT_RESPONSE } from "../Types/ResponseTypes";

const addReport = async (
  data: CHAT_REPORT_REQUEST
): Promise<AxiosResponse<CHAT_REPORT_RESPONSE>> => {
  return fetcher({
    url: `/chat/report`,
    method: "POST",
    data,
  });
};

function useReportChatMutation() {
  return useMutation(addReport);
}

export default useReportChatMutation;
