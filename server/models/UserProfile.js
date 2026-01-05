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
    // Role-specific data (flexible schema)
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
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

export default UserProfile;
