"use client";
import styles from "./users.module.css";
import json from "./users.json";
import Table from "../components/Table";
import { userInfo } from "os";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface User {
  id: number;
  code: string;
  name: string;
  password: string;
  cpf: string;
}

export default function UsersPage() {
  const [userModal, setUserModal] = useState<any>(null);
  const router = useRouter();
  const users: User[] = json;
  let usersInfo: any = [];
  const userListItems: JSX.Element[] = users.map((user) => {
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

  const handleTableDataCellRowClick = (userId: string) => {
    // router.push(`/users/${userId}`);
    setUserModal(<h1>{userId}</h1>);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* <div className={styles.userListContainer}>{userListItems}</div> */}
        <Table
          title={"Usuários"}
          columns={["code", "name", "cpf"]}
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
