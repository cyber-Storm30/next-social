"use client";
import React from "react";
import styles from "./leftbar.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LeftBar = () => {
  const router = useRouter();
  const items = [
    {
      title: "Feed",
      icon: "/home.png",
      onclick: () => {
        router.push("/");
      },
    },
    {
      title: "Inbox",
      icon: "/chat.png",
      onclick: () => {
        router.push("/inbox");
      },
    },
    {
      title: "Search",
      icon: "/search.png",
    },
  ];
  return (
    <div className={styles.container}>
      {items?.map((data, idx) => (
        <div key={idx} className={styles.optionWrapper} onClick={data?.onclick}>
          <div className={styles.iconWrapper}>
            <Image src={data?.icon} fill alt="" />
          </div>
          <p>{data.title}</p>
        </div>
      ))}
    </div>
  );
};

export default LeftBar;
