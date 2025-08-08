// use this page to display user's plant collection

import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
/*
import { useRouter } from "next/router"
import { useEffect } from "react"
*/
import { withIronSessionSsr } from "iron-session/next"
import sessionOptions from "../config/session"

import Header from "../components/header"
import PlantList from "../components/plantList"
import db from "../db"

import styles from "../styles/Home.module.css"

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
        const user = req.session.user
        const props = {}
        
        if (user) {
          const collection = await db.plant.getAll(user.id)
          props.user = user
          props.isLoggedIn = true
          props.collection = collection
        } else {
            props.isLoggedIn = false
        }
        return { props }
    },
    sessionOptions
)

export default function Collection({ user, isLoggedIn, collection = [] }) {
  /*  
  const router = useRouter();
    const logout = useLogout();
    const [state, dispatch] = usePlantContext()

    useEffect (() => {
      if (collection.length > 0) {
        dispatch({
          type: actions.SET_COLLECTION,
          payload: collection,
        })
      }
    }, [collection, dispatch])
  */
  return (
    <div className={styles.container}>

      <Head>
        <title>{user?.username}&apos;s Plant Collection</title>
        <meta name="description" content="Plant collection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header isLoggedIn={isLoggedIn} username={user.username} />

      <main className={styles.main}>
        <h1 className={styles.title}>
          {user?.username}&apos;s Plant Collection
        </h1>
      
        <div className={styles.listContainer}>
          {collection?.length > 0 ? (
            <PlantList plants={collection} />
          ) : (
            <p>Your collection is empty! Try <Link href="/search" className="link">searching</Link> for plants.</p>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>

    </div>
  );
}