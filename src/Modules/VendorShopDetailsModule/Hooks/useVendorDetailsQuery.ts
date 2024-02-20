import { AxiosResponse } from "axios";
import { features } from "process";
import { fetcher } from "src/Utils/Helpers";
import { useQuery } from "react-query";
import { VENDOR_BUSINESS_DETAILS, VENDOR_OFFERS_RESPONSE } from "../Types/ResponseTypes";

export const GET_VENDOR_PRODUCT_DETAILS_UNIQUE_KEY = (vendorId:any) =>
  `app/home/get-vendor-business-detail/${vendorId}`;

const vendorDetails = (
  vendorId: any
): Promise<AxiosResponse<VENDOR_BUSINESS_DETAILS>> => {
  return fetcher({
    url: `app/home/get-vendor-business-detail/${vendorId}`,
    method: "GET",
  });
};

function useVendorDetailsQuery(vendorId: any) {
  return useQuery(
    GET_VENDOR_PRODUCT_DETAILS_UNIQUE_KEY(vendorId),
    () => vendorDetails(vendorId),
    {
      enabled: vendorId ? true : false,
    }
  );
}

export default useVendorDetailsQuery;
