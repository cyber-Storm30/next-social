import React, { useEffect, useState } from "react";
import styles from "./replycomment.module.css";
import Image from "next/image";
import CommentInput from "../CommentInput/CommentInput";
import { formatDate } from "@/utils/helper";
import { useSelector } from "react-redux";
import {
  handleLikeComment,
  handleSubmitComment,
} from "@/services/commentService";

interface User {
  _id: string;
  createdAt: string;
  email: string;
  image: string;
  password: string;
  updatedAt: string;
  username: string;
}

interface ReplyCommentInterface {
  data: {
    _id: string;
    userId: User;
    postId: string;
    body: string;
    likes: string[];
    parentId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

const ReplyComment: React.FC<ReplyCommentInterface> = (props) => {
  const { data } = props;

  const [isCommentLiked, setIsCommentLiked] = useState<boolean>(false);
  const user = useSelector((state: any) => state.auth.user);
  const userId = user?._id;
  const [commentLikes, setCommentLikes] = useState<number>(data?.likes.length);

  useEffect(() => {
    const userHasLiked = data?.likes?.includes(userId);
    setIsCommentLiked(userHasLiked);
    setCommentLikes(data?.likes?.length);
  }, [data.likes, userId]);

  const likeComment = async () => {
    setIsCommentLiked(!isCommentLiked);
    if (isCommentLiked) {
      setIsCommentLiked(false);
      setCommentLikes(commentLikes - 1);
    } else {
      setIsCommentLiked(true);
      setCommentLikes(commentLikes + 1);
    }
    await handleLikeComment(data?._id, user?._id);
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.imgWrapper}>
          <Image
            src={
              data?.userId?.image.length > 0 ? data.userId.image : "/people.png"
            }
            alt=""
            fill
            className={styles.profileImg}
          />
        </div>
        <div className={styles.detailsWrapper}>
          <div className={styles.nameWrapper}>
            <p className={styles.name}>{data?.userId.username}</p>
            <p className={styles.time}>{formatDate(data?.createdAt)}</p>
          </div>
          <p className={styles.desc}>{data?.body}</p>

          <div className={styles.commnentOptionWrapper}>
            {isCommentLiked ? (
              <p className={styles.replyLiked} onClick={likeComment}>
                Liked {commentLikes}
              </p>
            ) : (
              <p className={styles.reply} onClick={likeComment}>
                Like {commentLikes}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyComment;
