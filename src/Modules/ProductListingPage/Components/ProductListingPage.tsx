import { Fragment, useState } from "react";
import styles from "./ProductListingPage.module.css";
import images from "src/Assets/images";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  FILE_URL,
  capitalizeFirstLetter,
  convertFirstLetterToUpperCaseWithSpace,
  dataLangTranslation,
  filterUrlData,
} from "src/Utils/Helpers";
import Loader from "src/Components/Loader/Loader";
import useProductListQuery from "src/Modules/CategoryModule/Hooks/useProductListQuery";
import FilterOffcanvas from "./filterOffcanvas/FilterOffcanvas";
import { Menu, Transition } from "@headlessui/react";
import Pagination from "src/Components/Pagination/Pagination";
import { strings } from "src/Utils/Localization";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";
// import FilterOffcanvas from "./filterOffcanvas/filterOffcanvas";
function ProductListingPage() {
  const [productCategoryId, setProductCategoryId] = useState("");
  const router = useRouter();
  const queryData: any = router?.query;
  const page = router?.query?.page ? Number(router?.query?.page) : 1;
  const subcategoryId = queryData?.subcategoryId;
  const { data, isLoading } = useProductListQuery(
    subcategoryId,
    productCategoryId
  );
  const productList = data?.data?.data?.list ?? [];
  const countPage: number = data?.data?.data?.count ?? 0;
  const limitPage: number = data?.data?.data?.limit ?? 0;
  const totalPages = Math.ceil(countPage / limitPage);
  const categoryName = encodeURIComponent(queryData?.categoryName);
  const subCategoryName = encodeURIComponent(queryData?.subname);
  const [show, setShow] = useState<boolean>(false);
  const filterHandleClick = () => {
    setShow(true);
  };
  const sortData = [
    {
      label: strings?.popularity,
      value: "popularitySort?-1",
      key: "productSort",
    },
    {
      label: strings?.price_low_to_high,
      value: "priceSort?1",
      key: "productSort",
    },
    {
      label: strings?.Price_high_to_low,
      value: "priceSort?-1",
      key: "productSort",
    },
    { label: strings?.newest, value: "newestSort?-1", key: "productSort" },
  ];
  const routerName =
    router.asPath?.split("?")[0] == "/product-list"
      ? `product-list`
      : `search-product`;
  const { language } = useAuthValue();

  return (
    <>
      {isLoading && <Loader />}
      <section className="py-[15px] bg-sky">
        <div className={styles.ProductListingPage}>
          {productList?.length !== 0 ? (
            <div className={styles.buttonsWrap}>
              {/* <select className={styles.btnFlex}>
              <Image src={images.sort} alt="sort" />
              <option selected>Sort</option>
              <option value="">Popularity</option>
              <option value="">Price(Low to High)</option>
              <option value="">Price(High to Low)</option>
              <option value="">Newest</option>
            
            </select> */}
              <div className={styles.dropdownBox}>
                <Menu as="div" className="relative inline-block ">
                  <Menu.Button
                    className={`${styles.munuBtnCustom} flex items-center font-[500] text-[14px]`}
                  >
                    <Image src={images.sort} alt="sort" />
                    <span className="text-[#52A5FF] font-[500] text-[14px]">
                      {strings?.sort_by}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M11.9995 15.0006L7.75684 10.758L9.17106 9.34375L11.9995 12.1722L14.8279 9.34375L16.2421 10.758L11.9995 15.0006Z"
                        fill="#44779D"
                      />
                    </svg>
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      className={`${styles.dropdownMenu} absolute right-0  min-w-[200px] bg-[#F1F6FC]  origin-top-right px-[20px] py-[16px] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[99]`}
                    >
                      {sortData?.map((item) => {
                        return (
                          <Menu.Item>
                            <button
                              className={`${styles.dropdownCustom}  flex  items-center gap-[10px] rounded-[10px]  text-[14px]`}
                              value={item?.value}
                              onClick={(e: any) =>
                                filterUrlData(
                                  router,
                                  routerName,
                                  item?.key,
                                  item?.value
                                )
                              }
                            >
                              {item?.label}
                            </button>
                          </Menu.Item>
                        );
                      })}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

              <button
                type="button"
                className={styles.btnFlex}
                onClick={filterHandleClick}
              >
                <Image src={images.filter} alt="filter" />
                <span className={`${styles.filterBtn} `}>
                  {strings?.filter}
                </span>
              </button>
            </div>
          ) : (
            <Fragment />
          )}
          {productList?.length !== 0 ? (
            productList?.map((_products, index) => {
              return (
                <div
                  className={styles.ProductListing}
                  key={`_products${index}`}
                  onClick={() =>
                    router.push(
                      `/product-list/${
                        _products?.products?._id
                      }?productName=${dataLangTranslation(
                        convertFirstLetterToUpperCaseWithSpace(
                          _products?.products?.name
                        ),
                        _products?.products?.arName
                      )}&subname=${subCategoryName}&subcategoryId=${
                        queryData?.subcategoryId
                      }&categoryName=${categoryName}&categoryId=${
                        queryData?.categoryId
                      }&vendorName=${
                        _products?.vendor?.vendorId?.businessName
                      }&vendorImage=${_products?.vendor?.logo}`
                    )
                  }
                >
                  <div className={`${styles.listing} flex justify-between`}>
                    <div className={`${styles.leftDetail} flex gap-5`}>
                      <figure className="relative rounded-[10px]">
                        <div
                          className={`${styles.profileListingImage} relative w-[200px] h-[200px]`}
                        >
                          <Image
                            src={
                              _products?.vendor
                                ? `${FILE_URL}${_products?.products?.photos}`
                                : images.profileListingImg
                            }
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <small className={styles.smallText}>
                          {dataLangTranslation(
                            convertFirstLetterToUpperCaseWithSpace(
                              _products?.products?.name
                            ),
                            _products?.products?.arName
                          )}
                        </small>
                      </figure>
                      <div className="productDetail">
                        <h3 className="text-[20px] font-[700] text-black">
                          {dataLangTranslation(
                            convertFirstLetterToUpperCaseWithSpace(
                              _products?.products?.name
                            ),
                            _products?.products?.arName
                          )}
                        </h3>
                        <h4
                          className={`${styles.titleFour} text-[16px] font-[700] text-black`}
                        >
                          SAR {_products?.products?.price}
                        </h4>

                        <div className={styles.descriptionProd}>
                          <h4 className="text-[10px] font-[700] text-Black pt-1.5">
                            {strings?.description}
                          </h4>
                          <p className="text-[10px] font-[400] text-lightBlack py-1.5">
                            {_products?.products?.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={styles.rightDetail}>
                      <article className="flex gap-2.5 items-center pb-2.5">
                        <Image src={images.productInfo} alt="productInfo" />
                        <h4
                          className={`${styles.titleProd} text-[12px] font-[700] text-black`}
                        >
                          {_products?.vendor?.name}
                        </h4>
                      </article>
                      <article className="flex gap-2.5 items-center pb-2.5">
                        <Image
                          src={images.locationProduct}
                          alt="locationProduct"
                        />
                        <h4
                          className={`${styles.titleProd} text-[12px] font-[500] text-gray`}
                        >
                          {capitalizeFirstLetter(_products?.vendor?.address)}
                        </h4>
                      </article>

                      <div
                        className={
                          language === "ar"
                            ? `${styles.ChatRow} flex flex-col gap-2.5 pb-5 pt-9 ${styles.arabicChatRow} `
                            : ` ${styles.chatRow} flex flex-col gap-2.5 pb-5 pt-9`
                        }
                      >
                        <button
                          type="button"
                          className={`${styles.chatbox} flex items-center gap-1`}
                        >
                          <Image src={images.chatImg} alt="chatImg" />
                          <span className="font-[700] text-[12px] text-[#80A0C7]">
                            {strings?.chat}
                          </span>
                        </button>
                        <button
                          type="button"
                          className={`${styles.Whatsappbox} flex items-center gap-2.5`}
                        >
                          <Image src={images.whatsappImg} alt="whatsappImg" />
                          <span className="font-[700] text-[12px] text-green">
                            {strings?.whatsaap}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <div className={styles.placeholderImg}>
                <Image
                  src={images.productPlaceholder}
                  alt="productPlaceholder"
                />
                <h5>{strings?.no_products_avl}</h5>
              </div>
            </>
          )}
        </div>
      </section>
      <FilterOffcanvas setShow={setShow} show={show} />
      {productList?.length !== 0 && productList !== undefined ? (
        <Pagination
          page={page}
          setPage={(_page: any) => {
            filterUrlData(router, routerName, "page", _page.toString());
          }}
          totalPages={totalPages}
        />
      ) : (
        <Fragment />
      )}
    </>
  );
}

export default ProductListingPage;
