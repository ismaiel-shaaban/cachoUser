import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { fetcher, jsonToFormData } from "../../../Utils/Helpers";
import {
  ADD_REVIEW_RESPONSE_TYPE,
  WHATSAPP_CLICK_RESPONSE,
} from "../Types/ResponseTypes";
import { ADD_REVIEW_REQUEST_TYPE } from "../Types/RequestTypes";

const addReview = async (
  data: ADD_REVIEW_REQUEST_TYPE
): Promise<AxiosResponse<ADD_REVIEW_RESPONSE_TYPE>> => {
  return fetcher({
    url: `app/review/add-review`,
    method: "POST",
    data,
  });
};

function useAddReviewMutation() {
  return useMutation(addReview);
}

export default useAddReviewMutation;
