import jwt from "jsonwebtoken";
import { createError } from "./error.js";



export const VerifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) return next(createError(401, "You are not authenticated"))

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "token is not authenticated"))

        req.user = user;
        // console.log(req.user)
        // console.log(user)
        // console.log(req.user)
        next()
    })
}