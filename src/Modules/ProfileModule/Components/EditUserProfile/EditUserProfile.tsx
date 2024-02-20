import images from "src/Assets/images";
import styles from "./EditUserProfile.module.css";
import Image from "next/image";
import FormBuilder from "src/Components/FormBuilder/FormBuilder";
import { useForm } from "react-hook-form";
import {
  getRequiredRules,
  getEmailValidationRules,
  getPhoneNumberValidationRules,
} from "src/Utils/Validators";
import useEditUserProfileMutation from "../../Hooks/useEditUserProfileMutation";
import { useState } from "react";
import { EDIT_PROFILE_DATA } from "../../Types/ResponseTypes";
import ProfilePhoneOtpModal, {
  openPhoneEvent,
} from "../ProfilePhoneOtpModal/ProfilePhoneOtpModal";
import useUserProfileQuery, {
  GET_PROFILE,
} from "../../Hooks/useUserProfileQuery";
import { FILE_URL } from "src/Utils/Helpers";
import Loader from "src/Components/Loader/Loader";
import { useRouter } from "next/router";
import { queryClient } from "src/Utils/ReactQueryConfig";
import useAuthValue, {
  getAuthValue,
  setAuthValue,
} from "src/Modules/AuthModule/Hooks/useAuthValue";
import { strings } from "src/Utils/Localization";

function EditUserProfile() {
  const [imageData, setImageData] = useState<any>(null);
  const userProfileQuery = useUserProfileQuery();
  const userProfileData = userProfileQuery?.data?.data?.data;
  const router = useRouter();
  const [editProfileData, setEditProfileData] = useState<
    EDIT_PROFILE_DATA | undefined
  >();
  const { user } = useAuthValue();
  const { control, formState, watch, setValue, trigger, handleSubmit, reset } =
    useForm({
      defaultValues: {
        name: userProfileData?.name ?? "",
        email: userProfileData?.email ?? "",
        phoneNumber: userProfileData?.phoneNumber ?? "",
        countryName: "",
        countryCode: userProfileData?.countryCode ?? "",
      },
      mode: "onChange",
    });
  const editUserProfileMutation = useEditUserProfileMutation();
  const handleEditProfile = handleSubmit((values: any) => {
    editUserProfileMutation.mutate(
      {
        phoneNumber: values.phoneNumber,
        countryCode: values.countryCode,
        name: values.name,
        email: values.email,
        pic: imageData,
      },
      {
        onSuccess: (res) => {
          const { status, data } = res;
          if (status === 200) {
            if (userProfileData?.phoneNumber !== values.phoneNumber) {
              openPhoneEvent(values);
            } else {
              router.push("/profile");
              setEditProfileData(data.data);
              queryClient.refetchQueries(GET_PROFILE);
              setImageData(null);
              reset();
              setAuthValue({
                ...getAuthValue(),
                user: {
                  ...user,
                  isProfileCompleted: true,
                  name: data?.data?.name,
                  email: data?.data?.email,
                  pic: data?.data?.pic,
                },
              });
            }
          }
        },
      }
    );
  });
  const [imageUrl, setImageUrl] = useState<any>(
    editProfileData?.pic ?? undefined
  );
  const { language } = useAuthValue();
  return (
    <>
      {userProfileQuery?.isLoading && <Loader />}
      <section
        className={`bg-sky flex flex-wrap justify-center ${styles.salonWrapper}`}
      >
        <div className={`bg-white ${styles.salonProductDiv}`}>
          <div className={`${styles.editWrap} flex justify-start flex-col`}>
            <div className={`flex justify-start pl-[40px] pt-[35px]`}>
              <div
                className={` relative w-[100px] h-[100px] ${styles.userIMage}`}
              >
                <Image
                  src={
                    imageData
                      ? imageUrl
                      : userProfileData?.pic
                      ? `${FILE_URL}${userProfileData?.pic}`
                      : images?.userProfileImg
                  }
                  alt="profile"
                  layout="fill"
                  width="100%"
                  height="100%"
                  objectFit="cover"
                />
              </div>

              <div
                className={
                  language === "ar"
                    ? `${styles.Profile} mt-[28px] ml-[20px] ${styles.arabicProfile} mt-[28px] ml-[0px] mr-[20px] `
                    : ` ${styles.formInp} mt-[28px] ml-[20px]`
                }
              >
                <button
                  className={`py-[13px] pl-[22px] pr-[21px] font-[500] text-[15px] ${styles.photoBtn}`}
                >
                  <input
                    type="file"
                    id="uploadFile"
                    className={styles.uploadFile}
                    accept="image/jpeg"
                    multiple={false}
                    onChange={(e: any) => {
                      setImageData(e?.target?.files[0]);
                      setImageUrl(URL.createObjectURL(e?.target?.files[0]));
                    }}
                  />
                  <label htmlFor="uploadFile"> {strings?.change_photo}</label>
                </button>
              </div>
            </div>
            <div
              className={
                language === "ar"
                  ? `${styles.formInp} pl-[40px] pt-[35px] ${styles.arabiformInp} pl-[40px] pt-[35px] `
                  : ` ${styles.formInp} pl-[40px] pt-[35px]`
              }
            >
              <form className={styles.signupForm} onSubmit={handleEditProfile}>
                <FormBuilder
                  control={control}
                  formState={formState}
                  trigger={trigger}
                  setValue={setValue}
                  formConfigArray={[
                    // ==================Adress-Input================//

                    [
                      {
                        name: "name",
                        type: "text",
                        label: strings?.name,
                        textInputProps: {
                          placeholder: "Enter user name",
                        },
                        rules: getRequiredRules("Name"),
                      },
                      {
                        name: "email",
                        type: "email",
                        label: strings?.email_address,
                        textInputProps: {
                          placeholder: "Enter email id",
                        },
                        rules: getEmailValidationRules(),
                      },
                    ],
                    // ==================Adress-Input-close================

                    // =============About-company-input==============
                    [
                      {
                        name: "phoneNumber",
                        type: "phone",
                        label: strings?.phone_number,
                        inputProps: {
                          placeholder: strings?.enter_phone_number,
                        },
                        rules: getPhoneNumberValidationRules(
                          watch("countryCode")
                        ),
                        callingCodeName: "countryCode",
                        countryName: "countryName",
                        value: `${watch("countryCode")}${watch("phoneNumber")}`,
                      },
                    ],
                    // =============About-company-close==============
                  ]}
                />

                {/* button */}
                <button
                  type="submit"
                  className="max-w-[300px] mt-[25px] text-17 font-medium bg-primary w-full text-white rounded-[30px] min-h-[54px]"
                >
                  {strings?.update_now}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ProfilePhoneOtpModal />
    </>
  );
}
export default EditUserProfile;
