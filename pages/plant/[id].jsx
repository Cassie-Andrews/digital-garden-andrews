import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { usePlantContext } from "../../context";
import styles from "../../styles/Home.module.css"
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../../config/session";
import Header from "../../components/header";
import PlantCard from "../../components/plantCard";
import { normalizePlant } from "../../db/controllers/util/normalizePlant";
import db from "../../db";

// uses getServerSideProps to get plant data by id for one specific plant

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, params }) {
        const user = req.session.user
        const props = { isLoggedIn: !!user }

        if (user) {
            props.user = user
            props.username = user.username

            const plant = await db.plant.getByPlantId(user.id, params.id)
            if (plant) props.plant = plant
        }
        return { props }
    },
    sessionOptions
);

// check if plant is in collection
export default function Plant({ plant: userPlant, isLoggedIn, username }) {
    const router = useRouter()
    const plantId = router.query.id
    const [{ searchResults }] = usePlantContext()

    const fallbackPlant = searchResults
        ?.map(normalizePlant)
        .find((p) => String(p.plant_id || p.id) === plantId)
    
    const plant = userPlant || fallbackPlant
    const inCollection = !!userPlant

    // no plant from search/context or getServerSideProps/collections -> redirect
    useEffect(() => {
        if (!plant)
            router.push('/')
    }, [plant, router])
    
    // Add to collection
    async function addToCollection() {
        console.log("Submitting plant data:", plant)
        if (!plant) {
            alert("No plant object")
            return
        }
        const response = await fetch('/api/plants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...plant,
                plant_id: plant.plant_id || plant.id,
            })
        })
        
        const text = await response.text()

        try {
            const data = JSON.parse(text)
            if (response.ok) {
                alert("plant added")
                router.replace(router.asPath)
            } else {
                alert(`Error: ${data.message}`)
            }
        } catch (err) {
            console.error("Invalid JSON:", text)
            alert("Error :(")
        }
    }

    // remove from collection
    async function removeFromCollection() {
        const response = await fetch('/api/plants', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: plant.id})
        })
        
        if (response.ok) {
            router.replace(router.asPath)
        }
    }

    return (
        <>
            <Head>
                <title>{plant?.common_name || "Plant Detail"}</title>
            </Head>
            
            <Header isLoggedIn={isLoggedIn} username={username} />

            {plant && (
                <main className={styles.container}>
                    <div className={styles.actionBlock}>
                        {isLoggedIn && (
                            inCollection ? (
                                <button onClick={removeFromCollection}>Remove from Collection</button>
                            ) : (
                                <button onClick={addToCollection}>Add to Collection</button>
                            )
                        )}
                        <button onClick={() => router.back()}>Return</button>
                    </div>
                    <PlantCard plant={plant}/>
                </main>
            )}
        </>
    )
}
