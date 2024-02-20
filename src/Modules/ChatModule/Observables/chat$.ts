import { BehaviorSubject } from "rxjs";
import { CHAT_STATE } from "../Types/CommonTypes";

const chat$ = new BehaviorSubject<CHAT_STATE>({ online: false });

export default chat$;
