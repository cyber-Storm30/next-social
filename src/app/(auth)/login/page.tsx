import React from "react";
import styles from "./login.module.css";
import LoginForm from "@/components/LoginForm/LoginForm";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div>
          <h1 className={styles.text}>SocialHubb</h1>
          <p className={styles.subText}>
            Connect with the most incredible people!
          </p>
        </div>
      </div>
      <div className={styles.right}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
