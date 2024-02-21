import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { fetcher } from "src/Utils/Helpers";
import {BUSINESS_TYPES_LIST_RESPONSE, CATEGORY_LIST_RESPONSE} from "../Types/ResponseTypes";

export const GET_BUSINESS_TYPES_LIST = (page:any , limit:number|string = 30) => [`get-category-list-${limit}`,page];
const categoryList = async (
  page: number,
  search: string,
  limit:number|string = 30
): Promise<AxiosResponse<BUSINESS_TYPES_LIST_RESPONSE>> => {
  return fetcher({
    url: `app/business-types?page=${page}&limit=${limit}&search=${search}`,
    method: "GET",
  });
};
function useBusinessTypeListQuery(page: number, search: string , limit:number|string = 30) {
  return useQuery(GET_BUSINESS_TYPES_LIST(page, limit), () => categoryList(page, search, limit), {
  }).data?.data;
}
export default useBusinessTypeListQuery;
