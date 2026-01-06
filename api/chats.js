import connectDB from "./lib/mongodb.js";
import { withAuth } from "./lib/auth.js";
import Chat from "./models/Chat.js";

async function handler(req, res) {
  // Route based on query params: ?id=xxx&action=message (optional)
  const { id, action } = req.query;

  await connectDB();

  // If no ID, handle list/create
  if (!id) {
    if (req.method === "GET") {
      return listChats(req, res);
    } else if (req.method === "POST") {
      return createChat(req, res);
    }
  } else {
    // ID provided - handle single chat operations
    if (action === "message" && req.method === "PUT") {
      return addMessage(req, res, id);
    } else if (req.method === "GET") {
      return getChat(req, res, id);
    } else if (req.method === "PUT") {
      return updateChat(req, res, id);
    } else if (req.method === "DELETE") {
      return deleteChat(req, res, id);
    }
  }

  return res.status(400).json({ message: "Invalid request" });
}

async function listChats(req, res) {
  try {
    const chats = await Chat.find({ userId: req.user._id })
      .sort({ updatedAt: -1 })
      .limit(50);
    res.json(chats);
  } catch (error) {
    console.error("Get chats error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function createChat(req, res) {
  try {
    const { title, sessionId, initialMessage } = req.body;
    const newChat = new Chat({
      userId: req.user._id,
      title: title || "New Chat",
      sessionId,
      messages: initialMessage ? [initialMessage] : [],
    });
    const savedChat = await newChat.save();
    res.json(savedChat);
  } catch (error) {
    console.error("Create chat error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function getChat(req, res, id) {
  try {
    const chat = await Chat.findOne({ _id: id, userId: req.user._id });
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.json(chat);
  } catch (error) {
    console.error("Get chat error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function updateChat(req, res, id) {
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
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.json(chat);
  } catch (error) {
    console.error("Update chat error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function deleteChat(req, res, id) {
  try {
    const chat = await Chat.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.json({ message: "Chat deleted" });
  } catch (error) {
    console.error("Delete chat error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function addMessage(req, res, id) {
  try {
    const { message } = req.body;
    const chat = await Chat.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      {
        $push: { messages: message },
        $set: { updatedAt: new Date() },
      },
      { new: true }
    );
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.json(chat);
  } catch (error) {
    console.error("Add message error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export default withAuth(handler);
