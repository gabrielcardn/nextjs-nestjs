"use client";
import styles from "./UserForm.module.css";
import { useEffect, useState } from "react";

interface UserFormProps {
  id: number;
}

export default function UserForm({ id }: UserFormProps) {
  const [codeValue, setValue] = useState<string>();
  const [nameValue, setName] = useState<string>();
  const [cpfValue, setCpf] = useState<string>();
  const [userData, setUserData] = useState<any>(null);

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    setValue(inputValue);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    setName(inputValue);
  };
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

  useEffect(() => {
    console.log("useEffect");
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/users/${id}`, {
          method: "GET",
          cache: "no-store",
        });
        const d = await response.json();
        setUserData(d.data);
      } catch (error) {
        console.error("Erro durante a requisição GET:", error);
      }
    };

    fetchData();
  }, [id]);

  let content = <p>Carregando...</p>;
  if (userData)
    content = (
      <form>
        <div className={styles.formRowContainer}>
          <label>Código</label>
          <input
            type="text"
            id="code"
            name="Código"
            placeholder="Código do usuário"
            onChange={handleCodeChange}
            value={codeValue || userData.code}
          />
        </div>
        <div className={styles.formRowContainer}>
          <label>Nome</label>
          <input
            type="text"
            id="name"
            name="Nome"
            placeholder="Nome do usuário"
            onChange={handleNameChange}
            value={nameValue || userData.name}
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
            value={cpfValue || userData.cpf}
          />
        </div>
      </form>
    );

  return <div className={styles.container}>{content}</div>;
}
