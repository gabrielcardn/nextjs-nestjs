import Link from "next/link";
import styles from "./UserForm.module.css";
import { useState } from "react";

export default function UserForm() {
  const [cpfValue, setCpf] = useState<string>();
  const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Obtém o valor atual do input
    let inputValue = event.target.value;

    // Remove qualquer caractere que não seja um número
    inputValue = inputValue.replace(/\D/g, "");

    // Adiciona os pontos e traço
    if (inputValue.length > 3) {
      inputValue = inputValue.substring(0, 3) + "." + inputValue.substring(3);
    }
    if (inputValue.length > 7) {
      inputValue = inputValue.substring(0, 7) + "." + inputValue.substring(7);
    }
    if (inputValue.length > 11) {
      inputValue = inputValue.substring(0, 11) + "-" + inputValue.substring(11);
    }

    setCpf(inputValue);
  };

  return (
    <div>
      <form>
        <div className={styles.formRowContainer}>
          <label>Código</label>
          <input
            type="text"
            id="code"
            name="Código"
            placeholder="Código do usuário"
          />
        </div>
        <div className={styles.formRowContainer}>
          <label>Nome</label>
          <input
            type="text"
            id="name"
            name="Nome"
            placeholder="Nome do usuário"
          />
        </div>
        <div className={styles.formRowContainer}>
          <label>CPF</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            placeholder="CPF do usuário"
            onChange={handleCpfChange}
            maxLength={14}
            value={cpfValue}
          />
        </div>
      </form>
    </div>
  );
}
