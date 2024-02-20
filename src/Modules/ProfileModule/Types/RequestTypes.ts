export type EDIT_PROFILE_REQUEST = {
  phoneNumber: string;
  countryCode: string;
  name: string;
  email: string;
  pic: File | any;
};
export type EDIT_PROFILE_PHONE_VERIFY_REQUEST = {
  phoneNumber: string;
  countryCode: string;
  countryName?: string;
  otp: string;
};
export type RESEND_OTP_REQUEST = {
  phoneNumber: string;
  countryCode: string;
};
