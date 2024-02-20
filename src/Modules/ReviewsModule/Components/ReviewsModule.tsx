import styles from "./ReviewsModule.module.css";
import Image from "next/image";
import ReviewsModal, { openReview } from "./ReviewsModal/ReviewsModal";
import images from "src/Assets/images";
import useReviewListQuery from "../Hooks/useReviewListQuery";
import EditReviewModal, {
  editModal,
} from "src/Modules/ProductListingPage/Components/ProductView/ProductTabList/Reviews/EditReviewModal/EditReviewModal";
import { Rating } from "react-simple-star-rating";
import Pagination from "src/Components/Pagination/Pagination";
import { filterUrlData } from "src/Utils/Helpers";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { strings } from "src/Utils/Localization";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";

function ReviewsModule() {
  const router = useRouter();
  const page = router?.query?.page ? Number(router?.query?.page) : 1;
  const reviewListQuery = useReviewListQuery(page);
  const reviewListData = reviewListQuery?.data?.data?.data;
  const countPage: number = reviewListQuery?.data?.data?.data?.count ?? 0;
  const limitPage: number = reviewListQuery?.data?.data?.data?.limit ?? 0;
  const totalPages = Math.ceil(countPage / limitPage);
  const { language } = useAuthValue();

  return (
    <>
      {reviewListData?.list?.length !== 0 ? (
        <section
          className={`bg-globalColor flex flex-wrap justify-center ${styles.salonWrapper}`}
        >
          <div
            className={`bg-white px-[20px] py-[15px] ${styles.salonProductDiv}`}
          >
            <h6 className="font-[600] text-[14px]">
              {reviewListData?.count} {strings?.reviews}
            </h6>
            {/* hair cut 1 */}
            {reviewListData?.list?.map((item) => {
              return (
                <>
                  <div className={styles.reviewMainDiv}>
                    <div className="flex justify-between pt-[20px] items-center ssm:flex-wrap">
                    
                      <div
                        className={language==="ar"?`${styles.leftheading} flex items-center ${styles.arabicLeftheading} flex items-center `:` ${styles.leftheading} flex items-center`}
                      >
                        <h3 className="font-[600] text-[18px] capitalize">
                          {item?.userId?.name}
                        </h3>
                        <div
                          className={` ml-[12px] rounded-[17.5px]  ${styles.hairCutDiv}`}
                        >
                          <span className="text-[14px] font-[500] px-[15px] py-[7px]">
                            {item?.productId?.name}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => editModal(item)}
                        className={language==="ar"?` ${styles.editbtn} ${styles.arabicEditbtn} `:` ${styles.editbtn}`}
                      >
                        <div className="flex text-primary">
                          <div className={`${styles.reviewEdit} w-[18px] h-[18px] relative`}>
                            <Image src={images.edit} alt="edit" layout="fill"/>
                          </div>
                          <span className="pl-[8px] text-[14px] text-activeClr font-[500]">
                           {strings?.edit_ur_review}
                          </span>
                        </div>
                      </button>
                    </div>
                    <div>
                      <div className={`${styles.reviewStarDiv}`}>
                        <Rating
                          initialValue={item?.stars}
                          readonly={true}
                          size={20}
                        />
                      </div>
                      {/* <div
       className={`flex items-center pl-[15px] ml-[15px] ${styles.reviewLoc}`}
     >
       <div>
         <Image src={images.reviewLocIcon} alt="location" />
       </div>
       <span className="pl-[5px] mb-[7px] text-[13px] font-[400]">
         1901 Thornridge Cir. Shiloh, Hawaii 81063
       </span>
     </div> */}
                    </div>
                    <div className="pt-[16px]">
                      <h6 className="text-primary text-[13px] font-[500]">
                        {strings?.your_review}
                      </h6>
                      <p className="text-[12px] font-[400] text-slate pb-[15px]">
                        {item?.review}
                      </p>
                    </div>
                  </div>
                </>
              );
            })}

            {/* haircut 2 */}
            {/* <div className={styles.reviewMainDiv}>
            <div className="flex justify-between pt-[20px] items-center">
              <div className="flex items-center ">
                <h3 className="font-[600] text-[18px]">Haircut</h3>
                <div
                  className={` ml-[12px] rounded-[17.5px] w-[70px] ${styles.hairCutDiv}`}
                >
                  <span className="text-[14px] font-[500] px-[15px] py-[7px]">
                    Salon
                  </span>
                </div>
              </div>
              <div className="flex text-primary">
                <div className={styles.reviewEdit}>
                  <Image src={images.editImg} alt="edit" />
                </div>
                <span className="pl-[8px] text-[14px] font-[500]">
                  Edit Your Review
                </span>
              </div>
            </div>
            <div className="flex items-center pt-[10px]">
              <div className={styles.reviewStarDiv}>
                <Image src={images.reviewStarImg} alt="review" />
              </div>
              <div
                className={`flex items-center pl-[15px] ml-[15px] ${styles.reviewLoc}`}
              >
                <div>
                  <Image src={images.reviewLocIcon} alt="location" />
                </div>
                <span className="pl-[5px] mb-[7px] text-[13px] font-[400]">
                  1901 Thornridge Cir. Shiloh, Hawaii 81063
                </span>
              </div>
            </div>
            <div className="pt-[16px]">
              <h6 className="text-primary text-[13px] font-[500]">
                Your Review
              </h6>
              <p className="text-[12px] font-[400] text-slate pb-[15px]">
                Lorem ipsum dolor sit amet consectetur. Potenti turpis amet
                pharetra at dignissim neque accumsan. Egestas nam aliquet eget
                viverra sapien imperdiet potenti.
              </p>
            </div>
          </div> */}
            {/* hair cut 3 */}
            {/* <div className={styles.reviewMainDiv}>
            <div className="flex justify-between pt-[20px] items-center">
              <div className="flex items-center ">
                <h3 className="font-[600] text-[18px]">Haircut</h3>
                <div
                  className={` ml-[12px] rounded-[17.5px] w-[70px] ${styles.hairCutDiv}`}
                >
                  <span className="text-[14px] font-[500] px-[15px] py-[7px]">
                    Salon
                  </span>
                </div>
              </div>
              <div className="flex text-primary">
                <div className={styles.reviewEdit}>
                  <Image src={images.editImg} alt="edit" />
                </div>
                <span className="pl-[8px] text-[14px] font-[500]">
                  Edit Your Review
                </span>
              </div>
            </div>
            <div className="flex items-center pt-[10px]">
              <div className={styles.reviewStarDiv}>
                <Image src={images.reviewStarImg} alt="review" />
              </div>
              <div
                className={`flex items-center pl-[15px] ml-[15px] ${styles.reviewLoc}`}
              >
                <div>
                  <Image src={images.reviewLocIcon} alt="location" />
                </div>
                <span className="pl-[5px] mb-[7px] text-[13px] font-[400]">
                  1901 Thornridge Cir. Shiloh, Hawaii 81063
                </span>
              </div>
            </div>
            <div className="pt-[16px]">
              <h6 className="text-primary text-[13px] font-[500]">
                Your Review
              </h6>
              <p className="text-[12px] font-[400] text-slate pb-[15px]">
                Lorem ipsum dolor sit amet consectetur. Potenti turpis amet
                pharetra at dignissim neque accumsan. Egestas nam aliquet eget
                viverra sapien imperdiet potenti.
              </p>
            </div>
          </div> */}
          </div>
        </section>
      ) : (
        <p className={styles.noReviewfound}>{strings?.no_review_rating}</p>
      )}
      <EditReviewModal vendorProductListData={reviewListData?.list} />
      {reviewListData?.list?.length !== 0 &&
      reviewListData?.list !== undefined ? (
        <Pagination
          page={page}
          setPage={(_page: any) => {
            filterUrlData(router, "/reviews", "page", _page.toString());
          }}
          totalPages={totalPages}
        />
      ) : (
        <Fragment />
      )}
    </>
  );
}
export default ReviewsModule;
