const sessionOptions = {
  cookieName: "mongo_auth_cookie",
  password: process.env.IRON_PASS,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
}

// troubleshooting "error - Error: iron-session: Bad usage. Minimum usage is const session = await getIronSession(req, res, { cookieName: "...", password: "...". Check the usage here: https://github.com/vvo/iron-session"
console.log("IRON_PASS loaded?", process.env.IRON_PASS?.length)

export default sessionOptions 