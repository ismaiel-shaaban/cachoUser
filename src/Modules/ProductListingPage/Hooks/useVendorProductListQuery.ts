import { AxiosResponse } from "axios";
import { features } from "process";
import { fetcher } from "src/Utils/Helpers";
import { useQuery } from "react-query";
import {
  PRODUCT_REVIEW_LIST_RESPONSE,
  VENDOR_PRODUCT_REVIEW_RESPONSE,
} from "../Types/ResponseTypes";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";

export const GET_VENDOR_PRODUCT_LIST_UNIQUE_KEY = `vendor-product-list`;

const productReviewList = (
  vendorId: string
): Promise<AxiosResponse<VENDOR_PRODUCT_REVIEW_RESPONSE>> => {
  return fetcher({
    url: `app/review/vendor-products-list/${vendorId}?page=1&limit=500`,
    method: "GET",
  });
};

function useVendorProductListQuery(vendorId: string) {
  const { loggedIn } = useAuthValue();
  return useQuery(
    GET_VENDOR_PRODUCT_LIST_UNIQUE_KEY,
    () => productReviewList(vendorId),
    {
      enabled: vendorId && loggedIn ? true : false,
    }
  );
}

export default useVendorProductListQuery;
