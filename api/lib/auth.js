import jwt from "jsonwebtoken";
import connectDB from "./mongodb.js";
import User from "../models/User.js";

/**
 * Verify JWT token from cookies or Authorization header
 * Returns the user object if valid, null otherwise
 */
export async function verifyAuth(req) {
  try {
    // Get token from cookie or Authorization header
    const cookies = parseCookies(req.headers.cookie || "");
    const token =
      cookies.token || req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return null;
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Connect to DB and get user
    await connectDB();
    const user = await User.findById(decoded.id).select("-__v");

    return user || null;
  } catch (error) {
    console.error("Auth verification error:", error.message);
    return null;
  }
}

/**
 * Middleware wrapper that requires authentication
 */
export function withAuth(handler) {
  return async (req, res) => {
    const user = await verifyAuth(req);

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = user;
    return handler(req, res);
  };
}

/**
 * Parse cookies from cookie header string
 */
function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;

  cookieHeader.split(";").forEach((cookie) => {
    const [name, ...rest] = cookie.split("=");
    if (name && rest.length) {
      cookies[name.trim()] = rest.join("=").trim();
    }
  });

  return cookies;
}

/**
 * Generate JWT token
 */
export function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}
