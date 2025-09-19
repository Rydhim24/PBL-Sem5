import mongoose from "mongoose";
import User from "./User.js";
const profileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, default: " " },
    about: { type: String, default: " " },
    skills: { type: String, default: " " },
    avatar: { type: String, default: " " }


})

export default mongoose.model("Profile", profileSchema);