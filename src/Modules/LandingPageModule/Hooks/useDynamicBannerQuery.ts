import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { fetcher } from "src/Utils/Helpers";
import { CATEGORY_LIST_RESPONSE } from "../Types/ResponseTypes";

export const GET_DYANMIC_BANNER = `GET_DYANMIC_BANNER`;
const dynamicBanner = async (): Promise<
  AxiosResponse<any>
> => {
  return fetcher({
    url: `app/banner/banner-list`,
    method: "GET",
  });
};
function useDynamicBannerQuery() {
  return useQuery(GET_DYANMIC_BANNER, dynamicBanner);
}
export default useDynamicBannerQuery;
