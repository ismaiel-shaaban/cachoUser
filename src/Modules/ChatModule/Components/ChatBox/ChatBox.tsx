import React, { useMemo, useRef, useState } from "react";
import RightChatLayout from "../RightChatLayout/RightChatLayout";
import LeftChatList from "../LeftChatList/LeftChatList";
import styles from "./ChatBox.module.css";
import {
  extractChatParticipantsList,
} from "../../Hooks/useChatParticipantsInfiniteQuery";
import { useDebounce } from "use-debounce";
import { strings } from "src/Utils/Localization";
import useGetParticipantsListInfiniteQuery from "../../Hooks/useChatParticipantsInfiniteQuery";

function ChatBox(props: any) {
  const { vendorId, vendorName } = props;
  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState<string>("");
  const [searchValue] = useDebounce(searchText, 1000);
  const participantsListInfiniteQuery = useGetParticipantsListInfiniteQuery(searchValue);
  const { hasNextPage = false, fetchNextPage } = participantsListInfiniteQuery;
  const participantList = useMemo(
    () =>
      extractChatParticipantsList(
        participantsListInfiniteQuery?.data?.pages ?? []
      ),
    [participantsListInfiniteQuery?.data?.pages]
  );
  const fetchData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  const scrollRef = useRef(null);
  return (
    <section className={styles.chatbox}>
      <div className={styles.containerChat}>
        <h3 className={styles.mainHeading}>{strings?.all_message}</h3>
        <div className={styles.flexChat}>
          <LeftChatList
            participantList={participantList}
            scrollRef={scrollRef}
            fetchData={fetchData}
            hasNextPage={hasNextPage}
            setSearchText={setSearchText}
          />
          <RightChatLayout
            participantList={participantList}
            vendorId={vendorId}
            vendorName={vendorName}
          />
        </div>
      </div>
    </section>
  );
}

export default ChatBox;
