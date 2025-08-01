import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import db from '../../../db'




/*
export default withIronSessionSsr(
    async function handler(req, res) {
        
        if (!req.session.user) {
            return res.status(401).json({ message: "Please log in"})
        }
        
        switch (req.method) {
            case "POST":
                try {

                } catch {

                }

            case "POST":
                try {

                } catch {
                    
                }

        }


    
    }
)
    */