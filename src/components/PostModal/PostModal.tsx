import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import styles from "./postmodal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress, IconButton } from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { handleSubmitPost } from "@/services/postService";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/config/firebase";
import Image from "next/image";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}

const PostModal: React.FC<ModalProps> = (props) => {
  const { open, handleClose } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [body, setBody] = useState<string>("");
  const [image, setImage] = useState<any>(null);
  const user = useSelector((state: any) => state.auth.user);
  const userId = user?._id;
  const dispatch: AppDispatch = useDispatch();

  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

  // const handleSubmit = () => {
  //   const data = {
  //     body,
  //     userId,
  //   };
  //   dispatch(handleSubmitPost(data));
  //   handleClose();
  // };

  const handleSubmit = () => {
    if (image && body) {
      const fileName = new Date().getTime() + image?.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setLoading(true);
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          console.log(error);
          setLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setLoading(false);
            if (downloadURL.length > 0) {
              const data = {
                body,
                userId,
                image: downloadURL,
              };

              dispatch(handleSubmitPost(data));
              handleClose();
            }
          });
        }
      );
    } else {
      const data = {
        body,
        userId,
      };
      //logic here without image
      dispatch(handleSubmitPost(data));
      handleClose();
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.topWrapper}>
            <p className={styles.title}>Create Post</p>
            <IconButton onClick={handleClose}>
              <CloseIcon
                style={{ color: "black", width: "15px", height: "15px" }}
              />
            </IconButton>
          </div>
          <textarea
            className={styles.textarea}
            placeholder="Share your thoughts here"
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />

          {image && (
            <div className={styles.inputImageWrapper}>
              <Image
                src={URL.createObjectURL(image)}
                className={styles.inputImage}
                fill
                alt=""
              />
            </div>
          )}
          <div className={styles.bottomWrapper}>
            <input
              type="file"
              id="photoInput"
              style={{ display: "none" }}
              onChange={(e: any) => {
                setImage(e.target.files[0]);
              }}
            />
            <div className={styles.left}>
              <label htmlFor="photoInput">
                <CollectionsIcon
                  style={{
                    color: "gray",
                    width: "15px",
                    height: "15px",
                    cursor: "pointer",
                  }}
                />
              </label>
            </div>
            <button className={styles.button} onClick={handleSubmit}>
              {loading ? (
                <CircularProgress
                  style={{ color: "white", width: "15px", height: "15px" }}
                />
              ) : (
                <p>Post</p>
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PostModal;
