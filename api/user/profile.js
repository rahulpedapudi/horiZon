import connectDB from "../lib/mongodb.js";
import { withAuth } from "../lib/auth.js";
import UserProfile from "../models/UserProfile.js";

async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
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
  } else if (req.method === "PUT") {
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
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default withAuth(handler);
