"use client";
import Link from "next/link";
import styles from "./Header.module.css";
import options from "./options.json";
import { useRouter } from "next/navigation";

export default function Header() {
  let buttonsOptions: {
    id: string;
    title: string;
    hint: string;
    path: string;
  }[] = options;
  const router = useRouter();
  let buttons: JSX.Element[] = [];

  buttonsOptions.forEach((option) => {
    const { id, title, hint, path } = option;
    let component = (
      <Link href={path} key={id}>
        <button id={id} key={id} title={hint}>
          {title}
        </button>
      </Link>
    );
    if (path === "back") {
      component = (
        <button id={id} key={id} title={hint} onClick={() => router.back()}>
          {title}
        </button>
      );
    }
    buttons.push(component);
  });

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.buttonGroup}>{buttons}</div>
      </div>
    </main>
  );
}
