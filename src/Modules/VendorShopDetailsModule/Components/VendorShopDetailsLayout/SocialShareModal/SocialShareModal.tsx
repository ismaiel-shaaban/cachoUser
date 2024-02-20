import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import styles from "./SocialShareModal.module.css";
import SnackbarHandler from "src/Utils/SnackbarHandler";
import { Dialog, Transition } from "@headlessui/react";
import images from "src/Assets/images";
import {
  EmailShareButton,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import useCreateDynamicLinkForRatingMutation from "src/Modules/VendorShopDetailsModule/Hooks/useCreateDynamicLinkForRatingMutation";
import useEventEmitter, { emitEvent } from "src/Hooks/useEventEmmiter";
import { useRouter } from "next/router";
import { strings } from "src/Utils/Localization";
export const SHARE_MODAL_EVENT = "SHARE_MODAL_EVENT";
export const shareModal = () => {
  emitEvent(SHARE_MODAL_EVENT);
};
function SocialShareModal() {
  const [inviteUrl, setInviteUrl] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const vendorId = router?.query?.vendorId;
  const { mutate } = useCreateDynamicLinkForRatingMutation();
  useEffect(() => {
    mutate(
      {
        dynamicLinkInfo: {
          domainUriPrefix: "https://cachoo.page.link",
          link: `http://user-staging.cachooapp.com/vendor-detail?vendorId=${vendorId}`,
          iosInfo: {
            iosBundleId: "com.cachoo.mobilecoderz",
            iosFallbackLink: "http://user-staging.cachooapp.com/",
          },
          androidInfo: {
            androidPackageName: "com.cachoo.mobilecoderz",
            androidFallbackLink: "http://user-staging.cachooapp.com/",
          },
        },
      },
      {
        onSuccess: (responseData: any) => {
          if (responseData) {
            const { status, data } = responseData;
            if (status === 200) {
              setInviteUrl(data?.shortLink);
            }
          }
        },
      }
    );
  }, [mutate, vendorId]);
  useEventEmitter(SHARE_MODAL_EVENT, () => setIsOpen(true));
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          open={true}
          onClose={() => setIsOpen(false)}
          className={
            "rounded-lg rounded-8 fixed inset-0 z-[999] overflow-y-auto p-40 w-full "
          }
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[505px] pt-[10px] px-[43px]  pb-[20px] transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                  <h1 className="text-center font-[700] text-[20px]">
                    {strings.social_share}
                  </h1>
                  <div className={`${styles.socialIcon} pt-[20px]`}>
                    <h3 className="mb-[20px] font-[500] text-[16px]">
                      {strings.share_the_link_via}
                    </h3>
                    <FacebookShareButton url={inviteUrl}>
                      <Image
                        src={images.facebookShare}
                        alt="facebookShare"
                        height={"64.5px"}
                        width={"54px"}
                      />
                    </FacebookShareButton>
                    <TwitterShareButton url={inviteUrl}>
                      <Image
                        src={images.twitterShare}
                        alt="twitterShare"
                        height={"64.5px"}
                        width={"54px"}
                      />
                    </TwitterShareButton>
                    <LinkedinShareButton url={inviteUrl}>
                      <Image
                        src={images.linkedinShare}
                        alt="linkedinShare"
                        height={"64.5px"}
                        width={"54px"}
                      />
                    </LinkedinShareButton>
                    <FacebookMessengerShareButton url={inviteUrl} appId={""}>
                      <Image
                        src={images.messageShare}
                        alt="messageShare"
                        height={"64.5px"}
                        width={"54px"}
                      />
                    </FacebookMessengerShareButton>
                    <WhatsappShareButton url={inviteUrl}>
                      <Image
                        src={images.whatsappShare}
                        alt="whatsappShare"
                        height={"64.5px"}
                        width={"54px"}
                      />
                    </WhatsappShareButton>
                    <EmailShareButton url={inviteUrl}>
                      <Image
                        src={images.emailShare}
                        alt="emailShare"
                        height={"64.5px"}
                        width={"54px"}
                      />
                    </EmailShareButton>
                  </div>
                  <h5 className="font-[500] text-[16px] opacity[.7]">
                    {`${strings.or} ${strings.copy_link}`}
                  </h5>
                  <div className={styles.copyLink}>
                    <div>
                      <Image
                        src={images.copyLinkIcon}
                        alt="copylink_image"
                        height={"18.49px"}
                        width={"18.49px"}
                      />
                    </div>
                    <div>{inviteUrl}</div>
                    <div
                      onClick={() => {
                        navigator.clipboard.writeText(inviteUrl);
                        SnackbarHandler.successToast(strings.copied);
                      }}
                      className={styles.copyLinkUrl}
                    >
                      {strings.copy_link}
                    </div>
                  </div>
                  <div className="text-center mt-[20px]">
                    <button
                      className={styles.closeShare}
                      onClick={() => setIsOpen(false)}
                    >
                      {strings.close}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default SocialShareModal;
