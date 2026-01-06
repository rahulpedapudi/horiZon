import connectDB from "../../lib/mongodb.js";
import { withAuth } from "../../lib/auth.js";
import Chat from "../../models/Chat.js";

async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  await connectDB();

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

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.json(chat);
  } catch (error) {
    console.error("Add message error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export default withAuth(handler);
