import connectDB from "../lib/mongodb.js";
import { withAuth } from "../lib/auth.js";
import Chat from "../models/Chat.js";

async function handler(req, res) {
  const { id } = req.query;

  await connectDB();

  if (req.method === "GET") {
    // Get single chat
    try {
      const chat = await Chat.findOne({
        _id: id,
        userId: req.user._id,
      });

      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }

      res.json(chat);
    } catch (error) {
      console.error("Get chat error:", error);
      res.status(500).json({ message: "Server error" });
    }
  } else if (req.method === "PUT") {
    // Update chat metadata
    try {
      const { title, pinned, archived } = req.body;
      const updates = {};

      if (title !== undefined) updates.title = title;
      if (pinned !== undefined) updates.pinned = pinned;
      if (archived !== undefined) updates.archived = archived;

      const chat = await Chat.findOneAndUpdate(
        { _id: id, userId: req.user._id },
        { $set: updates },
        { new: true }
      );

      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }

      res.json(chat);
    } catch (error) {
      console.error("Update chat error:", error);
      res.status(500).json({ message: "Server error" });
    }
  } else if (req.method === "DELETE") {
    // Delete chat
    try {
      const chat = await Chat.findOneAndDelete({
        _id: id,
        userId: req.user._id,
      });

      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }

      res.json({ message: "Chat deleted" });
    } catch (error) {
      console.error("Delete chat error:", error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default withAuth(handler);
