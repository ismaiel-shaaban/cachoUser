import {BASE_LIST_RESPONSE, BASE_RESPONSE} from "../../Common/Types/ResponseTypes";
import {BusinessModel} from "../../../Models/business.model";

export type BUSINESS_LIST_RESPONSE = BASE_RESPONSE &  {
    data: BASE_LIST_RESPONSE & {
        docs: Array<BusinessModel>
    }
};
