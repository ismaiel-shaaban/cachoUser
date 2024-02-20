import { AxiosResponse } from "axios";
import { features } from "process";
import { fetcher } from "src/Utils/Helpers";
import { useQuery } from "react-query";
import { REVIEW_LIST_RESPONSE } from "../Types/ResponseTypes";

export const GET_REVIEW_LIST_UNIQUE_KEY = (page:any) =>
  `app/review/my-review-list?limit=10&page=${page}`;

const ReviewList = (
  page: any
): Promise<AxiosResponse<REVIEW_LIST_RESPONSE>> => {
  return fetcher({
    url: `app/review/my-review-list?limit=10&page=${page}`,
  });
};

function useReviewListQuery(page: any) {
  return useQuery(GET_REVIEW_LIST_UNIQUE_KEY(page), () => ReviewList(page));
}

export default useReviewListQuery;
