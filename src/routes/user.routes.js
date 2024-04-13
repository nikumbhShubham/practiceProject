import { Router } from "express";
import { loginUser, logoutUser, registerUser,refreshAccessToken, changeCurrentPassword,getCurrUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage, getUserChannelProfile, getWatchHistory } from "../controllers/my.controller.js";
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
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/current-user").get(verifyJWT,getCurrUser)
router.route("/update-acc").patch(verifyJWT, updateAccountDetails)
router.route("/avatar").patch(verifyJWT,upload.single("avatar"), updateUserAvatar)
router.route("/coverImage").patch(verifyJWT,upload.single('coverImage'), updateUserCoverImage)
router.route("/channel/:username").get(verifyJWT, getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory )

export default router