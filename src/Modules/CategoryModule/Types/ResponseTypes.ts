export type SUB_CATEGORY_ITEMS = {
  isCompleted: boolean;
  _id: string;
  name: string;
  arName: string;
  image: string;
  isActive: boolean;
  productSold: number;
  totalProducts: number;
  parentId: { _id: string; name: string };
  parentIds: Array<string>;
  children: Array<string>;
  isAttributeAdded: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SUB_CATEGORY_RESPONSE = {
  status: number;
  statusText: string;
  message: string;
  data: {
    list: Array<SUB_CATEGORY_ITEMS>;
    count: number;
    page: number;
    limit: number;
    execTime: number;
  };
};

export type PRODUCT_ITEMS = {
  _id: string;
  vendorId: string;
  name: string;
  arName: string;
  photos: Array<string>;
  videos: Array<string>;
  description: string;
  price: number;
  discountPercent: number;
  gender: string;
  searchKeywords: Array<string>;
  isDeleted: boolean;
  isActive: boolean;
  isCompleted: boolean;
  attributesIds: Array<string>;
  productAttributeValueIds: Array<string>;
  attributeValuesIds: Array<string>;
  createdAt: string;
  updatedAt: string;
  __v: number;
  categoryId: string;
  categoryName: string;
  productcategoryId: string;
  productcategoryName: string;
  productcategorySlug: string;
  subcategoryId: string;
  subcategoryName: string;
  subcategorySlug: string;
};

export type PRODUCT_VENDOR_RESPONSE = {
  _id: string;
  vendorId: {
    businessName: string;
    _id: string;
  };
  name: string;
  phoneNumber: string;
  email: string;
  url: string;
  address: string;
  description: string;
  openingTiming: string;
  logo: string;
  isActive: boolean;
  isAdminVerify: boolean;
  geolocation: {
    type: string;
    coordinates: Array<number>;
  };
  timestamps: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type PRODUCT_LIST_ITEMS = {
  _id: string;
  vendorId: string;
  name: string;
  arName: string;
  description: string;
  price: number;
  isDeleted: false;
  isActive: true;
  categoryId: string;
  productcategoryId: string;
  subcategoryId: string;
  photos: string;
  products: PRODUCT_ITEMS;
  vendor: PRODUCT_VENDOR_RESPONSE;
};

export type PRODUCT_LIST_RESPONSE = {
  status: number;
  statusText: string;
  message: string;
  data: {
    list: Array<PRODUCT_LIST_ITEMS>;
    count: number;
    page: number;
    limit: number;
    execTime: number;
  };
};

export type PRODUCT_ATTRIBUTES = {
  _id: string;
  name: number;
  attributeId: string;
  attributeName: string;
  createdAt: string;
  updatedAt: string;
};

export type PRODUCTS_VENDOR_RESPONSE = {
  _id: string;
  vendorId: string;
  name: string;
  phoneNumber: number;
  email: string;
  type: string;
  url: string;
  address: string;
  description: string;
  workingDays: Array<any>;
  whatsappLink: string;
  whatsappClick: number;
  openingTiming: string;
  logo: string;
  video: string;
  isActive: boolean;
  isAdminVerify: boolean;
  geolocation: {
    type: string;
    coordinates: Array<string>;
  };
  timestamps: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type PRODUCT_DETAILS_ITEMS = {
  _id: string;
  vendorId: string;
  name: string;
  arName: string;
  photos: Array<string>;
  description: string;
  price: number;
  discountPercent: number;
  gender: string;
  searchKeywords: Array<string>;
  isDeleted: boolean;
  isActive: boolean;
  isCompleted: boolean;
  completionStep: boolean;
  attributesIds: Array<string>;
  productAttributeValueIds: Array<string>;
  attributeValuesIds: Array<string>;
  createdAt: string;
  updatedAt: string;
  __v: number;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  productcategoryId: string;
  productcategoryName: string;
  productcategorySlug: string;
  subcategoryId: string;
  subcategoryName: string;
  subcategorySlug: string;
  vendor: PRODUCTS_VENDOR_RESPONSE;
};

export type PRODUCT_DETAILS_DATA_RESPONSE = {
  productData: PRODUCT_DETAILS_ITEMS;
  productAttributes: {
    list: Array<PRODUCT_ATTRIBUTES>;
    count: number;
    page: number;
    limit: number;
  };
  execTime: number;
};

export type PRODUCT_DETAIL_RESPONSE = {
  status: number;
  statusText: string;
  message: string;
  data: PRODUCT_DETAILS_DATA_RESPONSE;
};

export type VENDOR_PRODUCTS_ITEMS = {
  _id: string;
  name: string;
  arName: string;
};

export type VENDOR_PRODUCTS_CATEGORIES_REPONSE = {
  status: number;
  statusText: string;
  message: string;
  data: {
    list: Array<VENDOR_PRODUCTS_ITEMS>;
    count: number;
    page: number;
    limit: number;
    execTime: number;
  };
};
