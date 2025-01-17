import { Router } from "express";
import userRouter from "./user.route.js";
import chatRouter from "./chat.route.js";

const router = Router()

router.use("/user", userRouter)
router.use("/chat", chatRouter)

export default router