export type LOGIN_REQUEST = {
  phoneNumber: string;
  countryCode: string;
  countryName?: string;
  otp?: string;
};
export type LOCATION_UPDATE_REQUEST = {
  latitude: number;
  longitude: number;
};
