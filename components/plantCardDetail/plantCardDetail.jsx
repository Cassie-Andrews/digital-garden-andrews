/* eslint-disable @next/next/no-img-element */
import styles from "./style.module.css"

export default function PlantCardDetail({ plant }) {
    console.log("Plant card data:", plant)

    const {
        imageUrl,
        common_name,
        scientific_name,
        family,
        order,
        edible,
        poisonous,
        cycle,
        watering,
        sunlight,
        indoor,
        hardiness,
    } = plant

    return (
        <div className={styles.card}>
            <img
                className={styles.plantImage}
                src={imageUrl}
                alt={common_name || ""} 
                width={400}
                height={400}
                onError={(e) => {
                    e.target.onerror = null 
                    e.target.src = "/imageplaceholder.jpeg"
                }}
            />
            <div className={styles.plantInfo}>
                <h2 className={styles.name}>{(plant.common_name || "Unknown Plant").replace(/\b\w/g, (c) => c.toUpperCase())}</h2>
                {scientific_name?.length > 0 && <p className={styles.scientificName}>Scientific Name: <em>{scientific_name.join(", ")}</em></p>}
                {family && <p className={styles.family}>Family: {family}</p>}
                {order && <p className={styles.order}>Order: {order}</p>}
                
                <div className={styles.morePlantInfo}>
                    <p>Edible: {edible? "Yes" : "No"}</p>
                    <p>Poisonous: {poisonous? "Yes" : "No"}</p>
                    {cycle && <p>Cycle: {cycle}</p>}
                    {watering && <p>Watering: {watering}</p>}
                    {sunlight && <p>Sunlight: {sunlight}</p>}
                    <p>Indoor: {indoor? "Yes" : "No"}</p>
                    <p>Hardiness Zone: {plant.hardiness ? `${plant.hardiness.min}-${plant.hardiness.max}` : "n/a"}</p>
                </div>
            </div>
            
        </div>
    )
    /*
    const imageUrl = 
        plant?.default_image?.medium_url || 
        plant?.image_url || plant.imageUrl ||
        "/imageplaceholder.jpeg"
    
    return (
        <div className={styles.card}>
            <img
                src={imageUrl}
                alt={plant.common_name || ""} 
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
    */
}