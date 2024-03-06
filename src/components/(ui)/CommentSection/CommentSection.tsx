import CommentCard from "@/components/CommentCard/CommentCard";
import { getPostComments } from "@/services/commentService";
import React, { useEffect, useState } from "react";
import styles from "./commentSection.module.css";
import { CircularProgress } from "@mui/material";
import EndComponent from "@/components/EndComponent/EndComponent";

interface CommentInterface {
  comments?: any[];
  loading: boolean;
}

const CommentSection: React.FC<CommentInterface> = (props) => {
  const { comments, loading } = props;
  const rootComments = comments?.filter((comments) => comments.parentId === "");

  const getReplies = (commentId: string) => {
    return comments
      ?.filter((comments) => comments.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };

  return (
    <div className={styles.container}>
      {!loading ? (
        <>
          {rootComments?.map((data, idx) => (
            <CommentCard
              key={idx}
              data={data}
              replies={getReplies(data?._id)}
            />
          ))}
          <EndComponent />
        </>
      ) : (
        <CircularProgress
          style={{ color: "white", width: "20px", height: "20px" }}
        />
      )}
    </div>
  );
};

export default CommentSection;
