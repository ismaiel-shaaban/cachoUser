import { AxiosResponse } from "axios";
import { features } from "process";
import { fetcher } from "src/Utils/Helpers";
import { useQuery } from "react-query";
import { VENDOR_OFFERS_RESPONSE } from "../Types/ResponseTypes";

export const GET_VENDOR_PRODUCT_OFFERS_UNIQUE_KEY = (vendorId:any, page:number) =>
  `app/offer/vendor-offered-product-list/${vendorId}?page=${page}&limit=10`;

const vendorOffersList = (
  vendorId: any,
  page: number
): Promise<AxiosResponse<VENDOR_OFFERS_RESPONSE>> => {
  return fetcher({
    url: `app/offer/vendor-offered-product-list/${vendorId}?page=${page}&limit=10`,
    method: "GET",
  });
};

function useVendorOffersQuery(vendorId: any,page:number) {
  return useQuery(
    GET_VENDOR_PRODUCT_OFFERS_UNIQUE_KEY(vendorId, page),
    () => vendorOffersList(vendorId, page),
    {
      enabled: vendorId ? true : false,
    }
  );
}

export default useVendorOffersQuery;
