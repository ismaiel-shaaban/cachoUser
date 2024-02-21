export  type  BASE_RESPONSE = {
    status: number;
    statusText: string;
    message: string;


}

export  type  BASE_LIST_RESPONSE = {

    totalDocs: number,
    "limit": number,
    "page": number,
    "totalPages": number,
    "pagingCounter": number,
    "hasPrevPage": boolean,
    "hasNextPage": boolean,
    "prevPage": number,
    "nextPage": number,
    "execTime": number

}