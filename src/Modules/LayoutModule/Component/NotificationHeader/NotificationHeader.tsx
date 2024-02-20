import images from "src/Assets/images";
import Image from "next/image";
import { strings } from "src/Utils/Localization";
import { useRouter } from "next/router";
import useClearAllNotificationMutation from "src/Modules/NotificationsModule/Hooks/useClearAllNotificationMutation";

function NotificationHeader(props: any) {
  const router = useRouter();
  const { notificationListCount } = props;
  const { mutate } = useClearAllNotificationMutation();
  return (
    <>
      <section className="bg-[#44779d4d] ssm:hidden sm:hidden">
        <div className="main-container">
          <div className={` flex justify-between py-[15px]  items-center`}>
            <div className={`flex flex-row items-center`}>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => router?.push("/")}
              >
                <Image src={images.leftArrow} alt="left" />
              </div>
              <div className={`ml-[15px] mt-[2px]`}>
                <p className="text-[16px] font-[700]">
                  {strings.notifications}
                </p>
              </div>
            </div>
            {notificationListCount > 0 && (
              <button onClick={() => mutate()}>
                <p className="text-[15px] font-[600]">{strings.clear_all}</p>
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
export default NotificationHeader;
