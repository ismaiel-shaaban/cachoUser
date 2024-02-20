import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { fetcher, jsonToFormData } from "../../../Utils/Helpers";
import {
  ADD_REVIEW_RESPONSE_TYPE,
  DELETE_REVIEW_LIST_RESPONSE,
  EDIT_REVIEW_LIST_RESPONSE,
  WHATSAPP_CLICK_RESPONSE,
} from "../Types/ResponseTypes";
import { ADD_REVIEW_REQUEST_TYPE } from "../Types/RequestTypes";

const deleteReview = async (
  reviewId: any
): Promise<AxiosResponse<DELETE_REVIEW_LIST_RESPONSE>> => {
  return fetcher({
    url: `app/review/delete-review/${reviewId?.reviewId}`,
    method: "DELETE",
  });
};

function useDeleteReviewMutation() {
  return useMutation(deleteReview);
}

export default useDeleteReviewMutation;
