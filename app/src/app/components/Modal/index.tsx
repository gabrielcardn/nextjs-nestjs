import ButtonGroup from "../ButtonGroup";
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

  const buttons = ["Button 1", "Button 2", "Button 3"];
  const leftButtons = ["Left Button 1", "Left Button 2"];
  const rightButtons = ["Right Button 1", "Right Button 2"];

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <div className={styles.close} onClick={handleCloseModal}>
            &times;
          </div>
        </div>
        {title ? <div className={styles.title}>{title}</div> : null}
        <div className={styles.divider} />
        <div className={styles.content}>{content}</div>
        <div className={styles.divider} />
        <div className={styles.footer}>
          <h1>ButtonGroup Examples</h1>
          Exemplo 1: Apenas botões no centro
          <ButtonGroup buttons={buttons} leftButtons={[]} rightButtons={[]} />
          Exemplo 2: Botões à esquerda e à direita
          <ButtonGroup
            buttons={[]}
            leftButtons={leftButtons}
            rightButtons={rightButtons}
          />
          Exemplo 3: Sem botões à esquerda
          <ButtonGroup
            buttons={[]}
            leftButtons={[]}
            rightButtons={rightButtons}
          />
          Exemplo 4: Sem botões à direita
          <ButtonGroup
            buttons={[]}
            rightButtons={[]}
            leftButtons={leftButtons}
          />
          Exemplo 5: Sem botões à esquerda e à direita
          <ButtonGroup buttons={buttons} leftButtons={[]} rightButtons={[]} />
        </div>
      </div>
    </div>
  );
}
