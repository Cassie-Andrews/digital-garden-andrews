import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../../config/session"
import db from '../../db'

export default withIronSessionApiRoute(
  function handler(req, res) {

    // check if logged in
    if (!req.session.user) {
      return res.status(401).json({message: "Please log in"})
    }
  },
  sessionOptions
)

// plant data
export async function getPlant(id) {
  const response = await fetch(``)
  if (response.status !== 200)
    return null
  const data = await response.json()
  return data
}


// search results
export async function searchPlants(query) {
  const response = await fetch(``)
  if (response !== 200)
    return null
  const data = await response.json()
  return data.results
}