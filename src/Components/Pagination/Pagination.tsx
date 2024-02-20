import React, { Dispatch } from "react";
import styles from "./Pagination.module.css";
import Image from "next/image";
import images from "src/Assets/images";

type PaginationProps = {
  page: number;
  setPage?: (page: number) => void;
  totalPages: number;
};
function Pagination(props: PaginationProps) {
  const { page = 1, setPage = () => {}, totalPages } = props;
  const totalPagesArr = [...Array(totalPages)].map((el, index) => index + 1);
  const [firstPage, ...restPages] = totalPagesArr;
  const lastPage = restPages[restPages.length - 1];

  return (
    <div className='main-container'>
      <div className="my-7 mb-5 ">
        <ul className={styles.paginationWrap}>
          <li
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          >
            <a>
              <Image src={images.leftArrowPagi} alt="img" />
            </a>
          </li>
          {firstPage < page - 1 && (
            <li onClick={() => setPage(firstPage)}>
              <a>{firstPage}</a>
            </li>
          )}
          {firstPage + 1 < page - 1 && <span>...</span>}
          {page - 1 > 0 && (
            <li onClick={() => setPage(page - 1)}>
              <a>{page - 1}</a>
            </li>
          )}
          <li onClick={() => setPage(page)} className={styles.active}>
            <a>{page}</a>
          </li>
          {page + 1 < lastPage + 1 && (
            <li onClick={() => setPage(page + 1)}>
              <a>{page + 1}</a>
            </li>
          )}
          {page + 1 < lastPage - 1 && <span>...</span>}
          {lastPage > page + 1 && (
            <li onClick={() => setPage(lastPage)}>
              <a>{lastPage}</a>
            </li>
          )}
          <li
            onClick={() => {
              if (page < totalPages) {
                setPage(page + 1);
              }
            }}
          >
            <a>
              <Image src={images.RightArrowPagi} alt="img" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Pagination;
