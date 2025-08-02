import Link from "next/link"
import Image from "next/image"
import styles from "./style.module.css"

export default function PlantCard({ plant }) {
    if (!plant) return null

    return (
        <div className={styles.card}>
            <Image 
                src={plant.image_url || "/imageplaceholder.jpeg"}
                alt={plant.common_name || "Plant"} 
                width={400}
                height={400}
            />
            <p>{plant.common_name || "Unknown Plant" }</p>
        </div>
    )
}