"use client";
import styles from "./UserForm.module.css";
import { useEffect, useState } from "react";

interface UserFormProps {
  id: number;
  onChange: Function;
}

export default function UserForm({ id, onChange }: UserFormProps) {
  const [codeValue, setCode] = useState<string>();
  const [nameValue, setName] = useState<string>();
  const [cpfValue, setCpf] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeFormValues = () => {
    console.log(
      "(handleChangeFormValues) codeValue: ",
      codeValue,
      "nameValue: ",
      nameValue,
      "cpfValue: ",
      cpfValue
    );
    onChange({
      code: codeValue,
      name: nameValue,
      cpf: cpfValue,
    });
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    setCode(inputValue);
    handleChangeFormValues();
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    setName(inputValue);
    handleChangeFormValues();
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
    handleChangeFormValues();
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/users/${id}`, {
          method: "GET",
          cache: "no-store",
        });
        const d = await response.json();
        const { data } = d;
        setCode(data.code);
        setName(data.name);
        setCpf(data.cpf);
      } catch (error) {
        console.error("Erro durante a requisição GET:", error);
      }
    };

    fetchData()
      .then(() => setLoading(false))
      .finally(() => {
        console.log(
          "(useEffect-finally) codeValue: ",
          codeValue,
          "nameValue: ",
          nameValue,
          "cpfValue: ",
          cpfValue
        );

        handleChangeFormValues();
      });
  }, [id]);

  let content = <p>Carregando...</p>;
  if (!loading)
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
            value={codeValue}
            required
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
            value={nameValue}
            required
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
            required
          />
        </div>
      </form>
    );

  return <div className={styles.container}>{content}</div>;
}
