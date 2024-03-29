import React from "react";
import styles from "./ButtonGroup.module.css";
import Button from "../Button";

interface ButtonGroupProps {
  buttons: any[];
  leftButtons: any[];
  rightButtons: any[];
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  buttons,
  leftButtons,
  rightButtons,
}) => {
  return (
    <div className={styles.buttonGroupContainer}>
      {!!leftButtons.length && (
        <div className={styles.buttonGroupLeft}>
          {leftButtons.map((button, index) => (
            <div className={styles.buttonContainer} key={index}>
              <Button {...button} />
            </div>
          ))}
        </div>
      )}
      {!!buttons.length && (
        <div className={styles.buttonGroup}>
          {buttons.map((button, index) => (
            <div className={styles.buttonContainer} key={index}>
              <Button {...button} />
            </div>
          ))}
        </div>
      )}

      {!!rightButtons.length && (
        <div className={styles.buttonGroupRight}>
          {rightButtons.map((button, index) => (
            <div className={styles.buttonContainer} key={index}>
              <Button {...button} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ButtonGroup;
