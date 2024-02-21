import { AxiosResponse } from "axios";
import { fetcher } from "src/Utils/Helpers";
import { useQuery } from "react-query";
import {BUSINESS_LIST_RESPONSE} from "../../BusinessModule/Type/ResponseTypes";

export const BUSINESSES_QUERY_KEY = (page: number, id: string) =>
  `business-type-${id}-business-page-${page}`;
export const businesses = (
    page: number,
    id: string,
    limit: number|string = 20,
): Promise<AxiosResponse<BUSINESS_LIST_RESPONSE>> => {
  return fetcher({
    url: `/app/business-types/${id}/businesses?page=${page}&limit=${limit}`,
  });
};

function useBusinessesQuery(page: number, id: string , limit: number|string = 20,) {
  return useQuery(
      BUSINESSES_QUERY_KEY(page, id),
    () => businesses(page, id , limit),
    {
      enabled: id.length > 0 ,
    }
  ).data?.data;
}

export default useBusinessesQuery;
