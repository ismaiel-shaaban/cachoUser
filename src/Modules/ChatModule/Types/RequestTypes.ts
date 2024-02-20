export type CHAT_HISTORY_REQUEST = {
    firstParticipantId: string | any;
    secondParticipantId: string | any;

  };
export type CHAT_REPORT_REQUEST={

    reportedUser:string;
    reportedUserType:string;

}

export type REPORT_CHAT_AND_USER_REQUEST = {
  reportedUser: string;
  reportedUserType: string;
  reportType: number;
  reportReason: string;
  reportDescription?: string;
  chatId?: string;
  chatText?: string;
};