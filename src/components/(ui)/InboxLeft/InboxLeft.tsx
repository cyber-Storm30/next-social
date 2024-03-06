"use client";

import React, { useEffect, useState } from "react";
import styles from "./inboxleft.module.css";
import { useSelector } from "react-redux";
import { getAllUserChats } from "@/services/chatService";
import ChatPreview from "@/components/ChatPreview/ChatPreview";
import PendingRequestModal from "@/components/PendingRequestModal/PendingRequestModal";
import Image from "next/image";

interface InboxLeftProps {
  socket: any;
}

const InboxLeft: React.FC<InboxLeftProps> = ({ socket }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const user = useSelector((state: any) => state.auth.user);
  const [chats, setChats] = useState([]);

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

  return (
    <div className={styles.container}>
      <PendingRequestModal open={modalOpen} handleClose={handleClose} />
      <div className={styles.topWrapper}>
        <p>Inbox</p>
        <div
          className={styles.imgWrapper}
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <Image fill src="/pending.png" alt="" className={styles.img} />
        </div>
      </div>
      {chats?.map((data, idx) => (
        <ChatPreview data={data} socket={socket} />
      ))}
    </div>
  );
};

export default InboxLeft;
