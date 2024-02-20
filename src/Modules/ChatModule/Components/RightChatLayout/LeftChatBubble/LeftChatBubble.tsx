import React, { useState } from "react";
import styles from "./LeftChatBubble.module.css";

function LeftChatBubble(props: any) {
  const { item } = props;
  return (
    <>
      <h3 className={styles.msgtext}>{item?.message}</h3>
    </>
  );
}

export default LeftChatBubble;
