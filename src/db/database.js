import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB Connected !!! HOST:`, connectionInstance.connection.host)
    } catch (error) {
        console.log(`MongoDB connection ERROR`, error)
        process.exit(1)
    }
}
export default connectDB