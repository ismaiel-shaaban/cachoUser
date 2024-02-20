import { AxiosResponse } from "axios";
import { VENDOR_PRODUCTS_CATEGORIES_REPONSE } from "../Types/ResponseTypes";
import { features } from "process";
import { fetcher } from "src/Utils/Helpers";
import { useQuery } from "react-query";

export const VENDOR_PRODUCTS_CATEGORIES_QUERY_KEY = (vendorId: string) =>
  `vendorProducts${vendorId}`;

const vendorProducts = (
  vendorId: string
): Promise<AxiosResponse<VENDOR_PRODUCTS_CATEGORIES_REPONSE>> => {
  return fetcher({
    url: `/app/product/get-vendor-productcategories/${vendorId}?page=1&limit=20`,
  });
};

function useVendorProductsQuery(vendorId: string) {
  return useQuery(
    VENDOR_PRODUCTS_CATEGORIES_QUERY_KEY(vendorId),
    () => vendorProducts(vendorId),
    {
      enabled: vendorId ? true : false,
    }
  );
}

export default useVendorProductsQuery;
