import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePlantContext } from "../../context";
import styles from "../../styles/Home.module.css"
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../../config/session";
import Header from "../../components/header";
import PlantCardDetail from "../../components/plantCardDetail/plantCardDetail";
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
    
    const [ plant, setPlant ] = useState(userPlant || fallbackPlant)
    
    const [ detailedPlant, setDetailedPlant ] = useState(null)
    
    const [ inCollection, setInCollection ] = useState(!!userPlant)

    // no plant from search/context or getServerSideProps/collections -> redirect
    useEffect(() => {
        setInCollection(!!userPlant)
    }, [userPlant])
    

    useEffect(() => {
        if (!plantId) return

        if (!detailedPlant || !detailedPlant.sunlight || !detailedPlant.watering) {
            fetch(
            `https://perenual.com/api/v2/species/details/${plantId}?key=${process.env.PERENUAL_API_TOKEN}`
        )
        .then((res) => {
            if (!res.ok) throw new Error("Failed to get detailed plant info")
            return res.json()
        })
        .then((date) => {
            if(data) {
                const normalized = normalizePlant(data)
                setDetailedPlant(normalized)
                setPlant((prev) => ({
                    ...prev, 
                    ...normalized 
                }))
            }
        })
        .catch((error) => {
            console.error("Error fetching detained plant info:", error)
        })
    }
}, [plantId, detailedPlant])




    // Add to collection
    async function addToCollection() {
        console.log("Submitting plant data:", plant)
        if (!plant) {
            alert("No plant object")
            return
        }
        try {
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

            const data = await response.json()

            if (response.ok) {
                const goToCollection = confirm("Plant was added! View updated collection?")
                if (goToCollection) {
                    router.push("/collection")
                }
                setInCollection(true);
            } else {
                alert(`Error: ${data.message}`)
            }
        } catch (err) {
            console.error("Error", err)
            alert("Error :(")
        }
    }

    // remove from collection
    async function removeFromCollection() {
        const plantId = plant.plant_id || plant.id
        if (!plantId) {
            alert("No valid plant id found")
            return
        }

        try {
            const response = await fetch('/api/plants', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ plant_id: plantId.toString() })
            })
            
            if (response.ok) {
                    const goToCollection = confirm("Plant was successfully removed! View updated collection?")
                    if (goToCollection) {
                        router.push("/collection")
                    }
                    setInCollection(false);
            } else {
                const error = await response.json()
                alert(`Error removing plant: ${error.message}`)
            }
        } catch (err) {
            console.error("Remove failed", err)
            alert(`Error D:`)
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
                    <div className={styles.plantActionBlock}>
                        {isLoggedIn && (
                            inCollection ? (
                                <button onClick={removeFromCollection}>Remove from Collection</button>
                            ) : (
                                <button onClick={addToCollection}>Add to Collection</button>
                            )
                        )}
                        <button onClick={() => router.back()}>Return</button>
                    </div>
                    <PlantCardDetail plant={plant}/>
                </main>
            )}
        </>
    )
}
