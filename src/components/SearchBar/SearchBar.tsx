import React, { useState } from "react";
import styles from "./searchbar.module.css";
import Image from "next/image";
import PostModal from "../PostModal/PostModal";

const SearchBar = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <PostModal handleClose={handleClose} open={modalOpen} />
      <div className={styles.searchbarContainer} onClick={handleOpen}>
        <div>
          <p>Share a post</p>
        </div>
        <div className={styles.imgWrapper}>
          <Image src="/add.png" fill alt="" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
