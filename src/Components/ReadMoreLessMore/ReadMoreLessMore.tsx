import { useState } from "react";
import styles from "./ReadMoreLess.module.css";

type READ_MORE_LESS_MORE_PROPS = {
  text: any;
  showChar: number;
};
function ReadMoreLessMore(props: READ_MORE_LESS_MORE_PROPS) {
  const { text, showChar } = props;
  const [showMore, setShowMore] = useState<boolean>(false);
  return (
    <>
      {showMore ? text : text?.substring(0, showChar)}
      {text?.length > showChar && (
        <a
          href="#"
          onClick={() => {
            setShowMore(!showMore);
          }}
          className="text-primary text-[14px] font-[400] ml-[10px]"
        >
          {!showMore ? "Show More" : " Show Less"}
        </a>
      )}
    </>
  );
}

export default ReadMoreLessMore;
