import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { fetcher } from "src/Utils/Helpers";
import {CATEGORY_LIST_RESPONSE, OFFER_LIST_RESPONSE} from "../Types/ResponseTypes";

export const GET_FEATURED_CATEGORY_LIST_UNIQUE_KEY = (
  page: number,
  search: string
) => [`get-featured-category-list-unique-key${page}/${search}`];
const featuredCategoryList = async (
  page: number,
  search: string
): Promise<AxiosResponse<OFFER_LIST_RESPONSE>> => {
  return fetcher({
    url: `/app/offers?page=${page}&limit=20&search=${search}`,
    method: "GET",
  });
};
function useHotOffersListQuery(page: number, search: string) {
  return useQuery(
    GET_FEATURED_CATEGORY_LIST_UNIQUE_KEY(page, search),
    () => featuredCategoryList(page, search),
  ).data?.data;
}
export default useHotOffersListQuery;
