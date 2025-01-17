import { Router } from "express";
import { getUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import verfiyUser from "../middlewares/auth.middleware.js";

const userRouter = Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/logout", verfiyUser, logoutUser)
userRouter.get("", verfiyUser,getUser)


export default userRouter