import React, { useState } from "react";
import styles from "./pendingrequest.module.css";
import Image from "next/image";
import { accpetConnectionRequest } from "@/services/connectionService";
import { useSelector } from "react-redux";
import { createOneToOneChat } from "@/services/chatService";

interface PendingRequestCardProps {
  data: {
    sender: {
      _id: string;
      username: string;
      email: string;
      image: string;
      req_sent_to: string[];
      req_received_from: string[];
      connections: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
}

const PendingRequestCard: React.FC<PendingRequestCardProps> = (props) => {
  const { data } = props;

  const [accepted, setAccepted] = useState<boolean>(false);
  const user = useSelector((state: any) => state.auth.user);

  const handleAcceptToogle = async (senderId: string, receiverId: string) => {
    try {
      setAccepted(true);
      await accpetConnectionRequest(senderId, receiverId);
      await createOneToOneChat(senderId, receiverId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.detailsWrapper}>
        <div className={styles.imgWrapper}>
          <Image fill alt="" src={data?.sender?.image} className={styles.img} />
        </div>
        <p>{data?.sender?.username}</p>
      </div>
      {!accepted ? (
        <button
          className={styles.button}
          onClick={() => {
            handleAcceptToogle(data?.sender._id, user?._id);
          }}
        >
          Accept
        </button>
      ) : (
        <button className={styles.buttonAlt}>Accepted</button>
      )}
    </div>
  );
};

export default PendingRequestCard;
