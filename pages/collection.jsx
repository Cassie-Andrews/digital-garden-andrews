import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "../styles/Home.module.css"
import { withIronSessionSsr } from "iron-session/next"
import sessionOptions from "../config/session"
import Header from "../components/header"
import PlantList from "../components/plantList"
import db from "../db"
import { isLocalURL } from "next/dist/shared/lib/router/router"

// use this page to display user's plant collection

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
        const { user } = req.session

        if (!user) {
            return {
                redirect: {
                    destination: "/login",
                    permanent: false,
                }
            }
        }

        const plants = await db.plant.getAll(user.id)

        return { 
            props: {
                isLoggedIn: true,
                user,
                plants: plants || [],
            }
        }
    },
    sessionOptions
)

export default function Collection({ isLoggedIn, plants, user }) {
    return (
        <>
            <Head>
                <title>User Plant Collection</title>
            </Head>
            <Header isLoggedIn={isLoggedIn} username={user?.username}/>

            <main>
                <h1>Plant Collection 🪴</h1>
                {plants?.length > 0 ? (
                    <PlantList plants={plants} />
                ) : (
                    <p>No plants yet! Try <Link href="/search">searching</Link> for some.</p>
                )}
            </main>
        </>
    )
}