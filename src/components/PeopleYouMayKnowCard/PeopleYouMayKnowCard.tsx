import React, { useEffect, useState } from "react";
import styles from "./peopleyoumayknowcard.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";
import { sendConnectionRequest } from "@/services/connectionService";

interface PeopleYouMayKnowCardProps {
  data: {
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
}

const PeopleYouMayKnowCard: React.FC<PeopleYouMayKnowCardProps> = (props) => {
  const { data } = props;
  const [isReqSent, setIsReqSent] = useState<boolean>(false);

  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    setIsReqSent(data?.req_received_from.includes(user?._id));
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
      <div className={styles.detailsWrapper}>
        <div className={styles.imgWrapper}>
          <Image src={data?.image} fill alt="" className={styles.img} />
        </div>
        <p>{data?.username}</p>
      </div>
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
    </div>
  );
};

export default PeopleYouMayKnowCard;
