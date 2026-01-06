import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["student", "trader", "business", "career_switcher", "learner"],
      required: true,
    },
    roleData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    skills: {
      type: [String],
      default: [],
    },
    exposureLevel: {
      type: String,
      default: null,
    },
    curiosity: {
      type: [String],
      default: [],
    },
    learningPreferences: {
      type: [String],
      default: [],
    },
    learningPreferencesExtra: {
      type: String,
      default: "",
    },
    roadmapProgress: {
      type: Map,
      of: String,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const UserProfile =
  mongoose.models.UserProfile ||
  mongoose.model("UserProfile", userProfileSchema);

export default UserProfile;
