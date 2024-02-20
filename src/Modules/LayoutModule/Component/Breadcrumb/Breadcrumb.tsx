import images from "src/Assets/images";
import Image from "next/image";
import styles from "./Breadcrumb.module.css";
import Link from "next/link";
import { Fragment } from "react";
import { BREADCRUMB } from "../../Types/ResponseTypes";
import { useRouter } from "next/router";
import { getAuthValue } from "src/Modules/AuthModule/Hooks/useAuthValue";

type BREAD_CRUMB_PROPS = {
  routes?: Array<BREADCRUMB>;
  title?: string;
};

function Breadcrumb(props: BREAD_CRUMB_PROPS) {
  const { routes, title } = props;
  const router = useRouter();
  const { language } = getAuthValue();
  return (
    <>
      <section className="bg-subprimary ">
        <div className={`bg-subPrimary py-1.5 `}>
          <div className="main-container">
            <div className={`flex flex-row ${styles.salonHeadDiv}`}>
              <div className="w-[26px] h-[28px] relative">
                {/* <Image
                  onClick={() =>
                    !routes || routes.length === 0
                      ? router.push("/")
                      : router?.back()
                  }
                  src='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>'
                  className={
                    language === "en" ? styles.backArrow : styles.arbBackArrow
                  }
                  alt="backArrow"
                  layout="fill"
                /> */}
                <svg
                fill="white"
                 onClick={() =>
                  !routes || routes.length === 0
                    ? router.push("/")
                    : router?.back()
                } 
                 className={
                    language !== "en" ? styles.backArrow : styles.arbBackArrow 
                  } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
              </div>
              <div
                className={`${styles.BreadcrumbList} ml-15px flex gap-[10px]`}
              >
                {routes?.map((item, index) => {
                  return (
                    <Fragment key={`item${index}`}>
                      {routes?.length - 1 !== index ? (
                        <>
                          <li>
                            <Link href={item?.path ?? ""} passHref>
                              <a>{item?.title}</a>
                            </Link>
                          </li>
                          <li>&#47;</li>
                        </>
                      ) : (
                        <>
                          <li className={styles.activeBreadCrumb}>
                            {item?.title}
                          </li>
                        </>
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Breadcrumb;
