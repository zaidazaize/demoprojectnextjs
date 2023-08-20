import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please enter your name"],
        unique: [true, "User name already exist"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
    },
    isVarified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordExpire: Date,
    varifyToken: String,
    varifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User;
