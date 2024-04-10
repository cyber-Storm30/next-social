import React from "react";
import styles from "./notification.module.css";
import Image from "next/image";

interface User {
  _id: string;
  username: string;
  email: string;
  image: string;
  req_sent_to: string[];
  req_received_from: string[];
  connections: string[];
  updatedAt: string;
  __v: number;
}

interface Post {
  _id: string;
  userId: User;
  body: string;
  comments: Comment[];
  image?: string;
  likedUsers: User[];
  likes: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Comment {
  commentId?: string;
  createdAt: string;
  isRead: boolean;
  postId: string;
  body: string;
  comments?: Comment[];
}

interface Notification {
  data: {
    _id: string;
    type: string;
    sender: User;
    receiver: User;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

const NotificationCard: React.FC<Notification> = (props) => {
  const { data } = props;
  return (
    <div className={styles.container}>
      {data?.type === "LIKE POST" && (
        <div className={styles.notificationCard}>
          <div className={styles.imgWrapper}>
            <Image
              src={data.sender.image}
              alt=""
              fill
              className={styles.image}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCard;
