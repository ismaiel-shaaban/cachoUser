export type CHAT_PARTICIPANTS_LIST_ITEMS = {
  _id: string;
  chatId: {
    _id: string;
    senderId: string;
    receiverId: string;
    message: string;
    image: null | string;
    isRead: boolean;
    messageType: number;
    timeStamp: string;
    receiverType: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  deletedBy: Array<string>;
  timeStamp: string;
  firstParticipant: any
  secondParticipant: any;
  firstParticipantName: string;
  secondParticipantName: null | string;
  created_at: string;
  updatedAt: string;
  __v: number;
  unreadCount: number;
};
export type CHAT_PARTICIPANT_DATA = {
  chatParticipants: Array<CHAT_PARTICIPANTS_LIST_ITEMS>;
  count: number;
  page: number;
  limit: number;
};
export type CHAT_PARTICIPANTS_LIST_RESPONSE = {
  status: number;
  message: string;
  data: CHAT_PARTICIPANT_DATA;
};

export type CHAT_HISTORY_RESPONSE_ITEMS = {
    _id: string;
    senderId: string;
    receiverId: string;
    message: string;
    image: null | string;
    isRead: boolean;
    messageType: number;
    timeStamp: string;
    receiverType: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  export type CHAT_HISTORY_RESPONSE = {
    status: number;
    message: string;
    data: {
      chats: Array<CHAT_HISTORY_RESPONSE_ITEMS>;
      count: number;
      page: number;
      isBlock: boolean;
      blockData: null | string;
      isBlockByOther: boolean;
      blockOtherData: null | string;
      limit: number;
    };
  };
  export type CHAT_REPORT_DATA={
    reportedUser: string;
    reportedBy: string;
    reportedUserType: string;
    timeStamp: string;
    _id: string;
    createdAt: string;
    updatedAt:string;
    __v: number;
  }
export type CHAT_REPORT_RESPONSE={
    status: number;
  message: string;
  data: CHAT_REPORT_DATA
}
export type REPORT_CHAT_AND_USER_RESPONSE = {
  status: number;
  message: string;
  data: {
    reportedUser: string;
    reportedBy: string;
    reportedUserType: string;
    reportReason: string;
    reportDescription: string;
    reportType: number;
    chatText: null | string;
    chatId: null | string;
    timeStamp: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};