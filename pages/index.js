import { Link } from '@chakra-ui/react'
import Head from 'next/head'
import NextLink from 'next/link'

import styles from 'styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>hello world</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <NextLink href="ticTacToe" legacyBehavior passHref>
          <Link>Play Tic Tac Toe</Link>
        </NextLink>
        <NextLink href="form" legacyBehavior passHref>
          <Link>Sign-up (WIP)</Link>
        </NextLink>
      </main>
    </div>
  )
}
