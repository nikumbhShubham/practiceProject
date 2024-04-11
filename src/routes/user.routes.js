import { Router } from "express";
import { loginUser, logoutUser, registerUser,refreshAccessToken } from "../controllers/my.controller.js";
import { upload } from '../middlewares/multer.middleware.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/register").post(upload.fields([
    {
        name: 'avatar',
        maxCount: 1,
    },
    {
        name: 'coverImage',
        maxCount: 1,
    }
]), registerUser)

const loginuser=router.route("/login").post(loginUser)

if (loginuser) {
    console.log("done")
}



//securedRoutes
router.route("/logoutUser").post(verifyJWT, logoutUser)

router.route("/refresh-token").post(refreshAccessToken)



export default router