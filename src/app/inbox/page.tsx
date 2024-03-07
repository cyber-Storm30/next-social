"use client";

import React, { useEffect, useState } from "react";
import styles from "./inbox.module.css";
import InboxFeed from "@/components/(ui)/InboxFeed/InboxFeed";
import InboxLeft from "@/components/(ui)/InboxLeft/InboxLeft";
import io from "socket.io-client";
import { SOCKET_URI } from "@/services/rootService";

const Inbox = () => {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = io(SOCKET_URI);
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
