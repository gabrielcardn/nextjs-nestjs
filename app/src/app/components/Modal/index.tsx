import { Suspense } from "react";
import ButtonGroup from "../ButtonGroup";
import styles from "./Modal.module.css";

interface ModalButton {
  id: string;
  title: string;
  onClick: Function;
  position: "left" | "center" | "right";
}

interface Modal {
  title: string;
  content: any;
  onCloseModal: Function;
  buttons: ModalButton[];
}

export default function Modal({
  title,
  content,
  onCloseModal,
  buttons,
}: Modal) {
  const handleCloseModal = () => {
    onCloseModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <div className={styles.close} onClick={handleCloseModal}>
            &times;
          </div>
        </div>
        {title ? <div className={styles.title}>{title}</div> : null}
        <div className={styles.divider} style={{ margin: "4px 0" }} />
        <div className={styles.content}>
          {<Suspense fallback={<p>Loading...</p>}>{content}</Suspense>}
        </div>
        <div className={styles.divider} style={{ margin: "4px 0" }} />
        <div className={styles.footer}>
          <ButtonGroup
            buttons={buttons.filter((b) => b.position === "center")}
            leftButtons={buttons.filter((b) => b.position === "left")}
            rightButtons={buttons.filter((b) => b.position === "right")}
          />
        </div>
      </div>
    </div>
  );
}
