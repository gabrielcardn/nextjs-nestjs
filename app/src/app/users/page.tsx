"use client";
import styles from "./users.module.css";
import json from "./users.json";
import Table from "../components/Table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "../components/Modal";
import UserForm from "../components/Forms/UserForm";

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

export default function UsersPage() {
  const [userModal, setUserModal] = useState<any>(null);
  const [formValues, setFormValues] = useState<any>({});
  const router = useRouter();
  const users: User[] = json;
  let usersInfo: any = [];
  users.forEach((user) => {
    const { id, code, name, password, cpf } = user;
    usersInfo.push({
      id: id,
      fields: [code, name, cpf],
    });
    return (
      <div key={id} className={styles.userListItem}>
        {name}
      </div>
    );
  });

  const handleCloseModal = () => {
    setUserModal(null);
  };

  const handleChangeForm = (values: any) => {
    console.log("(UsersPage)handleChangeForm: ", values);
    setFormValues(values);
  };

  const buildUserForm = (user: User) => {
    return <UserForm id={user.id} onChange={handleChangeForm} />;
  };

  const handleSave = () => {
    console.log("formValues: ", formValues);
    alert("Usuário salvo!");
  };

  const buildUserFormButtons = (user: User) => {
    let leftButtons: UserButton[] = [];
    let rightButtons: UserButton[] = [];
    let buttons: UserButton[] = [];
    leftButtons.push({
      id: "delete",
      title: "Deletar",
      onClick: () => {
        if (window.confirm("Deletar usuário?")) {
          alert("Usuário " + user.name + " deletado!");
        }
      },
      position: "left",
    });
    rightButtons.push({
      id: "cancel",
      title: "Cancelar",
      onClick: () => {
        handleCloseModal();
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

  const handleTableDataCellRowClick = (userId: number) => {
    const user = users.find((u) => u.id === userId);

    if (user) {
      const userForm = buildUserForm(user);
      const userFormButtons = buildUserFormButtons(user);
      setUserModal(
        <Modal
          onCloseModal={handleCloseModal}
          title={"Usuário"}
          content={userForm}
          buttons={userFormButtons}
        />
      );
    } else alert("Usuário inválido. Contactar o suporte.");
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Table
          title={"Usuários"}
          columns={["Código", "Nome", "CPF"]}
          rows={usersInfo}
          clickable
          margin={""}
          onTableDataCellRowClick={handleTableDataCellRowClick}
        />
        {userModal}
      </div>
    </main>
  );
}
