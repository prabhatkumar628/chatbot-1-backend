import User from "../models/user.model.js"

const registerUser = async (req, res) => {
    let errorMessage = []
    try {
        const user = new User(req.body)
        await user.save()
        return res
            .status(201)
            .json({ success: true, data: user, message: "Register user successfully" })
    } catch (error) {
        error.keyValue?.email ? errorMessage.push("This email is allreday registed") : null
        error.errors?.name ? errorMessage.push(error.errors.name.message) : null
        error.errors?.email ? errorMessage.push(error.errors.email.message) : null
        error.errors?.password ? errorMessage.push(error.errors.password.message) : null
        if (errorMessage.length > 0) {
            return res
                .status(400)
                .json({ success: false, data: null, message: errorMessage })
        } else {
            return res
                .status(500)
                .json({ success: false, data: null, message: "Internal server error" })
        }
    }
}

const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    path: "/"
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res
                .status(400)
                .json({ success: false, data: null, message: "All fields are required" })
        }
        const user = await User.findOne({ email: email })
        if (!user) {
            return res
                .status(400)
                .json({ success: false, data: null, message: "User not found" })
        }
        const validatePassword = await user.isPasswordCorrect(password)
        if (!validatePassword) {
            return res
                .status(400)
                .json({ success: false, data: null, message: "Invalid user or password" })
        }

        const chatBotToken = user.generateToken()
        user.chatBotToken = chatBotToken
        await user.save()
        const { password: _, __V, chatBotToken: __, ...newData } = user.toObject()

        return res
            .status(201)
            .cookie("chatBotToken", chatBotToken, options)
            .json({ success: true, data: newData, message: "Logged In successfully" })
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, data: null, message: "Internal server error" })
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user?._id)
        const { password: _, __V, chatBotToken: __, ...newData } = user.toObject()
        if (user) {
            return res
                .status(201)
                .json({ success: true, data: newData, message: "Logged In user fetched" })
        } else {
            return res
                .status(404)
                .json({ success: false, message: "Please login" })
        }
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, data: null, message: "Internal server error" })
    }
}

const logoutUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    chatBotToken: 1
                }
            },
            { new: true }
        )
        return res
            .status(201)
            .clearCookie("chatBotToken", options)
            .json({ success: true, data: null, message: "Logout successfull" })

    } catch (error) {
        return res
            .status(500)
            .json({ success: false, data: null, message: "Internal server error" })
    }
}

export {
    registerUser,
    loginUser,
    getUser,
    logoutUser
}
