import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { fetcher } from "../../../Utils/Helpers";
import { REPORT_CHAT_AND_USER_REQUEST } from "../Types/RequestTypes";
import { REPORT_CHAT_AND_USER_RESPONSE } from "../Types/ResponseTypes";

const reportChatAndUser = async (
  data: REPORT_CHAT_AND_USER_REQUEST
): Promise<AxiosResponse<REPORT_CHAT_AND_USER_RESPONSE>> => {
  return fetcher({
    url: "/chat/report",
    method: "POST",
    data: data,
  });
};

function useReportChatAndUserMutation() {
  return useMutation(reportChatAndUser);
}

export default useReportChatAndUserMutation;
