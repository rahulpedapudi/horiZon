import connectDB from "../lib/mongodb.js";
import { withAuth } from "../lib/auth.js";
import User from "../models/User.js";
import UserProfile from "../models/UserProfile.js";

async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await connectDB();

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
}

export default withAuth(handler);
