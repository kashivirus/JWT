


import express from "express"
import { addVideo, addView, debug, deleteVideo, getByTag, getVideo, random, search, sub, trend, updateVideo } from "../controllers/videos.js"
import { VerifyToken } from "../VerifyToken.js"

const router = express.Router()


router.get('/debug', debug)

//Create a Video
router.post("/", VerifyToken, addVideo)
router.put("/:id", VerifyToken, updateVideo)
router.delete("/:id", VerifyToken, deleteVideo)

router.get("/find/:id", getVideo)
router.put("/view/:id", addView)
router.get("/trend", trend)
router.get("/random", random)
router.get("/sub", VerifyToken, sub)



router.get("/tags", getByTag)
router.get("/search", search)

export default router