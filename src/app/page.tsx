"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Feed from "@/components/(ui)/Feed/Feed";
import { useAuth } from "@/hooks/useAuth";
import { boolean } from "zod";
import { useRouter } from "next/navigation";
import LeftBar from "@/components/(ui)/LeftBar/LeftBar";
import RightBar from "@/components/(ui)/RightBar/RightBar";

interface AuthInterface {
  success: boolean;
  userId: string;
}

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const getAuthHook = async () => {
      const { success } = await useAuth();
      if (success === false) {
        router.push("/notAuthorised");
      }
    };
    getAuthHook();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LeftBar />
      </div>
      <div className={styles.center}>
        <Feed />
      </div>
      <div className={styles.right}>
        <RightBar />
      </div>
    </div>
  );
};

export default Home;
