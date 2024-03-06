"use client";

import React, { useEffect, useState } from "react";
import styles from "./inbox.module.css";
import InboxFeed from "@/components/(ui)/InboxFeed/InboxFeed";
import InboxLeft from "@/components/(ui)/InboxLeft/InboxLeft";
import io from "socket.io-client";

const Inbox = () => {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5001");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <InboxLeft socket={socket} />
      </div>
      <div className={styles.center}>
        <InboxFeed socket={socket} />
      </div>
      <div className={styles.right}></div>
    </div>
  );
};

export default Inbox;
