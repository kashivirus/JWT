import express from "express";
import { deleteUser, dislike, getUser, like, subscribe, unSubscribe, update, testUser } from "../controllers/Users.js";
import { VerifyToken } from "../VerifyToken.js";

const router = express.Router()


//Update user

router.get("/aaa", testUser)


router.put('/:id', VerifyToken, update)

///delete User
router.delete("/:id", VerifyToken, deleteUser)

//get a user
router.get("/find/:id", getUser)


//subscribe a user

router.put("/sub/:id", VerifyToken, subscribe)

//unsubscibe a user
router.put("/unsub/:id", VerifyToken, unSubscribe)

//like a video
router.put("/like/:id", VerifyToken, like)

// dislike a video


router.put("/unlike/:id", VerifyToken, dislike)



export default router;