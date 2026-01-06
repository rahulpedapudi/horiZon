import connectDB from "../lib/mongodb.js";
import { withAuth } from "../lib/auth.js";
import Chat from "../models/Chat.js";

async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    // Get all chats for user
    try {
      const chats = await Chat.find({ userId: req.user._id })
        .sort({ updatedAt: -1 })
        .limit(50);
      res.json(chats);
    } catch (error) {
      console.error("Get chats error:", error);
      res.status(500).json({ message: "Server error" });
    }
  } else if (req.method === "POST") {
    // Create new chat
    try {
      const { title, sessionId, initialMessage } = req.body;

      const newChat = new Chat({
        userId: req.user._id,
        title: title || "New Chat",
        sessionId: sessionId,
        messages: initialMessage ? [initialMessage] : [],
      });

      const savedChat = await newChat.save();
      res.json(savedChat);
    } catch (error) {
      console.error("Create chat error:", error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default withAuth(handler);
