import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { RATING_AND_REVIEW_LIST_RESPONSE } from "../Types/ResponseTypes";
import { fetcher } from "src/Utils/Helpers";
export const RATING_AND_REVIEWS_LIST_KEY = (page: any, vendorId: any) =>
  `app/review/vendor-review-list/${vendorId}?limit=10&page=${page}`;
const ratingAndReviewsList = async (
  page: any,
  vendorId: any
): Promise<AxiosResponse<RATING_AND_REVIEW_LIST_RESPONSE>> => {
  return fetcher({
    url: `app/review/vendor-review-list/${vendorId}?limit=10&page=${page}`,
    method: "GET",
  });
};
function useGetVendorReviewAndRatingList(page: any, vendorId: any) {
  return useQuery(RATING_AND_REVIEWS_LIST_KEY(page, vendorId), () =>
    ratingAndReviewsList(page, vendorId)
  );
}
export default useGetVendorReviewAndRatingList;
