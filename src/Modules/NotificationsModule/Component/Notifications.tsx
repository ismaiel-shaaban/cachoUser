import styles from "./Notifications.module.css";
import Image from "next/image";
import images from "src/Assets/images";
import { strings } from "src/Utils/Localization";
import useNotificationListInfiniteQuery, {
  extractNotificationList,
} from "../Hooks/useNotificationListInfiniteQuery";
import { Fragment, useMemo, useRef } from "react";
import moment from "moment";
import useNotificationReadMutation from "../Hooks/useNotificationReadMutation";
import { useRouter } from "next/router";

function NotificationsModule() {
  const notificationsListInfiniteQuery = useNotificationListInfiniteQuery();
  const router = useRouter();
  const { hasNextPage = false, fetchNextPage } = notificationsListInfiniteQuery;
  const notificationList = useMemo(
    () =>
      extractNotificationList(
        notificationsListInfiniteQuery?.data?.pages ?? []
      ),
    [notificationsListInfiniteQuery?.data?.pages]
  );  
  const fetchData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  const scrollRef = useRef(null);
  const { mutate } = useNotificationReadMutation();
  return (
    <>
      <section
        className={`bg-sky flex flex-wrap justify-center ${styles.salonWrapper}`}
      >
        <div
        id="notificationList"
          className={`bg-white px-[20px] py-[15px] w-full max-w-[800px] mb-[2rem]`}
        >
          <h6 className="font-[600] text-[14px]">{strings?.notification}</h6>
          {/* hair cut 1 */}
          {notificationList.length !== 0 ? (
              notificationList.map((item, index) => {
                return (
                  <div
                    className={styles.notifyMainDiv}
                    key={index}
                    onClick={() => {
                      if (!item?.isRead) {
                        mutate(item?._id);
                        router.push(
                          item?.type === "NEW OFFER ADDED"
                            ? `/vendor-detail?vendorId=${item?.vendorId}&t=${item?.type}`
                            : `/vendor-detail?vendorId=${item?.vendorId}`
                        );
                      }
                    }}
                  >
                    <div
                      className={`${styles.notificationList} ${
                        !item?.isRead ? styles.activeNotificationList : ""
                      } "flex gap-[15px]"`}
                    >
                      <div className={` ${styles.listRow} flex `}>
                        <div className={styles.leftCol}>
                          <div
                            className={` ${
                              !item?.isRead ? styles.notificationActive : ""
                            } bg-[#7ca0ba33] flex items-center justify-center rounded-[30px] relative w-[50px] h-[50px] flex-[50px] shrink-[0] grow-[0] `}
                          >
                            <figure className={` relative w-[30px] h-[30px]  `}>
                              <Image
                                src={
                                  item?.type === "NEW OFFER ADDED"
                                    ? images.notificationImg
                                    : images?.vendorNotificationImage
                                }
                                layout="fill"
                                alt="notify"
                              />
                            </figure>
                          </div>
                          <div
                            className={` ${styles.rightNotificationContent} "ml-[15px]"`}
                          >
                            <h3 className="font-[600] text-[16px] ">
                              {item?.type}
                            </h3>
                            <p className={`font-[400] text-[14px] text-gray `}>
                              {item?.message}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mb-[0px]">
                        <span
                          className={`font-[500] text-[13px] text-[#BBB;] leading-[18px] text-lightestGray`}
                        >
                          {moment(item?.createdAt).fromNow()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            <div className={styles.noReviewData}>
              <Image src={images.noNotificationImage} alt="noReview" />
              <h3 className="text-[#5A5A5A;] text-[16px] font-[400]">
                {strings?.no_notification_found}
              </h3>
            </div>
          )}
          {hasNextPage && <button onClick={fetchData} className={styles.viewMoreBtn}>{strings.view_more}</button>}
        </div>
      </section>
    </>
  );
}
export default NotificationsModule;
