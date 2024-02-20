import { fetcherUrl } from "../../../Utils/Helpers";
import { useMutation } from "react-query";
import { CREATE_DYNAMIC_LINK_FOR_RATING_REQUEST } from "../Types/RequestTypes";
const createDynamicLinkForRating = (
  data: CREATE_DYNAMIC_LINK_FOR_RATING_REQUEST
) => {
  return fetcherUrl({
    url: `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyB8HW_FxECsM08ICkndNfaxQ_YstrvSzwg`,
    method: "POST",
    data: data,
  });
};

function useCreateDynamicLinkForRatingMutation() {
  return useMutation(createDynamicLinkForRating);
}
export default useCreateDynamicLinkForRatingMutation;
