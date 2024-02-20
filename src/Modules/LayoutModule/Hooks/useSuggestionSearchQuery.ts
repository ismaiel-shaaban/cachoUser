import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { fetcher } from "src/Utils/Helpers";
import { SUGGESTION_SEARCH_RESPONSE } from "../Types/ResponseTypes";

export const GET_SUGGESTION_SEARCH_UNIQUE_KEY = (search: string) => [
  "get-suggestion-search-key",
  search,
];
const suggestionSearchList = async (
  search: string
): Promise<AxiosResponse<SUGGESTION_SEARCH_RESPONSE>> => {
  return fetcher({
    url: `app/home/get-search-suggestion?search=${search}`,
    method: "GET",
  });
};
function useSuggestionSearchQuery(search: string) {
  return useQuery(GET_SUGGESTION_SEARCH_UNIQUE_KEY(search), () =>
    suggestionSearchList(search)
  );
}
export default useSuggestionSearchQuery;
