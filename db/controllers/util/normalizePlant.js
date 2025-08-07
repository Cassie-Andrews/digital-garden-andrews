// normalizeId - do i need this? - yes, yes you do

export function normalizePlant(raw = {}) {
    return {
        plant_id: String(
            raw.plant_id || raw.id || raw._id || ""),
        common_name: raw.common_name || raw.commonName || "Unknown Plant",
        scientific_name: Array.isArray(raw.scientific_name)
            ? raw.scientific_name
            : Array.isArray(raw.scientific_name)
            ? raw.scientificName
            : raw.scientific_name
            ? [raw.scientific_name]
            : raw.scientificName
            ? [raw.scientificName]
            :[],
        imageUrl:
            raw.imageUrl ||
            raw.image_url ||
            raw.default_image?.medium_url ||
            raw.image?.url ||
            "/imageplaceholder.jpeg",
        family: raw.family || "",
        genus: raw.genus || "",
    }
}