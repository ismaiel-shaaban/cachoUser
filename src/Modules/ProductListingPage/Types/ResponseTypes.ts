export type WHATSAPP_CLICK_RESPONSE = {
  status: number;
  statusText: string;
  message: string;
  data: {
    execTime: number;
  };
};
export type ADD_REVIEW_LIST_DATA = {
  _id: string;
  vendorId: string;
  businessId: string;
  userId: {
    _id: string;
    name: string;
  };
  productId: {
    _id: string;
    name: string;
  };
  stars: number;
  review: string;
  createdAt: string;
  updatedAt: string;
};
export type ADD_REVIEW_RESPONSE_TYPE = {
  status: number;
  statusText: string;
  message: string;
  data: {
    list: Array<ADD_REVIEW_LIST_DATA>;
    count: number;
    page: number;
    limit: number;
    execTime: number;
  };
};
export type PRODUCT_REVIEW_LIST_DATA = {
  _id: string;
  vendorId: string;
  businessId: string;
  userId: {
    _id: string;
    name: string;
    pic: string;
  };
  productId: {
    _id: string;
    name: string;
  };
  stars: number;
  review: string;
  createdAt: string;
  updatedAt: string;
};
export type PRODUCT_REVIEW_LIST_RESPONSE = {
  status: number;
  statusText: string;
  message: string;
  data: {
    list: Array<PRODUCT_REVIEW_LIST_DATA>;
    count: number;
    page: number;
    limit: number;
    execTime: number;
  };
};
export type EDIT_REVIEW_LIST_RESPONSE = {
  status: number;
  statusText: string;
  message: string;
  data: {
    execTime: number;
  };
};
export type DELETE_REVIEW_LIST_RESPONSE = {
  status: number;
  statusText: string;
  message: string;
  data: {
    execTime: number;
  };
};
export type VENDOR_PRODUCT_REVIEW_LIST = {
  _id: string;
  name: string;
};
export type VENDOR_PRODUCT_REVIEW_RESPONSE = {
  status: number;
  statusText: string;
  message: string;
  data: {
    list: Array<VENDOR_PRODUCT_REVIEW_LIST>;
    count: number;
    page: number;
    limit: number;
    execTime: number;
  };
};
export type FILTER_PRODUCT_LIST = {
  _id: string;
  products: {
    _id: string;
    vendorId: string;
    name: string;
    description: string;
    price: number;
    isDeleted: boolean;
    isActive: boolean;
    categoryId: string;
    productcategoryId: string;
    subcategoryId: string;
    photos: string;
  };
  vendor: {
    _id: string;
    vendorId: string;
    name: string;
    address: string;
    logo: string;
  };
};
export type FILTER_PRODUCT_RESPONSE = {
  status: number;
  statusText: string;
  message: string;
  data: {
    list: Array<FILTER_PRODUCT_LIST>;
    count: number;
    page: number;
    limit: number;
    execTime: number;
  };
};
export type RATING_AND_REVIEW_LIST_RESPONSE_ITEMS = {
  _id: string;
  vendorId: string;
  businessId: string;
  userId: {
    _id: string;
    name: string;
  };
  productId: {
    _id: string;
    name: string;
  };
  stars: number;
  review: string;
  createdAt: string;
  updatedAt: string;
};
export type RATING_AND_REVIEW_LIST_RESPONSE = {
  status: number;
  statusText: string;
  message: string;
  data: {
    list: Array<RATING_AND_REVIEW_LIST_RESPONSE_ITEMS>;
    page: number;
    limit: number;
    count: number;
  };
};
