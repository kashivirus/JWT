import express from "express"
const router = express.Router()

import { signin, signup } from "../controllers/auth.js"



//Create a Users
router.post('/signup', signup)

//Sign In

router.post('/signin', signin)
//Google Singn 

// router.post('/google',)


export default router;