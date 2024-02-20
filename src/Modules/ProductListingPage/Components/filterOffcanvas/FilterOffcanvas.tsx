import React, { useCallback, useEffect, useState } from "react";
import styles from "./FilterOffcanvas.module.css";
import { Tab } from "@headlessui/react";
// import RangeSlider from "react-range-slider-input";
// import "react-range-slider-input/dist/style.css";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import images from "src/Assets/images";
import Image from "next/image";
import { useRouter } from "next/router";
import { filterUrlData } from "src/Utils/Helpers";
import { strings } from "src/Utils/Localization";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";

function FilterOffcanvas(props: any) {
  const { show, setShow } = props;
  const router = useRouter();
  const [rangeValue, setRangeValue] = React.useState<
    | {
        min: number;
        max: number;
      }
    | any
  >({ min: 1, max: 1000 });
  const [distance, setDistance] = useState<any>(null);
  const [gender, setGender] = useState<any>(null);
  const [rating, setRating] = useState<any>(null);
  useEffect(() => {
    const price: any = router?.query?.price;
    setRangeValue({
      min: price ? JSON.parse(price)?.min : 1,
      max: price ? JSON.parse(price)?.max : 1000,
    });
  }, [router?.query?.price]);
  const priceSliderURLQuery = useCallback(
    (keyName: any, value: any) => {
      const data: any = router?.query;
      if (!value) {
        delete data[keyName];
      } else {
        data[keyName] = value;
      }
      const query = new URLSearchParams(data).toString();
      router.push(
        router.asPath?.split("?")[0] == "/product-list"
          ? `product-list?${query}`
          : `search-product?${query}`
      );
    },
    [router]
  );
  const distanceData = [
    { label: `10${strings?.km} & ${strings?.above}`, value: 10 },
    { label: `20${strings?.km} & ${strings?.above}`, value: 20 },
    { label: `30${strings?.km} & ${strings?.above}`, value: 30 },
    { label: `40${strings?.km} & ${strings?.above}`, value: 40 },
    { label: `50${strings?.km} & ${strings?.above}`, value: 50 },
    { label: `100${strings?.km} & ${strings?.above}`, value: 100 },
    { label: `150${strings?.km} & ${strings?.above}`, value: 150 },
    { label: `300${strings?.km} & ${strings?.above}`, value: 300 },
    { label: `500${strings?.km} & ${strings?.above}`, value: 500 },
    { label: `1000${strings?.km} & ${strings?.above}`, value: 1000 },
  ];
  const ratingData = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
  ];
  const routerName =
    router.asPath?.split("?")[0] == "/product-list"
      ? `product-list`
      : `search-product`;
  const removeAllFilter = (queryItem: any) => {
    let data = queryItem;
    if (data?.price || data?.ratingRange || data?.distance || data?.gender) {
      delete data["price"];
      delete data["ratingRange"];
      delete data["distance"];
      delete data["gender"];
    }
    const query = new URLSearchParams(data).toString();
    router.push(`${routerName}?${query}`);
  };
  const { language } = useAuthValue();

  return (
    <>
      <aside
        className={
          language === "ar"
            ? ` ${styles.sidebarMain} ${styles.arabicsidebarMain} `
            : ` ${styles.sidebarMain}`
        }
      >
        <div
          className={`${show && styles.menuOverlay}`}
          onClick={() => setShow(false)}
        />

        <article
          className={`${styles.menuContent} ${
            show ? styles.onOpen : styles.onClose
          } `}
        >
          <div
            className={
              language === "ar"
                ? ` ${styles.sidebarWrapper} ${styles.arabicSidebarWrapper} `
                : ` ${styles.sidebarWrapper}`
            }
          >
            <div className={styles.filterUpper}>
              <h4 className="text-[18px] font-[600] text-black">
                {strings.filter}
              </h4>
              <button
                className={`${styles.resetBtn} text-[16px] font-[500] text-primary`}
                onClick={() => removeAllFilter(router?.query)}
              >
                {strings?.reset_all_filters}
              </button>
            </div>
            <div className={styles.offCanvas}>
              <Tab.Group vertical>
                <Tab.List className={styles.canvasList}>
                  <Tab
                    onClick={() => {
                      !router?.query?.gender && setGender(null);
                      !router?.query?.rating && setRating(null);
                      !router?.query?.distance && setDistance(null);
                    }}
                  >
                    {strings?.price}
                  </Tab>
                  <Tab
                    onClick={() => {
                      !router?.query?.gender && setGender(null);
                      !router?.query?.price &&
                        setRangeValue({ min: 1, max: 1000 });
                      !router?.query?.distance && setDistance(null);
                    }}
                  >
                    {strings?.ratings}
                  </Tab>
                  <Tab
                    onClick={() => {
                      !router?.query?.price &&
                        setRangeValue({ min: 1, max: 1000 });
                      !router?.query?.rating && setRating(null);
                      !router?.query?.distance && setDistance(null);
                    }}
                  >
                    {strings?.ideal_for}
                  </Tab>
                  <Tab
                    onClick={() => {
                      !router?.query?.gender && setGender(null);
                      !router?.query?.rating && setRating(null);
                      !router?.query?.price &&
                        setRangeValue({ min: 1, max: 1000 });
                    }}
                  >
                    {strings?.distance}
                  </Tab>
                </Tab.List>
                <Tab.Panels className={styles.sideData}>
                  {/* ================Price Range================= */}
                  <Tab.Panel
                    className={
                      language === "ar"
                        ? ` ${styles.rangeSliderSec} ${styles.arabicRangeSliderSec} `
                        : ` ${styles.rangeSliderSec}`
                    }
                  >
                    <h3 className="text-[12px] font-[400] text-black">
                      {strings?.select_price_range}
                    </h3>
                    <InputRange
                      maxValue={1000}
                      step={1}
                      value={rangeValue}
                      minValue={1}
                      onChange={(values: any) => {
                        setRangeValue(values);
                      }}
                      onChangeComplete={(values: any) => {
                        setRangeValue(values);
                      }}
                    />
                    <div className={styles.rangeCount}>
                      <span className="text-[14px] font-[400] text-gray">
                        {strings?.price}:{" "}
                        <span className="text-[#52A5FF] font-[600]">
                          SAR {rangeValue?.min} — SAR {rangeValue?.max}
                        </span>
                      </span>
                    </div>
                    <div className={styles.buttonsWrapper}>
                      <button
                        className={styles.applyBtn}
                        onClick={() =>
                          priceSliderURLQuery(
                            "price",
                            JSON.stringify(rangeValue)
                          )
                        }
                      >
                        {strings?.apply_filter}
                      </button>
                      <button
                        className="text-primary"
                        type="button"
                        onClick={() => {
                          setShow(false);
                          !router?.query?.price &&
                            setRangeValue({ min: 1, max: 1000 });
                        }}
                      >
                        {strings?.close}
                      </button>
                    </div>
                  </Tab.Panel>
                  {/* ================Price Range================= */}
                  {/* ==============Rating============== */}
                  <Tab.Panel>
                    <div className={styles.ratingSection}>
                      {ratingData?.map((item) => {
                        return (
                          <div className={styles.Cat}>
                            <label className={styles.containers}>
                              <input
                                type="radio"
                                name="filterRadio"
                                checked={
                                  rating != null
                                    ? item?.value === rating
                                    : item?.value === router?.query?.ratingRange
                                }
                                value={item?.value}
                                onChange={(e) => setRating(e?.target?.value)}
                              />
                              <p className={styles.rating}>
                                {item?.label}
                                <figure>
                                  <em>
                                    <Image src={images.yellowStar} />
                                  </em>
                                </figure>
                                & {strings?.above}
                              </p>
                              <span className={styles.checkmark}></span>
                            </label>
                          </div>
                        );
                      })}
                      <div className={styles.buttonsWrapper}>
                        <button
                          className={styles.applyBtn}
                          onClick={() => {
                            filterUrlData(
                              router,
                              routerName,
                              "ratingRange",
                              rating
                            ),
                              setRating(null);
                          }}
                          disabled={!rating}
                        >
                          {strings?.apply_filter}
                        </button>
                        <button
                          className="text-primary"
                          type="button"
                          onClick={() => {
                            setShow(false),
                              !router?.query?.rating && setRating(null);
                          }}
                        >
                          {strings?.close}
                        </button>
                      </div>
                    </div>
                  </Tab.Panel>
                  {/* ==============Rating============== */}

                  {/* =============Ideal For============ */}
                  <Tab.Panel>
                    <div className={styles.idealFor}>
                      {[strings?.male, strings?.female].map((item) => {
                        return (
                          <div className={styles.Cat}>
                            <label className={styles.containers}>
                              <input
                                type="radio"
                                name="idealFor"
                                value={item}
                                checked={
                                  gender !== null
                                    ? item === gender
                                    : item === router?.query?.gender
                                }
                                onChange={(e) => setGender(e?.target?.value)}
                              />
                              {item}
                              <span className={styles.checkmark}></span>
                            </label>
                          </div>
                        );
                      })}
                      <div className={styles.buttonsWrapper}>
                        <button
                          className={styles.applyBtn}
                          onClick={() => {
                            filterUrlData(router, routerName, "gender", gender),
                              setGender(null);
                          }}
                          disabled={!gender}
                        >
                          {strings?.apply_filter}
                        </button>
                        <button
                          className="text-primary"
                          type="button"
                          onClick={() => {
                            setShow(false),
                              !router?.query?.gender && setGender(null);
                          }}
                        >
                          {strings?.close}
                        </button>
                      </div>
                    </div>
                  </Tab.Panel>
                  {/* =============Ideal For============ */}
                  {/* ===============Distance============= */}
                  <Tab.Panel>
                    <div className={styles.categoryData}>
                      {distanceData?.map((item) => {
                        return (
                          <div className={styles.Cat}>
                            <label className={styles.containers}>
                              <input
                                type="radio"
                                name="distance"
                                value={item?.value * 1000}
                                checked={
                                  distance !== null
                                    ? Number(item?.value * 1000) === distance
                                    : Number(item?.value * 1000) ===
                                      Number(router?.query?.distance)
                                }
                                onChange={(e: any) =>
                                  setDistance(Number(e?.target?.value))
                                }
                              />
                              {item?.label}
                              <span className={styles.checkmark}></span>
                            </label>
                          </div>
                        );
                      })}
                      <div className={styles.buttonsWrapper}>
                        <button
                          className={styles.applyBtn}
                          onClick={() => {
                            filterUrlData(
                              router,
                              routerName,
                              "distance",
                              distance
                            ),
                              setDistance(null);
                          }}
                          disabled={!distance}
                        >
                          {strings?.apply_filter}
                        </button>
                        <button
                          className="text-primary"
                          type="button"
                          onClick={() => {
                            setShow(false);
                            !router?.query?.distance && setDistance(null);
                          }}
                        >
                          {strings?.close}
                        </button>
                      </div>
                    </div>
                  </Tab.Panel>
                  {/* ===============Distance============= */}
                </Tab.Panels>
                {/* <ApplyFilter/> */}
              </Tab.Group>
            </div>
          </div>
        </article>
      </aside>
    </>
  );
}

export default FilterOffcanvas;
