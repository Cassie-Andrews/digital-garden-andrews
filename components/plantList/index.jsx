import Link from "next/link"
import PlantCard from "../plantCard"
import styles from "./style.module.css"

export default function PlantList({ plants }) {
    return (
        <div className={styles.list}>
            {plants.map((plant) => (
                <Link
                    key={plant.plant_id} 
                    href={`/plant/${plant.plant_id}`}
                    passHref
                >
                    <PlantCard plant={plant} />
                </Link>
            ))}
        </div>
    )
}