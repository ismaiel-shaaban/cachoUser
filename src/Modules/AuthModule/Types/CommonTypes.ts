import { USER_RESPONSE } from "./ResponseTypes";

export type AUTH_STATE = {
  loggedIn: boolean;
  user: USER_RESPONSE|any;
  token: string;
  latitude: any;
  longitude: any;
  location: string | undefined;
  language: string;
};

export type PRODUCT_SLIDER = {
  original: string;
  thumbnail: string;
};
