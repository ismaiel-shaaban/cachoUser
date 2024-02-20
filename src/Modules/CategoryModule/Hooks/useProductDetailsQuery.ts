import { AxiosResponse } from "axios";
import { PRODUCT_DETAIL_RESPONSE } from "../Types/ResponseTypes";
import { fetcher } from "src/Utils/Helpers";
import { useQuery } from "react-query";

export const PRODUCT_DETAIL_QUERY_KET = (productId: string) =>
  `/app/product/get-product-detail/${productId}`;

const productDetails = (
  productId: string
): Promise<AxiosResponse<PRODUCT_DETAIL_RESPONSE>> => {
  return fetcher({
    url: `/app/product/get-product-detail/${productId}?page=1&limit=20`,
  });
};

function useProductDetailsQuery(productId: string) {
  return useQuery(
    PRODUCT_DETAIL_QUERY_KET(productId),
    () => productDetails(productId),
    {
      enabled: productId ? true : false,
    }
  );
}

export default useProductDetailsQuery;
