import styles from "./Modal.module.css";

interface Modal {
  title: string;
  content: any;
  onCloseModal: Function;
}

export default function Modal({ title, content, onCloseModal }: Modal) {
  const handleCloseModal = () => {
    onCloseModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <div className={styles.close} onClick={handleCloseModal}>
            &times;
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.content}>{content}</div>
        <div className={styles.divider} />
        <div className={styles.footer}>FOOTER</div>
      </div>
    </div>
  );
}
