import { useCallback } from "react";
import ChatClient from "../Utils/ChatClients";

function useChatEmit() {
  const emitEvent = useCallback(
    (eventName: string, data: any, callback: (responseData?: any) => void) => {
      ChatClient.ws?.emit(eventName, data, callback);
    },
    []
  );

  return {
    emitEvent,
  };
}

export default useChatEmit;
