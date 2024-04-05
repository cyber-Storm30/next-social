import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import styles from "./NotificationModal.module.css";
import io from "socket.io-client";

interface NotificationModalProps {
  open: boolean;
  handleModalClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  open,
  handleModalClose,
}) => {
  const [notifications, setNotifications] = useState<[]>([]);

  useEffect(() => {
    const socket = io("http://localhost:8008");
    socket.on("notifications", (notificationData) => {
      console.log("N", notificationData);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
    >
      <div className={styles.container}>feniw</div>
    </Modal>
  );
};

export default NotificationModal;
