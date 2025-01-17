import { Router } from "express";
import verfiyUser from "../middlewares/auth.middleware.js";
import { addChat, getChat } from "../controllers/chat.controller.js";

const chatRouter = Router()

chatRouter.post("", verfiyUser, addChat)
chatRouter.get("", verfiyUser, getChat)

export default chatRouter