import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { fetcher } from "src/Utils/Helpers";
import {
  NEAREST_BUSINESS_RESPONSE,
  REVIEW_DETAILS_RESPONSE,
} from "../Types/ResponseTypes";

export const REVIEW_DETAILS_EVENT = (token: any) => [
  `get-new-business-key`,
  token,
];
const reviewDetails = async (
  reviewId: string
): Promise<AxiosResponse<REVIEW_DETAILS_RESPONSE>> => {
  return fetcher({
    url: `app/review/detail-review/${reviewId}`,
    method: "GET",
  });
};
function useReviewDetailsQuery(reviewId: any) {
  return useQuery(
    REVIEW_DETAILS_EVENT(reviewId),
    () => reviewDetails(reviewId),
    {
      enabled: reviewId ? true : false,
    }
  );
}
export default useReviewDetailsQuery;
