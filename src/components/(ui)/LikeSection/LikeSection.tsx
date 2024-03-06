import CommentCard from "@/components/CommentCard/CommentCard";
import React, { useEffect, useState } from "react";
import styles from "./likeSection.module.css";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import LikeCard from "@/components/LikeCard/LikeCard";
import EndComponent from "@/components/EndComponent/EndComponent";

interface LikeInterface {
  _id: string;
  username: string;
  email: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const LikeSection = () => {
  const post = useSelector((state: any) => state.post.singlePost);
  const user = useSelector((state: any) => state.auth.user);

  return (
    <div className={styles.container}>
      {post?.likedUsers?.map((data: LikeInterface, idx: number) => (
        <>{user?.email !== data?.email && <LikeCard data={data} key={idx} />}</>
      ))}
      <EndComponent />
    </div>
  );
};

export default LikeSection;
