import React from "react";
import styles from "./signup.module.css";
import SingupForm from "@/components/SignupForm/SignupForm";

const Signup = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div>
          <h1 className={styles.text}>SocialHubb</h1>
          <p className={styles.subText}>
            The Social Network you’ve been waiting for!
          </p>
        </div>
      </div>
      <div className={styles.right}>
        <SingupForm />
      </div>
    </div>
  );
};

export default Signup;
