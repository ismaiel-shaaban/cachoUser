import { BehaviorSubject } from "rxjs";
import { AUTH_STATE } from "../Types/CommonTypes";
import PersistStorage from "src/Utils/PersistStorage";
import { fetcher } from "src/Utils/Helpers";
import { AxiosResponse } from "axios";

class AuthService {
  queryKeys = {
    getGeoInfo: "getGeoInfo",
  };
  authState$;
  initialAuthState = {
    loggedIn: false,
    user: undefined,
    token: "",
    latitude:undefined,
    longitude:undefined,
    location:undefined,
    language: "en"  
  };

  constructor() {
    this.authState$ = new BehaviorSubject<AUTH_STATE>(this.initialAuthState);
    const persistStorage = new PersistStorage("authState", this.authState$);
    persistStorage.init();
  }

  getGeoInfo = async (): Promise<AxiosResponse<any>> => {
    return fetcher({
      url: "https://ipapi.co/json/",
    });
  };

  resetAuthValue = () => {
    setTimeout(() => {
      this.authState$.next(this.initialAuthState);
      localStorage.clear();
    }, 500);
  };
}

export default new AuthService();
