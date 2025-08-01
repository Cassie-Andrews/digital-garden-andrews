import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../../../config/session";


// actual API call lives in here!

export default withIronSessionSsr(async function handler(req, res) {
    const user = req.session.user

    if (!user) {
        return res.status(401).json({ message: "Please log in"})
    }

        try {
            const response = await fetch(`https://perenual.com/api/v2/species-list?key=${process.env.PERENUAL_API_TOKEN}&q=${encodeURIComponent(query)}`)
            const data = await response.json()

            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json({ error: "put error" })
        }

}, sessionOptions)