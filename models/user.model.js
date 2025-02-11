import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxlength: 50,
        minlength: 2,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        maxlength: 50,
        minlength: 5,
        match: [/\S+@\S+\.\S+/, "Please fill a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6,
    },

} , {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;
