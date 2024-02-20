export type ADD_REVIEW_REQUEST_TYPE = {
  userId: string;
  vendorId: string;
  productId: string;
  review: string;
  stars: number;
};
export type FILTER_PRODUCT_REQUEST_TYPE = {
  page: string;
  limit: string;

  ratingRange: string;

  distance: string;

  latitude: string;

  longitude: string;

  search: string;

  subCategoryId: string;

  productCategoryId: string;

  priceSort: string;

  newestSort: string;

  popularitySort: string;

  gender: string;

  startPrice: string;

  endPrice: string;
};
export type EDIT_REVIEW_REQUEST = {
  review: string;
  reviewId:string,
  stars: number;
};
