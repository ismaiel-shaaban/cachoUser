import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { fetcher } from "src/Utils/Helpers";
import { NEAREST_BUSINESS_RESPONSE } from "../Types/ResponseTypes";

export const GET_NEAREST_BUSINESS_KEY = () => [`get-nearest-business-key`];
const nearestBusiness = async (
  page: number,
  search: string,
  lat: number,
  lng: number
): Promise<AxiosResponse<NEAREST_BUSINESS_RESPONSE>> => {
  return fetcher({
    url: `app/home/get-nearest-businesses?page=${page}&limit=5&search=${search}&lat=${lat}&lng=${lng}`,
    method: "GET",
  });
};
function useNearestBusinessQuery(
  page: number,
  search: string,
  lat: number,
  lng: number
) {
  return useQuery(
    GET_NEAREST_BUSINESS_KEY(),
    () => nearestBusiness(page, search, lat, lng),
    {
      enabled: lat & lng ? true : false,
    }
  );
}
export default useNearestBusinessQuery;
