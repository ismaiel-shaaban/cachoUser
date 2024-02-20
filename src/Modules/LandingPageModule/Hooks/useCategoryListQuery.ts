import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { fetcher } from "src/Utils/Helpers";
import { CATEGORY_LIST_RESPONSE } from "../Types/ResponseTypes";

export const GET_CATEGORY_LIST = (page:any) => [`get-category-list`,page];
const categoryList = async (
  page: number,
  search: string
): Promise<AxiosResponse<CATEGORY_LIST_RESPONSE>> => {
  return fetcher({
    url: `app/home/get-all-category?page=${page}&limit=10&search=${search}`,
    method: "GET",
  });
};
function useCategoryListQuery(page: number, search: string) {
  return useQuery(GET_CATEGORY_LIST(page), () => categoryList(page, search), {
  });
}
export default useCategoryListQuery;
