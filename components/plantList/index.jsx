import Link from "next/link"
import PlantCard from "../plantCard"
import styles from "./style.module.css"

export default function PlantList({ plants }) {
    return (
        <div className={styles.list}>
            {plants.map((plant) => {
                const key = plant.plant_id || plant.id || (plant._id ? plant._id.toString() : null)
                const href = `/plant/${plant.plant_id || plant.id || ""}`

                if (!key) {
                    return null
                }
                return (
                    <Link
                        key={key} 
                        href={href}>
                        <PlantCard plant={plant} />
                    </Link>
                )
            })}
        </div>
    )
}