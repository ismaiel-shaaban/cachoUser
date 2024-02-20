import styles from "./RightChatBubble.module.css";
function RightChatBubble(props:any)

{
  const {item}=props;
    return(
        <>
        <div className={styles.rightmsgwrapper}>
              <div className={`${styles.msgbubble} ${styles.rightMsgbubble}`}>
                <h3 className={styles.msgtext}>
                  {item?.message}
                </h3>
              </div>
              
            </div>
        </>
    )
}
export default RightChatBubble;