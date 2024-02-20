import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { fetcher } from "src/Utils/Helpers";
import { NEAREST_BUSINESS_RESPONSE } from "../Types/ResponseTypes";

export const GET_NEW_BUSINESS_KEY = (token: any) => [
  `get-new-business-key`,
  token,
];
const newBusiness = async (
  page: number,
  token: string
): Promise<AxiosResponse<NEAREST_BUSINESS_RESPONSE>> => {
  return fetcher({
    url: `app/home/get-new-business-list?page=${page}&limit=50`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
function useNewBusinessQuery(page: number, token: string) {
  return useQuery(GET_NEW_BUSINESS_KEY(token), () => newBusiness(page, token));
}
export default useNewBusinessQuery;
