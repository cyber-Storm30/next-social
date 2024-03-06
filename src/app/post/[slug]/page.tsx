"use client";

import React, { useEffect } from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { handleGetSinglePost } from "@/services/postService";
import SingleFeed from "@/components/(ui)/SingleFeed/SingleFeed";
import styles from "./singlepost.module.css";
import LeftBar from "@/components/(ui)/LeftBar/LeftBar";

interface MyApiParams {
  params: {
    slug: string;
  };
}

const SinglePost: React.FC<MyApiParams> = ({ params }) => {
  const dispatch: AppDispatch = useDispatch();

  const { slug } = params;

  useEffect(() => {
    dispatch(handleGetSinglePost(slug));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <LeftBar />
      </div>
      <div className={styles.center}>
        <SingleFeed />
      </div>
      <div className={styles.right}></div>
    </div>
  );
};

export default SinglePost;
