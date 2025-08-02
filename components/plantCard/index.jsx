import Link from "next/link"
import Image from "next/image"
import styles from "./style.module.css"

export default function PlantCard({ plant }) {
    return (
        <div>
            <Image 
                src={plant.image_url || "/placeholder.jpg"}
                alt={plant.common_name || "Plant"} 
                width={400}
                height={400}
            />
            <p>{plant.common_name}</p>
        </div>
    )
}