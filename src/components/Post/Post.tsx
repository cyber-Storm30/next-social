import React, { useEffect, useState } from "react";
import styles from "./post.module.css";
import Image from "next/image";
import { formatDate } from "@/utils/helper";
import { IconButton } from "@mui/material";
import { handleLikePost } from "@/services/postService";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

interface PostInterface {
  data: {
    _id: string;
    body: string;
    comments: Comment[];
    image: string;
    likes: any[];
    title: string;
    userId: UserInterface;
    createdAt: string;
  };
}

interface UserInterface {
  _id: string;
  createdAt: string;
  email: string;
  image: string;
  password: string;
  updatedAt: string;
  username: string;
}

const Post: React.FC<PostInterface> = (props) => {
  const { data } = props;
  const loggedInUser = useSelector((state: any) => state.auth.user);
  const loggedInUserId = loggedInUser?._id;
  const router = useRouter();

  const [isLiked, setIsLiked] = useState<boolean>(
    data?.likes?.includes(loggedInUserId)
  );

  const [likeCount, setLikeCount] = useState<number>(0);

  useEffect(() => {
    const userHasLiked = data?.likes?.includes(loggedInUserId);
    setIsLiked(userHasLiked);
    setLikeCount(data?.likes?.length);
  }, [data?.likes, loggedInUserId]);

  const toogleLike = async () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      setIsLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCount + 1);
    }
    try {
      const res = await handleLikePost(data?._id, loggedInUserId);
      console.log(res);
      if (res.status === 500) {
        alert("Something went wrong,try again later");
      }
    } catch (err) {}
  };

  const handleNavigation = () => {
    router.push(`/post/${data?._id}`);
  };

  return (
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
          <p className={styles.name}>{data?.userId?.username}</p>
          <p className={styles.time}>{formatDate(data?.createdAt)}</p>
        </div>
        <p className={styles.desc}>{data?.body}</p>
        {data?.image?.length > 0 && (
          <div className={styles.postImgWrapper} onClick={handleNavigation}>
            <Image src={data?.image} fill className={styles.postImg} alt="" />
          </div>
        )}
        <div className={styles.optionWrapper}>
          <div className={styles.option}>
            {!isLiked ? (
              <IconButton onClick={toogleLike}>
                <div className={styles.iconWrapper}>
                  <Image src="/upArrow.png" alt="" fill />
                </div>
              </IconButton>
            ) : (
              <IconButton onClick={toogleLike}>
                <div className={styles.iconWrapper}>
                  <Image src="/upArrowFilled.png" alt="" fill />
                </div>
              </IconButton>
            )}
            <p className={styles.optionValue}>{likeCount}</p>
          </div>
          <div className={styles.option}>
            <IconButton onClick={handleNavigation}>
              <div className={styles.iconWrapper}>
                <Image src="/message.png" alt="" fill />
              </div>
            </IconButton>
            <p className={styles.optionValue}>{data?.comments?.length}</p>
          </div>
          <div className={styles.option}>
            <IconButton>
              <div className={styles.iconWrapper}>
                <Image src="/reshare.png" alt="" fill />
              </div>
            </IconButton>
          </div>
          <div className={styles.option}>
            <IconButton>
              <div className={styles.iconWrapper}>
                <Image src="/share.png" alt="" fill />
              </div>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
