import React from "react";
import styles from "./endcomponent.module.css";

const EndComponent = () => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>It looks like you've reached the end.</p>
    </div>
  );
};

export default EndComponent;
