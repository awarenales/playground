import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>hello world</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>hello world</h1>

        <button onClick={() => alert("oi bb")}>click me</button>
      </main>
    </div>
  );
}
