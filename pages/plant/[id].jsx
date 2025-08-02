import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { usePlantContext } from "../../context";
import styles from "../../styles/Home.module.css"
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../../config/session";
import Header from "../../components/header";
import PlantCard from "../../components/plantCard";
import db from "../../db";

// uses getServerSideProps to get plant data by id for one specific plant

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, params }) {
        const { user } = req.session
        const props = {}

        if (user) {
            props.user = req.session.user

            const plant = await db.plant.getByPlantId(user.id, params.id)
            if (plant) props.plant = plant
        }

        props.isLoggedIn = !!user
        return { props }
    },
    sessionOptions
);

// check if plant is in collection
export default function Plant({ plant: userPlant, isLoggedIn }) {
    const router = useRouter()
    const plantId = router.query.id
    const [{ plantSearchResults }] = usePlantContext()

    let plant = userPlant || plantSearchResults.find(p => String(p.plant_id || p.id) === plantId)
    const inCollection = !!userPlant

    // no plant from search/context or getServerSideProps/collections -> redirect
    useEffect(() => {
        if (!userPlant && !plant)
            router.push('/')
    }, [userPlant, plant, router])
    
    // Add to collection
    async function addToCollection() {
        const response = await fetch('/api/plants/search', {
            method: 'POST',
            header: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(plant)
        })

        if (response.ok) {
            router.replace(router.asPath)
        }
    }

    // remove from collection
    async function removeFromCollection() {
        const response = await fetch('/api/plants/search', {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
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
            
            <Header isLoggedIn={isLoggedIn} />

            {plant && (
                <main className={styles.container}>
                    <PlantCard plant={plant}/>
                    <div>
                        {isLoggedIn && (
                            inCollection ? (
                                <button onClick={removeFromCollection}>Remove from Collection</button>
                            ) : (
                                <button onClick={addToCollection}>Add to Collection</button>
                            )
                        )}
                        <button onClick={() => router.back()}>Return</button>
                    </div>
                </main>
            )}
        </>
    )
}
