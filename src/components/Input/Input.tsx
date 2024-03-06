import React from "react";
import styles from "./input.module.css";

interface InputProps {
  title: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}
const Input: React.FC<InputProps> = (props) => {
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.wrapper}>
        <p className={styles.title}>{props.title}</p>
        <input
          className={styles.input}
          onChange={(e: any) => {
            props.setInput(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Input;
