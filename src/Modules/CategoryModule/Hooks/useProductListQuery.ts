import { AxiosResponse } from "axios";
import { customQueryData, fetcher } from "src/Utils/Helpers";
import { PRODUCT_LIST_RESPONSE } from "../Types/ResponseTypes";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";

export const PRODUCT_LIST_QUERY_KEY = (queryData: any, page: any) =>
  `/app/home/get-search-result?page=${page ? page : 1}&limit=10${queryData}`;

const productList = (
  queryData: any,
  page: any
): Promise<AxiosResponse<PRODUCT_LIST_RESPONSE>> => {
  return fetcher({
    url: `/app/home/get-search-result?page=${
      page ? page : 1
    }&limit=10${queryData}`,
  });
};

function useProductListQuery(
  subCategoryId?: string,
  productCategoryId?: string,
  selectedvendorId?: any
) {
  const router = useRouter();
  const { latitude, longitude } = useAuthValue();
  const {
    search,
    price,
    gender,
    distance,
    ratingRange,
    productSort,
    vendorId,
    page,
  }: any = router?.query;
  const sortingData = productSort?.split("?")[0];
  const popularitySort =
    sortingData === "popularitySort" ? productSort?.split("?")[1] : null;
  const priceSort =
    sortingData === "priceSort" ? productSort?.split("?")[1] : null;
  const newestSort =
    sortingData === "newestSort" ? productSort?.split("?")[1] : null;
  const queryData = customQueryData({
    search: search,
    subCategoryId: subCategoryId,
    productCategoryId: productCategoryId,
    gender: gender,
    startPrice: price ? JSON.parse(price)?.min : undefined,
    endPrice: price ? JSON.parse(price)?.max : undefined,
    distance: distance,
    ratingRange: ratingRange,
    popularitySort: popularitySort,
    latitude: latitude,
    longitude: longitude,
    newestSort: newestSort,
    priceSort: priceSort,
    vendorId: vendorId ? vendorId : selectedvendorId,
  });
  return useQuery(
    PRODUCT_LIST_QUERY_KEY(queryData, page),
    () => productList(queryData, page),
    {
      enabled: subCategoryId || productCategoryId || search ? true : false,
    }
  );
}

export default useProductListQuery;
