import images from "src/Assets/images";
import styles from "./UserProfile.module.css";
import Image from "next/image";
import FormBuilder from "src/Components/FormBuilder/FormBuilder";
import { useForm } from "react-hook-form";
import {
  getRequiredRules,
  getEmailValidationRules,
  getPhoneNumberValidationRules,
} from "src/Utils/Validators";
import useUserProfileQuery from "../../Hooks/useUserProfileQuery";
import { useRouter } from "next/router";
import { FILE_URL } from "src/Utils/Helpers";
import Loader from "src/Components/Loader/Loader";
import { strings } from "src/Utils/Localization";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";

function UserProfile() {
  const router = useRouter();
  const { control, formState, watch, setValue, trigger, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      countryCode: "",
    },
    mode: "onChange",
  });
  const userProfileQuery = useUserProfileQuery((data: any) => {
    reset({
      name: data?.name,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      countryCode: data?.countryCode,
    });
  });
  const userProfileData = userProfileQuery?.data?.data?.data;
  const { language } = useAuthValue();

  return (
    <>
      {userProfileQuery?.isLoading && <Loader />}
      <section
        className={`bg-sky flex flex-wrap justify-center ${styles.salonWrapper}`}
      >
        <div className={`bg-white ${styles.salonProductDiv}`}>
          <div
            className={`${styles.editUserWrap} flex justify-between flex-col`}
          >
            <div className={`flex justify-between pl-[40px] pt-[35px]`}>
              <div
                className={` relative w-[100px] h-[100px] ${styles.userIMage}`}
              >
                <Image
                  src={
                    userProfileData?.pic !== null
                      ? `${FILE_URL}${userProfileData?.pic}`
                      : images.userProfileImg
                  }
                  alt="profile"
                  layout="fill"
                  width="100%"
                  height="100%"
                  objectFit="cover"
                />
              </div>
              {/* <div className={`mt-[28px] ml-[20px]`}>
                <button
                  className={`py-[13px] pl-[22px] pr-[21px] font-[500] text-[15px] ${styles.photoBtn}`}
                >
                  Change Photo
                </button>
              </div> */}
              <div>
                <>
                  <button
                    onClick={() => router.push("/edit-profile")}
                    className={styles.profileEditBtn}
                  >
                    <Image src={images.editProfileImg} />
                    {strings?.edit_profile}
                  </button>
                </>
              </div>
            </div>

            <div className={language==="ar"?`${styles.formInp} pl-[40px] pt-[35px] ${styles.arabiformInp} pl-[40px] pt-[35px] `:` ${styles.formInp} pl-[40px] pt-[35px]`}>
            
              <form className={styles.signupForm}>
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
                          placeholder: strings?.enter_user_name,
                          disabled: true, 
                        },
                        rules: getRequiredRules(strings?.enter_user_name),
                      },
                      {
                        name: "email",
                        type: "email",
                        label: strings?.email_address,
                        textInputProps: {
                          placeholder: strings?.enter_email_id,
                          disabled: true,
                        },
                        rules: getEmailValidationRules(strings?.enter_email_id),
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
                        disabledPhone: true,
                        rules: getPhoneNumberValidationRules(
                          watch("countryCode")
                        ),
                        callingCodeName: "countryCode",

                        value: `${watch("countryCode")}${watch("phoneNumber")}`,
                      },
                    ],
                    // =============About-company-close==============
                  ]}
                />

                {/* button */}
                {/* <button
                  type="submit"
                  className="max-w-[300px] mt-[25px] text-17 font-medium bg-primary w-full text-white rounded-[30px] min-h-[54px]"
                >
                  Update Now
                </button> */}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default UserProfile;
