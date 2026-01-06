import connectDB from "../lib/mongodb.js";
import { withAuth } from "../lib/auth.js";
import UserProfile from "../models/UserProfile.js";

async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await connectDB();

  try {
    const { roadmapProgress, roadmapId } = req.body;

    console.log("Updating roadmap for user:", req.user._id);

    const profile = await UserProfile.findOneAndUpdate(
      { userId: req.user._id },
      {
        $set: {
          roadmapProgress: roadmapProgress,
        },
      },
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
