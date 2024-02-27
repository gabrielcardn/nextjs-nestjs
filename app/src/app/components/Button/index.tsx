import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  id: string;
  title: string;
  onClick: Function;
}

const Button: React.FC<ButtonProps> = ({ id, title, onClick }) => {
  return (
    <div className={styles.container} key={id} onClick={() => onClick()}>
      {title}
    </div>
  );
};

export default Button;
