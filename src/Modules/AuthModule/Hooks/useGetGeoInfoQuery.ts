import { useQuery } from "react-query";
import AuthService from "src/Modules/AuthModule/Services/AuthService";

function useGetGeoInfoQuery() {
  return useQuery(AuthService.queryKeys.getGeoInfo, AuthService.getGeoInfo, {
    refetchOnWindowFocus: false,
  });
}

export default useGetGeoInfoQuery;
