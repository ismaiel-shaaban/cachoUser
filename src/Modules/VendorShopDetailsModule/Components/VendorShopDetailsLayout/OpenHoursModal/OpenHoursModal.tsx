import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import styles from "./OpenHoursModal.module.css";
import useEventEmitter, { emitEvent } from "src/Hooks/useEventEmmiter";
import { PRODUCTS_VENDOR_RESPONSE } from "src/Modules/CategoryModule/Types/ResponseTypes";
import moment from "moment";
import { strings } from "src/Utils/Localization";

type OPEN_TIME_PROPS = {
  vendorDetails: PRODUCTS_VENDOR_RESPONSE | any;
  formatTimeToAMPM: any;
  daysOnly: any;
  dayName: any;
};
const OPEN_HOURS_MODAL = "open-hours-modal";
export const openHoursModal = () => {
  emitEvent(OPEN_HOURS_MODAL);
};

function OpenHoursModal(props: OPEN_TIME_PROPS) {
  const { vendorDetails, formatTimeToAMPM, dayName } = props;
  let [isOpen, setIsOpen] = useState(false);
  useEventEmitter(OPEN_HOURS_MODAL, () => {
    setIsOpen(true);
  });
  const weeks = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const parsedOpeningDays: any = vendorDetails
    ? vendorDetails?.workingDays?.map((item: any) => JSON.parse(item?.days))
    : [];
  const getDayOpeningStatus = () => {
    const openingClosingDays = [];
    let count = 0;
    for (let day of weeks) {
      const openingDays = parsedOpeningDays[count];
      if (day === openingDays) {
        openingClosingDays.push({
          ...vendorDetails?.workingDays[count],
          days: day,
          open: vendorDetails?.workingDays[count]?.open,
          close: vendorDetails?.workingDays[count]?.close,
        }),
          count++;
      } else {
        openingClosingDays.push({
          days: day,
          open: "Closed",
          close: "Closed",
        });
      }
    }
    return openingClosingDays;
  };
  const openingDaysStatus = getDayOpeningStatus();
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={`${styles.outerzClass} rounded-lg  fixed inset-0 z-10 overflow-y-auto p-40 w-full`}
      >
        <div
          className={`${styles.wrapOpenHours} flex flex-col bg-white text-black  mx-auto text-center rounded-xl p-10`}
        >
          <Dialog.Overlay className="fixed inset-0 bg-white opacity-10" />
          <div className="relative bg-white rounded max-w-sm ">
            {openingDaysStatus.map((data: any) => {
              return (
                <p className={styles.listingItem}>
                  <strong>{data?.days}</strong>
                  <span className={styles.timeSchedule}>
                    {data?.open !== "Closed" && data?.close !== "Closed"
                      ? `${moment(JSON.parse(data?.open ?? null)).format(
                          "LT"
                        )} - ${moment(JSON.parse(data?.close ?? null)).format(
                          "LT"
                        )}`
                      : `${strings.closed}`}
                  </span>
                </p>
              );
            })}
            {/* <Dialog.Description>
            </Dialog.Description> */}
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default OpenHoursModal;
