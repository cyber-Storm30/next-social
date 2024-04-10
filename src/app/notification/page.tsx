import React from "react";
import styles from "./notification.module.css";
import LeftBar from "@/components/(ui)/LeftBar/LeftBar";
import RightBar from "@/components/(ui)/RightBar/RightBar";
import NotificationSection from "@/components/(ui)/NotificationSection/NotificationSection";

const Notification = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LeftBar />
      </div>
      <div className={styles.center}>
        <NotificationSection />
      </div>
      <div className={styles.right}>
        <RightBar />
      </div>
    </div>
  );
};

export default Notification;
