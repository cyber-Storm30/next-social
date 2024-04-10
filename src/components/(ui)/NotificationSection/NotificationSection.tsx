"use client";

import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import styles from "./NotificationModal.module.css";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import SearchBar from "@/components/SearchBar/SearchBar";
import EndComponent from "@/components/EndComponent/EndComponent";
import { handleGetNotifications } from "@/services/notificationService";
import NotificationCard from "@/components/NotificationCard/NotificationCard";

interface NotificationSectionProps {}

const NotificationSection: React.FC<NotificationSectionProps> = () => {
  const [notifications, setNotifications] = useState<[]>([]);

  const user = useSelector((state: any) => state.auth.user);
  useEffect(() => {
    const socket = io("http://localhost:8008");

    socket.emit("join", user?._id);
    socket.on("notifications", (notificationData) => {
      console.log("N data", notificationData);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const getNotifications = async () => {
      const response = await handleGetNotifications(user?._id);
      setNotifications(response.data);
    };
    getNotifications();
  }, []);

  return (
    <div>
      <SearchBar />
      {notifications?.map((data, idx) => (
        <NotificationCard key={idx} data={data} />
      ))}
      <EndComponent />
    </div>
  );
};

export default NotificationSection;
