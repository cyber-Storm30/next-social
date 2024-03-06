import React from "react";
import MessageCard from "@/components/MessageCard/MessageCard";
import { useSelector } from "react-redux";
import styles from "./chatsection.module.css";

const ChatSection = () => {
  const messages = useSelector((state: any) => state.chat.messages);
  const user = useSelector((state: any) => state.auth.user);

  return (
    <div className={styles.container}>
      {messages.length > 0 &&
        messages?.map((data: any, idx: number) => (
          <MessageCard
            key={idx}
            image={data?.sender?.image}
            content={data?.content}
            senderId={data?.sender?._id}
          />
        ))}
    </div>
  );
};

export default ChatSection;
