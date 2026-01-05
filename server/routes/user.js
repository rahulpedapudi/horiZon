import express from "express";
import User from "../models/User.js";
import UserProfile from "../models/UserProfile.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All routes are protected
router.use(protect);

// @route   GET /api/user/profile
// @desc    Get user profile with onboarding data
router.get("/profile", async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.user._id });

    res.json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        isOnboarded: req.user.isOnboarded,
      },
      profile: profile || null,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/user/onboarding
// @desc    Save onboarding data and mark user as onboarded
router.put("/onboarding", async (req, res) => {
  try {
    const {
      role,
      roleData,
      skills,
      exposure_level,
      curiosity,
      learning_preferences,
      learning_preferences_extra,
    } = req.body;

    // Upsert user profile
    const profile = await UserProfile.findOneAndUpdate(
      { userId: req.user._id },
      {
        userId: req.user._id,
        role,
        roleData: roleData || {},
        skills: skills || [],
        exposureLevel: exposure_level,
        curiosity: curiosity || [],
        learningPreferences: learning_preferences || [],
        learningPreferencesExtra: learning_preferences_extra,
      },
      { upsert: true, new: true }
    );

    // Mark user as onboarded
    await User.findByIdAndUpdate(req.user._id, { isOnboarded: true });

    res.json({
      message: "Onboarding completed successfully",
      profile,
    });
  } catch (error) {
    console.error("Onboarding error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/user/profile
// @desc    Update user profile
router.put("/profile", async (req, res) => {
  try {
    const profile = await UserProfile.findOneAndUpdate(
      { userId: req.user._id },
      { $set: req.body },
      { new: true }
    );

    res.json({ profile });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/user/roadmap
// @desc    Update roadmap progress
router.put("/roadmap", async (req, res) => {
  try {
    const { roadmapProgress, roadmapId } = req.body; // Expecting a map/object of skill statuses

    console.log("Updating roadmap for user:", req.user._id);

    const profile = await UserProfile.findOneAndUpdate(
      { userId: req.user._id },
      {
        $set: {
          roadmapProgress: roadmapProgress
        }
      },
      { new: true, upsert: true }
    );

    res.json({
      message: "Roadmap progress saved",
      roadmapProgress: profile.roadmapProgress
    });
  } catch (error) {
    console.error("Save roadmap error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
