import { useEffect, useRef } from "react";
import ChatClient from "../Utils/ChatClients";

function useChatEvent(
  ws: any,
  eventName: string,
  onEvent: (data: any) => void
) {
  const onEventRef = useRef(onEvent);

  useEffect(() => {
    const listener = ws?.on(eventName, onEventRef.current);
    return () => {
      listener?.close();
    };
  }, [ws, eventName]);
}

export default useChatEvent;
