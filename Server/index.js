import morgan from "morgan";
import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
dotenv.config()
const app = express()
const port = process.env.PORT
import userRoutes from "./routes/Users.js"
import AuthRoutes from "../Server/routes/auth.js"
import VideoRo from "./routes/videos.js"

import CommentsRo from "../Server/routes/Comments.js"

import cookieParser from 'cookie-parser';






mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("connnected to mongoose atlas"))
    .catch((err) => console.log(err))



app.use(cookieParser())
app.use(express.json());
app.use(morgan("dev"))
app.use("/api/auth", AuthRoutes)
app.use("/api/users", userRoutes)
app.use("/api/videos", VideoRo)
app.use("/api/comments", CommentsRo)




app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "something went wrong";

    return res.status(status).json({
        success: false,
        status,
        message,

    })


})

app.listen(port, () => console.log(`backend server is listening at port  # ${port}`))