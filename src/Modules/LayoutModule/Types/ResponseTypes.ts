export type BREADCRUMB = {
  title: string;
  path?: string;
};
export type SUGGESTION_SEARCH_RESPONSE = {
  status: number;
  statusText: string;
  message: string;
  data: {
    suggestionsAsObjects: Array<{
      productcategoryName: string;
      productcategoryArName: string;
    }>;
    execTime: number;
  };
};
