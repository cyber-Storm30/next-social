import React, { useState } from "react";
import styles from "./commentinput.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";

interface CommentInputProps {
  submitComment: (comment: string) => void;
  page?: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  isReply?: boolean;
}

const CommentInput: React.FC<CommentInputProps> = (props) => {
  const { submitComment, page, setPage, isReply } = props;
  const user = useSelector((state: any) => state.auth.user);
  const [comment, setComment] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = () => {
    submitComment(comment);
    setComment("");
  };

  console.log("comment input", user);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.imgWrapperAlt}>
            <Image
              src={user?.image?.length > 0 ? user?.image : "/people.png"}
              alt=""
              fill
              style={{ borderRadius: "50%" }}
            />
          </div>
          <input
            className={styles.input}
            placeholder="Post a comment"
            onChange={handleInputChange}
            value={comment}
          />
          <div className={styles.imgWrapper} onClick={handleSubmitComment}>
            <Image src="/upArrowNew.png" alt="" fill />
          </div>
        </div>
      </div>
      {!isReply && (
        <div className={styles.toggleWrapper}>
          <p
            className={
              page === 0
                ? styles.toggleWrapperTextClicked
                : styles.toggleWrapperText
            }
            onClick={() => {
              setPage && setPage(0);
            }}
          >
            COMMENTS
          </p>
          <p
            className={
              page === 1
                ? styles.toggleWrapperTextClicked
                : styles.toggleWrapperText
            }
            onClick={() => {
              setPage && setPage(1);
            }}
          >
            UPPLAUDS
          </p>
        </div>
      )}
    </div>
  );
};

export default CommentInput;
