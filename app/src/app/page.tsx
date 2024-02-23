import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <>UML:</>
          <div className={styles.imageContainer}>
            <Image
              src="/images/UML.png"
              layout="fill"
              objectFit="contain"
              alt="Descrição UML do desafio"
            />
          </div>
        </div>
        <div className={styles.descriptionContainer}>
          <>Descrição:</>
          <a>
            Este exercício tem como objetivo implementar um projeto de
            elaboração de enquetes simplificadas, onde um usuário pode criar sua
            enquete e associar perguntas e respostas a elas. A API deve ser
            desenvolvida em NestJS (TypeScript) com TypeORM. Para a elaboração
            do banco de dados deve-se utilizar a tecnologia do PostgreSQL. O
            modelo conceitual simplificado da estrutura do banco de dados pode
            ser vista na figura ao lado. Por fim, um front-end deve ser
            desenvolvido em ReactJs (NextJs) para listagem das informações
            salvas pela API no banco de dados. Para estilização da página não
            será utilizado MaterialUI.
          </a>
        </div>
      </div>
    </main>
  );
}
