export type INPUT_TYPES =
  | "text"
  | "email"
  | "password"
  | "phone"
  | "radioInput"
  | "checkInput"
  | "date"
  | "range"
  | "multiSelect"
  | "textArea"
  | "file"
  | "select"
  | "imageFile"
  | "switch"
  | "textarea"
  | "custom";

export type OPTION = { label: string; value: string | number };

export type SELECT_OPTIONS = Array<OPTION>;
