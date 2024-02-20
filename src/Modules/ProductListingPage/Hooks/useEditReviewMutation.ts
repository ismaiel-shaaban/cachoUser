import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { fetcher, jsonToFormData } from "../../../Utils/Helpers";
import {
  ADD_REVIEW_RESPONSE_TYPE,
  EDIT_REVIEW_LIST_RESPONSE,
  WHATSAPP_CLICK_RESPONSE,
} from "../Types/ResponseTypes";
import { ADD_REVIEW_REQUEST_TYPE, EDIT_REVIEW_REQUEST } from "../Types/RequestTypes";

const editReview = async (
 data:EDIT_REVIEW_REQUEST
): Promise<AxiosResponse<EDIT_REVIEW_LIST_RESPONSE>> => {
  const reviewData={
    review:data?.review,
    stars:data?.stars
  }
  return fetcher({
    url: `app/review/edit-review/${data?.reviewId}`,
    method: "PATCH",
    data:reviewData
  });
};

function useEditReviewMutation() {
  return useMutation(editReview);
}

export default useEditReviewMutation;
