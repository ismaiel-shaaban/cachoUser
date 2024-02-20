import { AxiosResponse } from "axios";
import { features } from "process";
import { fetcher } from "src/Utils/Helpers";
import { useQuery } from "react-query";
import { PRODUCT_REVIEW_LIST_RESPONSE } from "../Types/ResponseTypes";

export const GET_PRODUCT_REVIEW_UNIQUE_KEY = `product-review`;

const productReviewList = (
  productId: string
): Promise<AxiosResponse<PRODUCT_REVIEW_LIST_RESPONSE>> => {
  return fetcher({
    url: `app/review/product-review-list/${productId}`,
  });
};

function useProductReviewListQuery(productId: string) {
  return useQuery(
    GET_PRODUCT_REVIEW_UNIQUE_KEY,
    () => productReviewList(productId),
    {
      enabled: productId ? true : false,
    }
  );
}

export default useProductReviewListQuery;
