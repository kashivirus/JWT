import mongoose from "mongoose";
import User from "../models/Users.js";
import bcrypt from "bcrypt"
import { createError } from "../error.js";
import jwt from "jsonwebtoken"




export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ name: req.body.name })
        if (!user) next(createError(404, "user not found"))

        const isCorrect = await bcrypt.compare(req.body.password, user.password)

        if (!isCorrect) return next(createError(404, "password is not correct"))

        const token = jwt.sign({ id: user._id }, process.env.JWT)
        const { password, ...others } = user._doc

        res.cookie("access_token", token, {
            httpOnly: true
        })
            .status(200)
            .json(others)






    } catch (error) {
        next(error)
    }
}


export const signup = async (req, res, next) => {
    try {
        var salt = bcrypt.genSaltSync(10)
        var hashedpassword = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({ ...req.body, password: hashedpassword })

        await newUser.save()

        res.status(200).json({ newUser, })

    } catch (error) {
        next(error)
    }
}
