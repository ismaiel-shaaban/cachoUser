import useObervableValue from "src/Hooks/useObservableValue";
import chat$ from "../Observables/chat$";

function useChatValue() {
  return useObervableValue(chat$);
}

export default useChatValue;
