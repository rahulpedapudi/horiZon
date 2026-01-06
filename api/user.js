import connectDB from "./lib/mongodb.js";
import { withAuth } from "./lib/auth.js";
import User from "./models/User.js";
import UserProfile from "./models/UserProfile.js";

async function handler(req, res) {
  // Route based on query param: ?action=profile|onboarding|roadmap
  const { action } = req.query;

  await connectDB();

  if (action === "profile") {
    if (req.method === "GET") {
      return getProfile(req, res);
    } else if (req.method === "PUT") {
      return updateProfile(req, res);
    }
  } else if (action === "onboarding" && req.method === "PUT") {
    return saveOnboarding(req, res);
  } else if (action === "roadmap" && req.method === "PUT") {
    return updateRoadmap(req, res);
  }

  return res.status(400).json({ message: "Invalid action or method" });
}

async function getProfile(req, res) {
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
}

async function updateProfile(req, res) {
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
}

async function saveOnboarding(req, res) {
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

    await User.findByIdAndUpdate(req.user._id, { isOnboarded: true });

    res.json({ message: "Onboarding completed successfully", profile });
  } catch (error) {
    console.error("Onboarding error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function updateRoadmap(req, res) {
  try {
    const { roadmapProgress } = req.body;
    const profile = await UserProfile.findOneAndUpdate(
      { userId: req.user._id },
      { $set: { roadmapProgress } },
      { new: true, upsert: true }
    );
    res.json({
      message: "Roadmap progress saved",
      roadmapProgress: profile.roadmapProgress,
    });
  } catch (error) {
    console.error("Save roadmap error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export default withAuth(handler);
