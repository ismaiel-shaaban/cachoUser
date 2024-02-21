import {BASE_LIST_RESPONSE, BASE_RESPONSE} from "../../Common/Types/ResponseTypes";
import {BusinessTypeModel} from "../../../Models/businessType.model";

export type BUSINESS_TYPES_LIST_RESPONSE = BASE_RESPONSE &  {
    data: BASE_LIST_RESPONSE & {
        docs: Array<BusinessTypeModel>
    }
};
