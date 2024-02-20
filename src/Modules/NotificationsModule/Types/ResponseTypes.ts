export type NOTIFICATION_LIST_ITEM = {
  _id: string;
  userId: {
    _id: string;
    name: string;
  };
  type: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  vendorId:string;
  updatedAt: string;
};
export type NOTIFICATION_LIST_DATA = {
  list: Array<NOTIFICATION_LIST_ITEM>;
  count: number;
  page: number;
  limit: number;
  unreadCount:number,
  execTime: number;
};
export type NOTIFICATION_LIST_RESPONSE = {
  status: number;
  statusText: string;
  message: string;
  data: NOTIFICATION_LIST_DATA;
};
