import mongoose from "mongoose"
import Chat from "../models/chat.model.js"

const addChat = async (req, res) => {
    let errorMessage = []
    try {
        const data = new Chat(req.body)
        data.user = req.user._id
        await data.save()
        return res
            .status(201)
            .json({ success: true, data: data, message: "Chat added" })
    } catch (error) {
        error.errors?.chat ? errorMessage.push(error.errors.chat.message) : null
        error.errors?.message ? errorMessage.push(error.errors.message.message) : null
        if (errorMessage.length > 0) {
            return res
                .status(400)
                .json({ success: false, data: null, message: errorMessage })
        } else {
            return res
                .status(400)
                .json({ success: false, data: null, message: "Internal Server error" })
        }
    }
}

const getChat = async (req, res) => {
    try {
        const data = await Chat.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.user?._id)
                }
            },
            {
                $sort: {
                    _id: 1
                }
            }
        ])
        if (data) {
            return res
                .status(201)
                .json({ success: true,dataCount:data.length, data: data, message: "Chat fetched Successfully" })
        } else {
            return res
                .status(400)
                .json({ success: false, data: null, message: "Unauthorized request" })
        }
    } catch (error) {
        return res
            .status(400)
            .json({ success: false, data: null, message: "Unauthorized request" })
    }
}

export {
    addChat,
    getChat
}