import Link from "next/link"
import styles from "./style.module.css"
import Image from "next/image"

export default function PlantCard({
    name,
    plant_id,
    image_url
}) {
    return (
        <div>
            <Image src={image_url ? image_url : "#"} alt={name} />
            <div>
                <p>{name}</p>
            </div>
        </div>
    )
}