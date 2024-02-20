import { PRODUCTS_VENDOR_RESPONSE } from "src/Modules/CategoryModule/Types/ResponseTypes";

export type VENDOR_OFFERS_LIST = {
  _id: string;
  vendorId: string;
  offerId: {
    _id: string;
    vendorId: string;
    name: string;
    discount: number;
    start: string;
    end: string;
    isActive: boolean;
    products: Array<string>;
    timestamps: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  productId: {
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
    isActive: boolean;
    isCompleted: boolean;
    completionStep: number;
    attributesIds: Array<string>;
    productAttributeValueIds: Array<string>;
    attributeValuesIds: Array<string>;
    createdAt: string;
    updatedAt: string;
    __v: number;
    unit: string;
    categoryId: string;
    categoryName: string;
    categorySlug: string;
    productcategoryId: string;
    productcategoryName: string;
    productcategorySlug: string;
    subcategoryId: string;
    subcategoryName: string;
    subcategorySlug: string;
  };
  start: string;
  end: string;
  timestamps: string;
  createdAt: string;
  updatedAt: string;
};
export type VENDOR_OFFERS_RESPONSE={
    status: number;
    statusText: string;
    message:string;
    data: {
        list: Array<VENDOR_OFFERS_LIST>;
        count: number;
        page: number;
        limit: number;
    }
}
export type VENDOR_BUSINESS_DETAILS={
  status: number;
  statusText: string;
  message:string;
  data:PRODUCTS_VENDOR_RESPONSE
}