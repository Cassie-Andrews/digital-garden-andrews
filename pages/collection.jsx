import Head from "next/head"
import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"

import styles from "../styles/Home.module.css"
import { withIronSessionSsr } from "iron-session/next"
import sessionOptions from "../config/session"
import Header from "../components/header"
import useLogout from "../hooks/useLogout";

import PlantList from "../components/plantList"
import db from "../db"

// use this page to display user's plant collection

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
        const user = req.session.user
        const props = {}
        
        if (user) {
            props.user = req.session.user
            props.isLoggedIn = true

            const collection = await db.plant.getCollection(user.id)
            props.collection = collection
        } else {
            props.isLoggedIn = false
        }
        return { props }
    },
    sessionOptions
)

export default function Collection(props) {
    const router = useRouter();
    const logout = useLogout();
    const { user, isLoggedIn, collection = [] } = props
    
    return (
    <div className={styles.container}>
      <Head>
        <title>{props.user?.username}&apos;s Plant Collection</title>
        <meta name="description" content="Plant collection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header isLoggedIn={props.isLoggedIn} username={props.user.username} />

      <main className={styles.main}>
        <h1 className={styles.title}>
          {props.user?.username}&apos;s Plant Collection
        </h1>

      {collection.length > 0 ? (
        <PlantList plants={collection}/>
      ) : (
        <p>Your collection is empty! Try <Link href="/search" className="link">searching</Link> for plants.</p>
      )}
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