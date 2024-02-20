import React, { useMemo, useState } from "react";
import styles from "./ChatItem.module.css";
import images from "src/Assets/images";
import Image from "next/image";
import { CHAT_PARTICIPANTS_LIST_ITEMS } from "src/Modules/ChatModule/Types/ResponseTypes";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";
import { useRouter } from "next/router";
import { FILE_URL } from "src/Utils/Helpers";

type CHAT_ITEM_PROPS = {
  item: CHAT_PARTICIPANTS_LIST_ITEMS;
};
function ChatItem(props: CHAT_ITEM_PROPS) {
  const { item } = props;
  const { user } = useAuthValue();
  const router = useRouter();

  // const receiverUser =
  //   user?._id === item?.firstParticipant?._id
  //     ? item?.secondParticipant
  //     : item?.firstParticipant;
  const userName =
    user?._id === item?.firstParticipant?._id
      ? item?.secondParticipantName
      : item?.firstParticipantName;
  const userImage =
    item?.secondParticipant?._id === user?._id
      ? item?.firstParticipant?.pic
      : item?.secondParticipant?.pic;
  const vendorName = router?.query?.vendorName;
  return (
    <>
      <div
        className={
          vendorName === userName
            ? `${styles.activeUser} ${styles.profileChatList}`
            : ` ${styles.profileChatList}`
        }
        onClick={() =>
          router.push(
            `/chat?fi=${item?.firstParticipant?._id}&si=${item?.secondParticipant?._id}&vendorName=${userName}&userImage=${userImage}`
          )
        }
      >
        <div className={styles.leftUser}>
          <figure className="w-[52px] h-[52px]">
            <div
              className={`${styles.imgUser} relative w-[52px] h-[52px] overflow-hidden`}
            >
              <Image
                src={userImage ? `${FILE_URL}${userImage}` : images.userProfile}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </figure>
          <div className={styles.userChat}>
            <h4 className="text-[18px] font-[500] text-black capitalize">
              <span>{userName}</span>
            </h4>
            <p className="text-[15px] font-[400] text-spanColor ">
              {item?.chatId?.message}
            </p>
          </div>
        </div>
        {/* <div className={styles.rightUser}>
          <h5>{new Date(item?.chatId?.createdAt).toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</h5>
          {item?.unreadCount !== 0 && <span className={styles.count}>{item?.unreadCount}</span>}
        </div> */}
      </div>
    </>
  );
}
export default ChatItem;
