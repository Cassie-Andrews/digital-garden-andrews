import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../../config/session";
import dbConnect from '../../../db/controllers/util/connection';
import User from '../../../db/models/user';
import db from '../../../db'

export default withIronSessionApiRoute(
  async function handler(req, res) {
    if (req.method !== 'POST')
      return res.status(404).end()
    switch(req.query.action) {
      case "login":
        return login(req, res)
      case "logout":
        return logout(req, res)
      case "signup":
        return signup(req, res)
      default:
        return res.status(404).end()
    }
  },
  sessionOptions
)

async function login(req, res) {
  const { username, password } = req.body
  try {
    await dbConnect()
    const user = await db.auth.login(username, password)

    req.session.user = {
      id: user._id.toString(),
      username: user.username,
    }

    await req.session.save()
    res.status(200).json({ user: req.session.user })
  } catch(err) {
    res.status(400).json({error: err.message})
  }
}

async function logout(req, res) {
  await req.session.destroy()
  res.status(200).end()
}

async function signup(req, res) {
  try {
    const { username, password } = req.body
    await dbConnect()
    const newUser = await db.user.create(username, password)

    req.session.user = {
      id: newUser._id.toString(),
      username: newUser.username,
    }
    
    await req.session.save()

    res.status(201).json({ user: req.session.user })
  } catch(err) {
    res.status(400).json({error: err.message})
  }
}