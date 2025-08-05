// normalizeId - do i need this? - yes, yes you do

export function normalizePlant(raw) {
    return {
        plant_id: String(raw.plant_id || raw.id || raw._id || ""),
        common_name: raw.common_name || raw.commonName || "Unknown Plant",
        scientific_name: raw.scientific_name || raw.scientificName || [],
        imageUrl:
            raw.image_url ||
            raw.imageUrl ||
            raw.default_image?.medium_url ||
            raw.image?.url ||
            "/imageplaceholder.jpeg",
        family: raw.family || "",
        genus: raw.genus || "",
    }
}