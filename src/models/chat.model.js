import mongoose,{Schema} from "mongoose";

const chatSchema = new Schema({
    chat:{
        type:String,
        required:[true, "Chat is required"]
    },
    message:{
        type:String,
        required:[true, "Message is required"]
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

const Chat = mongoose.model("Chat", chatSchema)
export default Chat