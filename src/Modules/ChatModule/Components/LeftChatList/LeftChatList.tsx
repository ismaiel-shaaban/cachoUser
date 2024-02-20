import React, { Fragment, useMemo, useRef, useState } from "react";
import styles from "./LeftChatList.module.css";
import images from "src/Assets/images";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import FlatList from "flatlist-react/lib";
import ChatItem from "./ChatItem/ChatItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { strings } from "src/Utils/Localization";

function LeftChatList(props: any) {
  const { participantList, scrollRef, fetchData, hasNextPage, setSearchText } =
    props;
  return (
    <>
      <div className={`${styles.leftChatLayout} `}>
        <h4 className={`${styles.titleMes} text-[16px] font-[700] text-black`}>
          {strings?.mssgs}
        </h4>
        <article className={styles.searchBox}>
          <input
            placeholder={strings?.search_chats}
            className={styles.searchInput}
            onChange={(e) => setSearchText(e?.target?.value)}
          />
          <span className={styles.imgSearch}>
            <Image src={images.searchImg} />
          </span>
        </article>
        {participantList?.length !== 0 ? (
          <div className={styles.availableUser}>
            <InfiniteScroll
              className={styles.noScroll}
              ref={scrollRef}
              dataLength={participantList?.length}
              next={fetchData}
              inverse={true}
              hasMore={hasNextPage}
              // onScroll={(e) => {
              //   if (chatHistory.length > 20) {
              //     fetchNextPage();
              //   }
              // }}
              // style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
              loader={
                false ? <h6>{`${strings?.loading}...`}</h6> : <Fragment />
              }
              scrollableTarget="chatScreenBody"
              pullDownToRefresh={true}
              refreshFunction={() => console.log("refresh")}
            >
              {participantList.map((item: any, index: any) => {
                return (
                  <>
                    <ChatItem item={item} key={index} />
                  </>
                );
              })}
            </InfiniteScroll>
          </div>
        ) : (
          <div className={styles.fallbackMessage}>{strings?.no_mssg_found}</div>
        )}
      </div>
    </>
  );
}

export default LeftChatList;
