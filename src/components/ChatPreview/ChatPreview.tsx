import React from "react";
import styles from "./chatpreview.module.css";
import Image from "next/image";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { handleGetMessages } from "@/services/chatService";
import { selectUser } from "@/redux/ChatSlice";
import io from "socket.io-client";

interface User {
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
}

interface ChatPreviewProps {
  data: {
    _id: string;
    users: User[];
  };
  socket: any;
}

const ChatPreview: React.FC<ChatPreviewProps> = (props) => {
  const { data, socket } = props;
  const sender = data?.users[0];
  const user = useSelector((state: any) => state.auth.user);

  const dispatch: AppDispatch = useDispatch();

  const handleOpenChat = async () => {
    socket.emit("joinRoom", {
      user: user?._id,
      room: data?._id,
    });
    dispatch(
      selectUser({
        chatId: data?._id,
        user: sender,
      })
    );
    dispatch(handleGetMessages(data?._id));
  };

  return (
    <div className={styles.container} onClick={handleOpenChat}>
      <div className={styles.imgWrapper}>
        <Image src={sender?.image} alt="" fill className={styles.profileImg} />
      </div>
      <div className={styles.nameWrapper}>
        <p className={styles.name}>{sender?.username}</p>
        <p className={styles.time}>tap to chat</p>
      </div>
    </div>
  );
};

export default ChatPreview;
