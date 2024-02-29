"use client";
import ButtonGroup from "../../ButtonGroup";
import styles from "./UserForm.module.css";
import { useEffect, useState } from "react";

interface UserFormProps {
  id: number;
  onChange: Function;
  onCloseModal: Function;
}

interface User {
  id: number;
  code: string;
  name: string;
  password: string;
  cpf: string;
}

interface UserButton {
  id: string;
  title: string;
  onClick: Function;
  position: "left" | "center" | "right";
}

export default function UserForm({
  id,
  onChange,
  onCloseModal,
}: UserFormProps) {
  const [codeValue, setCode] = useState<string>();
  const [nameValue, setName] = useState<string>();
  const [cpfValue, setCpf] = useState<string>();
  const [userData, setUserData] = useState<any>();
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
    let inputValue = event.target.value;
    // Remove qualquer caractere que não seja um número
    inputValue = inputValue.replace(/\D/g, "");
    setCpf(inputValue);
    handleChangeFormValues();
  };

  const handleSave = () => {
    alert("Usuário salvo!");
    onCloseModal();
  };

  const buildUserFormButtons = (user: User) => {
    if (!user) return [];
    let leftButtons: UserButton[] = [];
    let rightButtons: UserButton[] = [];
    let buttons: UserButton[] = [];
    leftButtons.push({
      id: "delete",
      title: "Deletar",
      onClick: () => {
        if (window.confirm("Deletar usuário?")) {
          alert("Usuário " + user.name + " deletado!");
          onCloseModal();
        }
      },
      position: "left",
    });
    rightButtons.push({
      id: "cancel",
      title: "Cancelar",
      onClick: () => {
        alert("FECHAR MODAL!");
        onCloseModal();
      },
      position: "right",
    });
    rightButtons.push({
      id: "save",
      title: "Salvar",
      onClick: handleSave,
      position: "right",
    });

    return [...leftButtons, ...buttons, ...rightButtons];
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
        setUserData(data);
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

  if (loading) return <p>Carregando...</p>;
  let content = <p>Carregando...</p>;
  if (!loading)
    content = (
      <div className={styles.formContainer}>
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
      </div>
    );

  const buttons = buildUserFormButtons(userData);

  return (
    <div className={styles.container}>
      <div className={styles.divider} style={{ margin: "4px 0" }} />
      <div className={styles.content}>{content}</div>
      <div className={styles.divider} style={{ margin: "4px 0" }} />
      <div className={styles.footer}>
        <ButtonGroup
          buttons={buttons.filter((b) => b.position === "center")}
          leftButtons={buttons.filter((b) => b.position === "left")}
          rightButtons={buttons.filter((b) => b.position === "right")}
        />
      </div>
    </div>
  );
}
