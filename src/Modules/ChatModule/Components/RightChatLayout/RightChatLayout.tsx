import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import styles from "./RightChatLayout.module.css";
import images from "src/Assets/images";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import BlockPopup, { blockPopup } from "./BlockPopup/BlockPopup";
import ReportPopup, { reportPopup } from "./ReportPopup/ReportPopup";
import { useForm } from "react-hook-form";
import useChatEmit from "../../Hooks/useChatEmit";
import { EVENTS } from "../../Hooks/useChatListeners";
import { queryClient } from "src/Utils/ReactQueryConfig";
import useChatHistoryInfiniteQuery, {
  CHAT_HISTORY_INFINITE_QUERY_KEY,
  extractChatHistory,
} from "../../Hooks/useChatHistoryInfiniteQuery";
import LeftChatBubble from "./LeftChatBubble/LeftChatBubble";
import RightChatBubble from "./RightChatBubble/RightChatBubble";
import InfiniteScroll from "react-infinite-scroll-component";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";
import useEventEmitter, { emitEvent } from "src/Hooks/useEventEmmiter";
import SnackbarHandler from "src/Utils/SnackbarHandler";
import ChatInput from "../ChatInput/ChatInput";
import { FILE_URL, combineStringIds } from "src/Utils/Helpers";
import UserUnBlockPop, { unblockPopup } from "./UserUnBlockPop/UserUnBlockPop";
import { useRouter } from "next/router";
import useChatHistoryQuery from "../../Hooks/useChatHistoryQuery";
import { strings } from "src/Utils/Localization";
import AddReviewModal, {
  addModal,
} from "src/Modules/ProductListingPage/Components/ProductView/ProductTabList/Reviews/AddReviewModal/AddReviewModal";
import useVendorProductListQuery from "src/Modules/ProductListingPage/Hooks/useVendorProductListQuery";
type CHAT_LIST_PROPS_RESPONSE = {
  participantList: any;
  vendorName: any;
  vendorId: any;
};
function RightChatLayout(props: CHAT_LIST_PROPS_RESPONSE) {
  const { vendorId, vendorName } = props;

  const { user } = useAuthValue();
  const router = useRouter();
  const [userBlockData, setUserBlockData] = useState<any>(null);
  const firstParticipantId = router?.query?.fi;
  const secondParticipantId = router?.query?.si;

  const chatHistoryInfiniteQuery = useChatHistoryInfiniteQuery({
    firstParticipantId:
      firstParticipantId !== undefined ? firstParticipantId : user?._id,
    secondParticipantId:
      secondParticipantId !== undefined ? secondParticipantId : vendorId,
  });

  const {
    hasNextPage = false,
    fetchNextPage,
    isLoading,
  } = chatHistoryInfiniteQuery;

  const chatHistoryList = useMemo(
    () => extractChatHistory(chatHistoryInfiniteQuery?.data?.pages ?? []),
    [chatHistoryInfiniteQuery?.data?.pages]
  );
  const messageEl = useRef<any>();
  const pullDownScroll = () => {
    const scrollHeight =
      messageEl?.current?.scrollHeight - messageEl?.current?.clientHeight;

    messageEl?.current?.scrollTo({
      top: scrollHeight + 150 * chatHistoryList?.length,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    pullDownScroll();
  }, [chatHistoryList, firstParticipantId, secondParticipantId]);
  const fetchData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const scrollRef = useRef(null);
  const blockedUserId: any =
    firstParticipantId === user?._id ? secondParticipantId : firstParticipantId;
  const userImage = router?.query?.userImage;
  const { language } = useAuthValue();
  const vendorProductListQuery = useVendorProductListQuery(
    blockedUserId ? blockedUserId : vendorId
  );
  const vendorProductListData =
    vendorProductListQuery?.data?.data?.data?.list ?? [];
  return (
    <>
      <div className={`${styles.rightChatLayout} `}>
        {vendorName ? (
          <>
            {/* header-start */}
            <header
              className={
                language === "ar"
                  ? `${styles.msgerheader} ${styles.arabicMmsgerheader} `
                  : ` ${styles.msgerheader} `
              }
            >
              <figure className="flex items-center gap-[20px]">
                <div
                  className={`${styles.profileBox} relative w-[60px] h-[60px] rounded-[20px]`}
                >
                  <Image
                    src={
                      userImage ? `${FILE_URL}${userImage}` : images.chatProfile
                    }
                    alt="img"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <figcaption className={styles.rightUserInfo}>
                  <h5>{vendorName}</h5>
                  {/* <h6 className={styles.OnlineText}>Online</h6> */}
                </figcaption>
              </figure>
              <div className={styles.rightPart}>
                {chatHistoryList.length !== 0 && (
                  <button
                    className={styles.starReview}
                    onClick={() => addModal(vendorProductListData)}
                  >
                    <h3 className="text-[14px] font-[500] text-black">
                      {strings.review_the_seller}
                    </h3>
                    <div className={styles.stars}>
                      <Rating readonly={true} />
                    </div>
                  </button>
                )}

                <div className={styles.hoverPart}>
                  <span className={styles.trippleImg}>
                    <Image src={images.trippleDot} />
                  </span>
                  <ul className={styles.hoverTripleDot}>
                    {userBlockData?.blockData === null ? (
                      <li>
                        <a
                          onClick={() =>
                            blockPopup(vendorId ? vendorId : blockedUserId)
                          }
                        >
                          {strings?.block}
                        </a>
                      </li>
                    ) : userBlockData?.blockData === null &&
                      userBlockData?.blockOtherData !== null ? (
                      <li>
                        <a
                          onClick={() =>
                            blockPopup(vendorId ? vendorId : blockedUserId)
                          }
                        >
                          {strings?.block}
                        </a>
                      </li>
                    ) : (
                      userBlockData?.blockData !== null &&
                      userBlockData?.blockOtherData === null && <Fragment />
                    )}
                    {/* <li>
                    <a onClick={()=>unblockPopup(vendorId)}>UnBlock</a>
                  </li> */}
                    <li>
                      <a
                        onClick={() =>
                          reportPopup(vendorId ? vendorId : blockedUserId)
                        }
                      >
                        {strings?.report}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </header>
            {/* header-close */}

            {/* main-start */}
            <main
              className={styles.msgerchat}
              ref={messageEl}
              id="chatHistory"
              style={{
                height: "400px",
                overflow: "auto",
                display: "flex",
                flexDirection: "column-reverse",
              }}
            >
              <InfiniteScroll
                ref={scrollRef}
                dataLength={chatHistoryList?.length}
                next={fetchData}
                inverse={true}
                hasMore={true}
                style={{ display: "flex", flexDirection: "column-reverse" }}
                loader={false ? <h6>Loading...</h6> : <Fragment />}
                scrollableTarget="chatHistory"
                pullDownToRefresh={true}
                refreshFunction={() => console.log("refresh")}
              >
                {chatHistoryList.map((item: any, index: any) => {
                  const self = item?.senderId === user?._id;

                  return (
                    <>
                      {!self ? (
                        <div className={`${styles.msg} ${styles.leftmsg}`}>
                          <div className={styles.msgwrapper}>
                            <div
                              className={`${styles.userProfileChat} w-[35px] h-[35px] rounded-[50%] overflow-hidden relative`}
                            >
                              <Image
                                src={
                                  userImage
                                    ? `${FILE_URL}${userImage}`
                                    : images.chatProfile
                                }
                                layout="fill"
                                objectFit="cover"
                                alt="img"
                              />
                            </div>

                            <div className={styles.msgbubble}>
                              <LeftChatBubble item={item} />
                            </div>
                            <div className={styles.hoverPart}>
                              <span className={styles.trippleImg}>
                                <Image src={images.elipsis} />
                              </span>
                              <ul
                                className={`${styles.hoverTripleDot} ${styles.reportChatBox}`}
                              >
                                <li>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="19"
                                    viewBox="0 0 18 19"
                                    fill="none"
                                  >
                                    <path
                                      d="M1.125 4.0625C1.125 3.338 1.713 2.75 2.4375 2.75H15.5625C16.287 2.75 16.875 3.338 16.875 4.0625V13.4375C16.875 13.7856 16.7367 14.1194 16.4906 14.3656C16.2444 14.6117 15.9106 14.75 15.5625 14.75H8.373C8.34836 14.75 8.32395 14.7548 8.30118 14.7642C8.2784 14.7736 8.2577 14.7873 8.24025 14.8048L5.61525 17.4298C5.46229 17.5821 5.26764 17.6858 5.05584 17.7277C4.84404 17.7697 4.62456 17.748 4.42509 17.6653C4.22561 17.5827 4.05505 17.4429 3.93491 17.2635C3.81477 17.0841 3.75043 16.8732 3.75 16.6572V14.75H2.4375C2.0894 14.75 1.75556 14.6117 1.50942 14.3656C1.26328 14.1194 1.125 13.7856 1.125 13.4375V4.0625ZM2.4375 3.875C2.38777 3.875 2.34008 3.89475 2.30492 3.92992C2.26975 3.96508 2.25 4.01277 2.25 4.0625V13.4375C2.25 13.541 2.334 13.625 2.4375 13.625H4.3125C4.46168 13.625 4.60476 13.6843 4.71025 13.7898C4.81574 13.8952 4.875 14.0383 4.875 14.1875V16.58L7.44525 14.0098C7.69126 13.7636 8.02497 13.6252 8.373 13.625H15.5625C15.6122 13.625 15.6599 13.6052 15.6951 13.5701C15.7302 13.5349 15.75 13.4872 15.75 13.4375V4.0625C15.75 4.01277 15.7302 3.96508 15.6951 3.92992C15.6599 3.89475 15.6122 3.875 15.5625 3.875H2.4375ZM9 5.375C9.14918 5.375 9.29226 5.43426 9.39775 5.53975C9.50324 5.64524 9.5625 5.78832 9.5625 5.9375V8.9375C9.5625 9.08668 9.50324 9.22976 9.39775 9.33525C9.29226 9.44074 9.14918 9.5 9 9.5C8.85082 9.5 8.70774 9.44074 8.60225 9.33525C8.49676 9.22976 8.4375 9.08668 8.4375 8.9375V5.9375C8.4375 5.78832 8.49676 5.64524 8.60225 5.53975C8.70774 5.43426 8.85082 5.375 9 5.375ZM9 12.125C8.80109 12.125 8.61032 12.046 8.46967 11.9053C8.32902 11.7647 8.25 11.5739 8.25 11.375C8.25 11.1761 8.32902 10.9853 8.46967 10.8447C8.61032 10.704 8.80109 10.625 9 10.625C9.19891 10.625 9.38968 10.704 9.53033 10.8447C9.67098 10.9853 9.75 11.1761 9.75 11.375C9.75 11.5739 9.67098 11.7647 9.53033 11.9053C9.38968 12.046 9.19891 12.125 9 12.125Z"
                                      fill="#3D3D3D"
                                    />
                                  </svg>
                                  <button
                                    onClick={() =>
                                      reportPopup({
                                        reportedUserId: vendorId
                                          ? vendorId
                                          : blockedUserId,
                                        chatInfo: item,
                                      })
                                    }
                                  >
                                    {strings.report_this_message}
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className={`${styles.msg} ${styles.rightmsg}`}>
                          <RightChatBubble item={item} />
                        </div>
                      )}
                    </>
                  );
                })}
              </InfiniteScroll>
            </main>
            {/* main-close */}
            <ChatInput
              vendorId={vendorId}
              firstParticipantId={firstParticipantId}
              secondParticipantId={secondParticipantId}
              setUserBlockData={setUserBlockData}
              chatHistoryList={chatHistoryList}
            />
          </>
        ) : (
          <div className={styles.noConversationWindow}>
            <Image src={images.noTalkImg} alt="noTalkImg" />
            <h4>{strings?.select_chat_start_new_conv}</h4>
          </div>
        )}
      </div>
      <BlockPopup />
      <UserUnBlockPop />
      <ReportPopup />
      <AddReviewModal
        vendorId={vendorId ? vendorId : blockedUserId}
        vendorName={vendorName}
      />
    </>
  );
}

export default RightChatLayout;
