import React from "react";
import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.load}></div>
    </div>
  );
}

export default Loader;
