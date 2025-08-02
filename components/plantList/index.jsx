import Link from "next/link"
import PlantCard from "../plantCard"
import styles from "./style.module.css"

export default function PlantList({ plants }) {
    return (
        <div className={styles.plantList}>
            {plants.map((plant) => (
                <PlantCard key={plant.plant_id} plant={plant} />
            ))}
        </div>
    )
}