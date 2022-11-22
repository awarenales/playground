import { Box, Button } from "@chakra-ui/react"
import { Header } from "components/Header"
import Head from "next/head"

import styles from "../styles/Home.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <Header></Header>
      <Head>
        <title>hello world</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>hello world</h1>

        <Button onClick={() => alert("hello there")}>click me</Button>
      </main>
    </div>
  )
}
