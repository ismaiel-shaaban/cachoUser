import axios, { AxiosRequestConfig } from "axios";
import router, { NextRouter } from "next/router";
import SnackbarHandler from "./SnackbarHandler";
//@ts-ignore
import sc from "states-cities-db";
import useAuthValue, {
  getAuthValue,
  resetAuthValue,
  setAuthValue,
} from "src/Modules/AuthModule/Hooks/useAuthValue";
import moment from "moment";
import uuid from "react-uuid";

export const COUNTRIES = sc.getCountries();
// const { loggedIn } = useAuthValue();
export const countryOptions = COUNTRIES.map(({ name, prefix }: any) => ({
  label: prefix + " - " + name,
  value: prefix,
}));

export const fetcher = (config: AxiosRequestConfig) => {
  const { url, method = "GET", data, headers } = config;
  const { token, language } = getAuthValue();

  return axios.request({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    url,
    method,
    data,
    headers: {
      Authorization: `Bearer ${token ?? ""}`,
      "Accept-Language": language,
      ...headers,
    },
    ...config,
  });
};

export const FILE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export const onError = (error: any) => {
  if (error?.response) {
    console.log({ error: error?.response });
    if (error?.response?.status === 401) {
      // AuthService.resetAuthValue();
    }
    if (
      error?.response?.data?.message &&
      error?.response?.data?.message !== "jwt invalid token"
    ) {
      SnackbarHandler.errorToast(error?.response?.data?.message);
    }
  } else {
    console.log({ error });
  }
};

export const jsonToFormData = (data: any) => {
  const formData = new FormData();
  for (let key in data) {
    if (data[key] !== null && data[key] !== undefined) {
      if (Array.isArray(data[key])) {
        data[key].forEach((element: any) => {
          formData.append(key, element);
        });
      } else {
        formData.append(key, data[key]);
      }
    }
  }
  return formData;
};

export const getBase64 = (
  file: File,
  cb: (base64: string | ArrayBuffer | null) => void
) => {
  if (typeof window !== "undefined") {
    let reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }
};

export const fetcherUrl = (config: AxiosRequestConfig) => {
  const { url, method = "GET", data } = config;

  return axios.request({
    url,
    method,
    data,
    ...config,
  });
};
export const getUniqueId = () => {
  const deviceId = localStorage.getItem("deviceId");
  if (deviceId) {
    return deviceId;
  }

  const newDeviceId = uuid();
  localStorage.setItem("deviceId", newDeviceId);

  return newDeviceId;
};
export const filterUrlData = (
  router: NextRouter,
  routeName: string,
  keyName: string,
  value: any
) => {
  const data: any = router?.query;
  if (value === "") {
    delete data[keyName];
  } else {
    data[keyName] = value;
  }
  const query = new URLSearchParams(data).toString();
  router.push(`${routeName}?${query}`);
};
export const filterUrlDataWithParamsId = (
  router: NextRouter,
  paramId: string,
  keyName: string,
  value: any
) => {
  const data: any = router?.query;
  if (value === "") {
    delete data[keyName];
  } else {
    data[keyName] = value;
  }
  const query = new URLSearchParams(data).toString();
  router.push(`${paramId}?${query}`);
};
//----------------for socket-----------------//

export const getNextPageParam = (lastPage: any) => {
  const { count, limit, page } = lastPage.data.data;
  const totalPages = Math.ceil(count / limit);
  return totalPages > page ? page + 1 : undefined;
};

export const combineStringIds = (id1: string, id2: string) => {
  return `${id1}${id2}`
    .split("")
    .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
    .join("");
};

export function capitalizeFirstLetter(address: string | undefined) {
  if (typeof address !== "string" || address.length === 0) {
    return address;
  }

  const firstLetter = address.charAt(0).toUpperCase();
  const remainingLetters = address.slice(1);

  return firstLetter + remainingLetters;
}
export const convertFirstLetterToUpperCaseWithSpace = (item: any) => {
  let splitItem = item?.split(" ");
  for (let i = 0; i < splitItem?.length; i++) {
    splitItem[i] =
      splitItem[i].charAt(0).toUpperCase() +
      splitItem[i].substring(1).toLowerCase();
  }
  return splitItem?.join(" ");
};
export const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_MAP_API_KEY;
export const getCurrentLocation = (loggedIn?: any) => {
  const {  language } = getAuthValue();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const userLocation = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${GOOGLE_API_KEY}&language=${language}`
      );
      const location: Array<string> =
        userLocation?.data?.results[0]?.address_components.filter((ele: any) => ele.types.includes("political"))
        .map((el: any) => el.long_name);       ;
      const current_location = location?.slice(0, 8)?.join(',').toString();
      (async () => {
        if (current_location && loggedIn) {
          fetcher({
            url: "app/user/updateLocation",
            method: "PATCH",
            data: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          })
            .then((response) => {
              const { status } = response;
              if (status === 200 || 201) {
                setAuthValue({
                  ...getAuthValue(),
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  location: current_location,
                });
              }
            })
            .catch((errorResponse) => {
              const { status } = errorResponse?.response;
              if (status === 500) {
                resetAuthValue();
                sessionStorage.clear();
                router.push("/");
              }
            });
        } else {
          setAuthValue({
            ...getAuthValue(),
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            location: current_location,
          });
        }
      })();
    });
  } else {
    SnackbarHandler.errorToast("Please enable location permission");
  }
};
export const inOrderDays = (arr: Array<string>) => {
  const list = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (arr ?? []).length > 0
    ? list.filter((each) => (arr ?? []).includes(each))
    : [];
};

export const momentTranslate = (timeStamp: string) => {
  const { language } = getAuthValue();
  language ? moment.locale(language) : moment.locale("fr");
  return moment(timeStamp).fromNow();
};
export const customQueryData = (item: any) => {
  let queryData = "";
  for (const key in item) {
    if (!item[key] || item[key] === "undefined") {
      delete item[key];
    } else {
      queryData += `&${key}=${item[key]}`;
    }
  }
  return queryData;
};
export const dataLangTranslation = (enData: any, arData: any) => {
  const { language } = getAuthValue();
  if (language === "ar") {
    return arData;
  } else {
    return enData;
  }
};
