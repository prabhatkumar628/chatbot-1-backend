import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
})

const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: "PUT, GET, POST, DELETE, PATCH",
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())


import router from "./routes/root.route.js"
app.use("/api/v1/", router)



export default app
