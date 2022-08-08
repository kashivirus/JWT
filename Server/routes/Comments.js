import express from "express"
import { addComment, deleteComment, getComment, TestingCommments } from "../controllers/Comments.js"
import { VerifyToken } from "../VerifyToken.js"


const router = express.Router()



router.get("/", TestingCommments)




router.post("/", VerifyToken, addComment)
router.delete("/:id", VerifyToken, deleteComment)
router.get("/:videoId", VerifyToken, getComment)

export default router