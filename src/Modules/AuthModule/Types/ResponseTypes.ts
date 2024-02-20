export type USER_RESPONSE = {
  countryCode: string;
  phoneNumber: string;
  isPhoneVerify: boolean;
  isActive: boolean;
  timestamps: string;
  isProfileCompleted: boolean;
  _id: string;
  notification?: boolean;
  createdAt: string;
  pic: string;
  name: string;
  email: string;
  updatedAt: string;
  __v: number;
  otp?: null;
  otpExpiryTime?: null;
};
export type LOGIN_RESPONSE = {
  status: number;
  statusText: string;
  message: string;
  data: {
    isSignUp: boolean;
    user: USER_RESPONSE;
    execTime: number;
    token?: string;
  };
};
