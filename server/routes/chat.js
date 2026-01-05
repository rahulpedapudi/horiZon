import express from "express";
import Chat from "../models/Chat.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Protected routes
router.use(protect);

// @route   GET /api/chat
// @desc    Get all conversations for user
router.get("/", async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user._id })
      .sort({ updatedAt: -1 }) // Most recent first
      .limit(50); // Limit to last 50 chats for performance
    res.json(chats);
  } catch (error) {
    console.error("Get chats error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/chat/:id
// @desc    Get single conversation
router.get("/:id", async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
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
});

// @route   POST /api/chat
// @desc    Create new conversation
router.post("/", async (req, res) => {
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
});

// @route   PUT /api/chat/:id/message
// @desc    Add message to conversation
router.put("/:id/message", async (req, res) => {
  try {
    const { message } = req.body; // { role, text, suggestions, ... }

    const chat = await Chat.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      {
        $push: { messages: message },
        $set: { updatedAt: new Date() }, // Should auto-update but explicit ensures sort
      },
      { new: true }
    );

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.json(chat);
  } catch (error) {
    console.error("Add message error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/chat/:id
// @desc    Update chat metadata (title, pinned, archived)
router.put("/:id", async (req, res) => {
  try {
    const { title, pinned, archived } = req.body;
    const updates = {};
    if (title !== undefined) updates.title = title;
    if (pinned !== undefined) updates.pinned = pinned;
    if (archived !== undefined) updates.archived = archived;

    const chat = await Chat.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
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
});

// @route   DELETE /api/chat/:id
// @desc    Delete conversation
router.delete("/:id", async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({
      _id: req.params.id,
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
});

export default router;
