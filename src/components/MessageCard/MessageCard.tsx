import React from "react";
import styles from "./messagecard.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";

interface MessageCardProps {
  image: string;
  content: string;
  senderId: string;
}

const MessageCard: React.FC<MessageCardProps> = (props) => {
  const { image, content, senderId } = props;

  const user = useSelector((state: any) => state.auth.user);
  return (
    <div
      className={
        user?._id === senderId ? styles.containerAlt : styles.container
      }
    >
      <div className={styles.imgWrapper}>
        <Image fill src={image} alt="" className={styles.img} />
      </div>
      <p>{content}</p>
    </div>
  );
};

export default MessageCard;
