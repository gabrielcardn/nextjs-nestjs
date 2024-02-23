import Link from "next/link";
import styles from "./Header.module.css";
import options from "./options.json";

export default function Header() {
  let buttonsOptions: {
    id: string;
    title: string;
    hint: string;
    path: string;
  }[] = options;
  let buttons: JSX.Element[] = [];

  buttonsOptions.forEach((option) => {
    const { id, title, hint, path } = option;
    buttons.push(
      <Link href={path}>
        <button id={id} title={hint}>
          {title}
        </button>
      </Link>
    );
  });

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.buttonGroup}>{buttons}</div>
      </div>
    </main>
  );
}
