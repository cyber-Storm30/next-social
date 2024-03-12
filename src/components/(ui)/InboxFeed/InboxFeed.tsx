"use client";

import React, { useEffect, useState } from "react";
import styles from "./inboxfeed.module.css";
import Image from "next/image";
import { getAllUserChats, sendMessage } from "@/services/chatService";
import { useDispatch, useSelector } from "react-redux";
import ChatSection from "../ChatSection/ChatSection";
import { AppDispatch } from "@/redux/store";
import { updateMessage } from "@/redux/ChatSlice";

interface InboxFeedProps {
  socket: any;
}

const InboxFeed: React.FC<InboxFeedProps> = ({ socket }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const user = useSelector((state: any) => state.auth.user);
  const participant = useSelector((state: any) => state.chat.user);
  const chatId = useSelector((state: any) => state.chat.chatId);

  const [message, setMessage] = useState<string>("");
  const [chats, setChats] = useState([]);

  const dispatch: AppDispatch = useDispatch();

  const handleClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllUserChats(user?._id);
        setChats(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await sendMessage(
        user?._id,
        participant?._id,
        message,
        chatId
      );
      if (res.status === 200) {
        socket.emit("sendMessage", {
          chatId: chatId,
          data: res.data,
        });
        setMessage("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (data: any) => {
        console.log("message received", data);
        dispatch(updateMessage(data));
      });
      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [socket]);

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.imgWrapper}>
          <Image src={participant?.image} alt="" fill className={styles.img} />
        </div>
        <p>{participant?.username}</p>
      </div>
      <div className={styles.chatSection}>
        <ChatSection />
      </div>
      <div className={styles.inputWrapper}>
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
            placeholder="Message..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <div className={styles.imgWrapper} onClick={handleSubmit}>
            <Image src="/upArrowNew.png" alt="" fill />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxFeed;
