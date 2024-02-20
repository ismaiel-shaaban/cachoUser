export type USER_PROFILE_DATA = {
  countryCode: string;
  createdAt: string;
  email: string;
  isActive: boolean;
  isPhoneVerify: boolean;
  isSignUp: boolean;
  name: string;
  otp: string;
  phoneNumber: string;
  pic: string;
  timestamps: string;
  updatedAt: string;
  __v: number;
  _id: string;
};
export type USER_PROFILE_RESPONSE = {
  status: number;
  statusText: string;
  message: string;
  data: USER_PROFILE_DATA;
};
export type EDIT_PROFILE_DATA = {
  _id: string;
  countryCode: string;
  phoneNumber: string;
  isPhoneVerify: boolean;
  isProfileCompleted: boolean;
  isActive: boolean;
  isSignUp: boolean;
  timestamps: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  otp?: null;
  name: string;
  pic: string;
  email: string;
};
export type EDIT_PROFILE_RESPONSE = {
  status: number;
  statusText: string;
  message: string;
  data: EDIT_PROFILE_DATA;
};
export type EDIT_PROFILE_PHONE_VERIFY_USER_DATA = {
  _id: string;
  countryCode: string;
  phoneNumber: string;
  isPhoneVerify: boolean;
  isActive: boolean;
  isSignUp: boolean;
  timestamps: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  otp: null;
  name: string;
  pic: string;
  otpExpiryTime: null;
};
export type EDIT_PROFILE_PHONE_VERIFY_RESPONSE = {
  status: number;
  statusText: string;
  message: string;
  data: {
    user: EDIT_PROFILE_PHONE_VERIFY_USER_DATA;
    execTime: number;
  };
};
export type RESEND_OTP_RESPONSE = {
  status: number;
  statusText: string;
  message: string;
  data: {
    user: {
      _id: string;
      countryCode: string;
      phoneNumber: string;
      isPhoneVerify: boolean;
      isActive: boolean;
      timestamps: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    execTime: number;
  };
};
