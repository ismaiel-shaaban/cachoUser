import { AxiosResponse } from "axios";
import { SUB_CATEGORY_RESPONSE } from "../Types/ResponseTypes";
import { fetcher } from "src/Utils/Helpers";
import { useQuery } from "react-query";

export const SUB_CATEGORY_QUERY_KEY = (page: number, id: string) =>
  `subCategory${page}/${id}`;

export const subCategory = (
  page: number,
  id: string
): Promise<AxiosResponse<SUB_CATEGORY_RESPONSE>> => {
  return fetcher({
    url: `/app/home/get-sub-categories?page=${page}&limit=10&id=${id}`,
  });
};

function useSubCategoryQuery(page: number, id: string) {
  return useQuery(
    SUB_CATEGORY_QUERY_KEY(page, id),
    () => subCategory(page, id),
    {
      enabled: id ? true : false,
    }
  );
}

export default useSubCategoryQuery;
