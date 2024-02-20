export type REVIEW_LIST_DATA={
    _id: string;
    vendorId: string;
    businessId: string;
    userId: {
        _id: string;
        name: string;
    },
    productId: {
        _id: string;
        name: string;
    },
    stars: number;
    review: string;
    createdAt: string;
    updatedAt: string;
}
export type REVIEW_LIST_RESPONSE={
    status: number;
    statusText: string;
    message: string;
    data: {
        list: Array<REVIEW_LIST_DATA>;
        count:number;
        page: number;
        limit: number;
        execTime: number;
    }
}