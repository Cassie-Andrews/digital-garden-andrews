/* eslint-disable @next/next/no-img-element */
import styles from "./style.module.css"

export default function PlantCard({ plant }) {
    if (!plant) return null

    console.log("Plant card data:", plant)
    const imageUrl = 
        plant?.default_image?.medium_url || 
        plant?.image_url || 
        "/imageplaceholder.jpeg"
    
    return (
        <div className={styles.card}>
            <img
                src={imageUrl}
                alt={plant.common_name || "Plant"} 
                width={400}
                height={400}
                onError={(e) => {
                    e.target.onerror = null 
                    e.target.src = "/imageplaceholder.jpeg"
                }}
            />
            <h2 className={styles.name}>{(plant.common_name || "Unknown Plant").replace(/\b\w/g, (c) => c.toUpperCase())}</h2>
        </div>
    )
}