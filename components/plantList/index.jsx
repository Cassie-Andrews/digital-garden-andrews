import Link from "next/link"
import PlantCard from "../plantCard"
import styles from "./style.module.css"
import { normalizePlant } from "../../db/controllers/util/normalizePlant"

export default function PlantList({ plants = [] }) {
    if (!Array.isArray(plants)) {
        console.error("Expected an array but got:", plants)
        return null
    }
    
    return (
        <div className={styles.list}>
            {plants.map((rawPlant, i) => {
                const plant = normalizePlant(rawPlant)
                const id = plant.id || plant.plant_id
                /*const href = `/plant/${plant.id || ""}`*/

                if (!id) {
                    return null
                }
                return (
                    <Link
                        key={id + "-" + i} 
                        href={`/plant/${id}`}>
                        <PlantCard plant={plant} />
                    </Link>
                )
            })}
        </div>
    )
}