import {OfferModel} from "../../../Models/offer.model";
import {BusinessTypeModel} from "../../../Models/businessType.model";
import {BASE_LIST_RESPONSE, BASE_RESPONSE} from "../../Common/Types/ResponseTypes";


export type CATEGORY_LIST_DATA = {
    _id: string;
    name: string;
    arName: string;
    image: null;
    subCategoryCount: number;
    isActive: boolean;
    timestamps: string;
    createdAt: string;
    updatedAt: string;
};
export type CATEGORY_LIST_RESPONSE = {
    status: number;
    statusText: string;
    message: string;
    data: {
        list: Array<CATEGORY_LIST_DATA>;
        count: number;
        page: number;
        limit: number;
        execTime: number;
    };
};

export type NEAREST_BUSINESS_DATA = {
    _id: string;
    vendorId: string;
    name: string;
    phoneNumber: string;
    email: string;
    url: string;
    address: string;
    description: string;
    openingTiming: string;
    logo: string;
    avgRating: string;
    isActive: boolean;
    isAdminVerify: boolean;
    geolocation: {
        type: string;
        coordinates: Array<number>;
    };
    type: string;
    timestamps: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    string: number;
};
export type NEAREST_BUSINESS_RESPONSE = {
    status: number;
    statusText: string;
    message: string;
    data: {
        list: Array<NEAREST_BUSINESS_DATA>;
        count: number;
        page: number;
        limit: number;
        execTime: number;
    };
};
export type NEW_BUSINESS_DATA = {
    geolocation: {
        coordinates: Array<Array<number>>;
    };
    _id: string;
    vendorId: string;
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
    timestamps: string;
    createdAt: string;
    updatedAt: string;
};
export type NEW_BUSINESS_RESPONSE = {
    status: number;
    statusText: string;
    message: string;
    data: {
        list: Array<NEW_BUSINESS_DATA>;
        count: number;
        page: number;
        limit: number;
        execTime: number;
    };
};
export type REVIEW_DETAILS_ITEMS = {
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
    __v: number;
};
export type REVIEW_DETAILS_RESPONSE = {
    status: number;
    statusText: string;
    message: string;
    data: REVIEW_DETAILS_ITEMS;
};


export type OFFER_LIST_RESPONSE = BASE_RESPONSE & {
    data: BASE_LIST_RESPONSE & {
        docs: Array<OfferModel>
    };
}
export type BUSINESS_TYPES_LIST_RESPONSE = BASE_RESPONSE &  {
    data: BASE_LIST_RESPONSE & {
        docs: Array<BusinessTypeModel>
    }
};
