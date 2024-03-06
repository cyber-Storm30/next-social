import React, { useEffect, useState } from "react";
import styles from "./likeCard.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";
import { sendConnectionRequest } from "@/services/connectionService";

interface LikeInterface {
  _id: string;
  username: string;
  email: string;
  image: string;
  req_sent_to?: string[];
  req_received_from?: string[];
  connections?: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface LikeCardInterface {
  data: LikeInterface;
}

const LikeCard: React.FC<LikeCardInterface> = (props) => {
  const { data } = props;

  console.log("like card", data);
  const user = useSelector((state: any) => state.auth.user);
  const [isReqSent, setIsReqSent] = useState<boolean>(false);

  const [isConnected, setIsConnected] = useState<boolean>(false);
  useEffect(() => {
    if (data?.req_received_from) {
      setIsReqSent(data?.req_received_from.includes(user?._id));
    }
  }, [data]);

  useEffect(() => {
    if (data?.connections) {
      setIsConnected(data?.connections.includes(user?._id));
    }
  }, [data]);

  const handleConnect = async (senderId: string, receiverId: string) => {
    try {
      setIsReqSent(true);
      const res = await sendConnectionRequest(senderId, receiverId);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.userDetails}>
        <div className={styles.imgWrapper}>
          <Image
            src={data?.image.length > 0 ? data.image : "/people.png"}
            alt=""
            fill
            className={styles.profileImg}
          />
        </div>
        <div className={styles.detailsWrapper}>
          <p className={styles.name}>{data?.username}</p>
        </div>
      </div>
      {isConnected ? (
        <button className={styles.buttonAlt}>Connected</button>
      ) : (
        <>
          {!isReqSent ? (
            <button
              className={styles.button}
              onClick={() => {
                handleConnect(user?._id, data?._id);
              }}
            >
              Connect
            </button>
          ) : (
            <button className={styles.buttonAlt}>Request Sent</button>
          )}
        </>
      )}
    </div>
  );
};

export default LikeCard;
