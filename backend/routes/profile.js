import express from "express";
import Profile from "../model/Profile.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create or update profile
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { name, about, skills, reason, avatar } = req.body;
        const profile = await Profile.findOneAndUpdate(
            { userId: req.user.id },
            { name, about, skills, reason, avatar },
            { new: true, upsert: true }
        );
        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Get profile
router.get("/", authMiddleware, async (req, res) => {
    const profile = await Profile.findOne({ userId: req.user.id });
    res.json(profile);
});

export default router;