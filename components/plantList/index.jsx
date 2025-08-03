import Link from "next/link"
import PlantCard from "../plantCard"
import styles from "./style.module.css"

export default function PlantList({ plants }) {
    return (
        <div className={styles.list}>
            {plants.map((plant) => (
                <Link
                    key={plant.id} 
                    href={`/plant/${plant.id}`}>
                    <PlantCard plant={plant} />
                </Link>
            ))}
        </div>
    )
}