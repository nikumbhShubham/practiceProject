import { Router } from "express";
import { registerUser } from "../controllers/my.controller.js";
const router=Router()

router.route("/register").post(registerUser)

export default router