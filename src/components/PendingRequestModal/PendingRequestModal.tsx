import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import styles from "./pendingrequestmodal.module.css";
import PendingRequestCard from "../PendingRequestCard/PendingRequestCard";
import { getPendingConnectionRequests } from "@/services/connectionService";
import { useSelector } from "react-redux";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}

const PendingRequestModal: React.FC<ModalProps> = (props) => {
  const { open, handleClose } = props;
  const user = useSelector((state: any) => state.auth.user);
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    const handleGetData = async () => {
      try {
        const res = await getPendingConnectionRequests(user?._id);
        setPendingRequests(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    handleGetData();
  }, [open]);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={styles.modalContainer}
    >
      <div className={styles.container}>
        <p>Pending Requests</p>
        {pendingRequests.length > 0 ? (
          <div className={styles.cardWrapper}>
            {pendingRequests?.map((data, idx) => (
              <PendingRequestCard key={idx} data={data} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyWrapper}>
            <p>No Requests</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PendingRequestModal;
