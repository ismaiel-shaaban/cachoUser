export type PRODUCT_SEARCH_FILTER_REQUEST = {
    page?: string;
    limit?: string;
    ratingRange?: string;

    distance?: string;


    latitude?: string;

    longitude?: string;


    search?: string;


    subCategoryId: string;


    productCategoryId?: string;


    priceSort?: string;


    newestSort?: string;


    popularitySort?: string;


    gender?: string;


    startPrice?: string


    endPrice?: string
}