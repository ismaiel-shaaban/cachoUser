import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { countryOptions } from "../../Utils/Helpers";
import { GrClose } from "react-icons/gr";
import Select from "react-select";
import { OPTION } from "src/Utils/Types";
import useEventEmitter, { emitEvent } from "src/Hooks/useEventEmmiter";

const EVENT = "OPEN_COUNTRY_PICKER";
export const openCountryPicker = (selectedCountryCode: string) => {
  emitEvent(EVENT, selectedCountryCode);
};

type COUNTRY_PICKER_PROPS = {
  onChange: (value: string) => void;
};

function CountryPicker(props: COUNTRY_PICKER_PROPS) {
  const { onChange } = props;
  const [countryCode, setCountryCode] = useState("");
  let [isOpen, setIsOpen] = useState(false);

  useEventEmitter(EVENT, (selectedCountryCode: string) => {
    setIsOpen(true);
    setCountryCode(selectedCountryCode);
  });

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={
        "rounded-lg rounded-8 fixed inset-0 z-10 overflow-y-auto p-40 w-full "
      }
    >
      <div className="flex flex-col bg-powderblue text-black w-96 mx-auto text-center rounded-xl">
        <Dialog.Overlay className="fixed inset-0 bg-overlayColor opacity-30" />

        <div className="relative bg-powderblue rounded max-w-sm mx-auto">
          <div className={"flex flex-row space-x-44"}>
            <div>
              <Dialog.Title
                className={"font-bold text-2xl py-2 text-start px-2"}
              >
                Select Country
              </Dialog.Title>
            </div>
            <div
              className={"py-4 cursor-pointer pr-2"}
              onClick={() => setIsOpen(false)}
            >
              <GrClose />
            </div>
          </div>
          <Dialog.Description>
            <div>
              <div className={"text-lg py-2 text-start px-8 font-semibold"}>
                <label>Country</label>
              </div>
              <Select
                name="country"
                options={countryOptions}
                isSearchable
                autoFocus
                placeholder="Select Country"
                value={countryOptions.find(
                  ({ value }: OPTION) => value === countryCode
                )}
                onChange={(e: any) => {
                  setCountryCode(e.value);
                  onChange(e.value);
                  setIsOpen(false);
                }}
                className="w-10/12 mb-3 p-0 h-14 text-lg bg-powderblue outline-slatyGray px-4 border-countryColor"
              ></Select>
            </div>
          </Dialog.Description>
        </div>
      </div>
    </Dialog>
  );
}

export default CountryPicker;
