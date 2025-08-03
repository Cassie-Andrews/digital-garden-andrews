import Link from "next/link"
import Image from "next/image"
import styles from "./style.module.css"

export default function PlantCard({ plant }) {
    if (!plant) return null

    console.log("Plant card data:", plant)
    const imageUrl = plant.default_image?.medium_url 
    
    return (
        <div className={styles.card}>
            <Image 
                src={imageUrl || "/imageplaceholder.jpeg"}
                alt={plant.common_name || "Plant"} 
                width={400}
                height={400}
            />
            <h2 className={styles.name}>{plant.common_name || "Unknown Plant" }</h2>
        </div>
    )
}