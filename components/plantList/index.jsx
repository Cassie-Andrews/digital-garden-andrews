import Link from "next/link"
import PlantCard from "../plantCard"
import styles from "./style.module.css"
import { normalizePlant } from "../../db/controllers/util/normalizePlant"

export default function PlantList({ plants }) {
    return (
        <div className={styles.list}>
            {plants?.map((rawPlant) => {
                const plant = normalizePlant(rawPlant)
                const id = plant.id || plant.plant_id

                if (!id) return null
                
                return (
                    <Link
                        key={id} 
                        href={`/plant/${id}`}>
                        <PlantCard plant={plant} />
                    </Link>
                )
            })}
        </div>
    )
}