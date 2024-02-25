import Link from "next/link";
import styles from "./UserForm.module.css";

export default function UserForm() {
  return (
    <div>
      <form>
        <label>Código</label>
        <input
          type="text"
          id="code"
          name="Código"
          placeholder="Código do usuário"
        />
        <label>Nome</label>
        <input
          type="text"
          id="name"
          name="Nome"
          placeholder="Nome do usuário"
        />
        <label>CPF</label>
        <input type="number" id="cpf" name="CPF" placeholder="CPF do usuário" />
      </form>
    </div>
  );
}
