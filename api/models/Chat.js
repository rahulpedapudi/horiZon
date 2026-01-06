import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      default: "New Chat",
    },
    sessionId: {
      type: String,
      required: true,
    },
    messages: [
      {
        role: {
          type: String,
          enum: ["user", "assistant", "system"],
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        suggestions: [String],
        timestamp: {
          type: Date,
          default: Date.now,
        },
        isError: {
          type: Boolean,
          default: false,
        },
      },
    ],
    pinned: {
      type: Boolean,
      default: false,
    },
    archived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

ChatSchema.index({ userId: 1, updatedAt: -1 });

const Chat = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);

export default Chat;
