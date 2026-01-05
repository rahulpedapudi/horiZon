import express from "express";
import passport from "passport";
import { generateToken, protect } from "../middleware/auth.js";

const router = express.Router();

// @route   GET /api/auth/google
// @desc    Initiate Google OAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// @route   GET /api/auth/google/callback
// @desc    Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed`,
  }),
  (req, res) => {
    // Generate JWT token
    const token = generateToken(req.user._id);

    // Set httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Redirect to frontend
    const redirectUrl = req.user.isOnboarded
      ? process.env.CLIENT_URL
      : `${process.env.CLIENT_URL}/onboarding`;

    res.redirect(redirectUrl);
  }
);

// @route   GET /api/auth/me
// @desc    Get current user
router.get("/me", protect, (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      isOnboarded: req.user.isOnboarded,
    },
  });
});

// @route   POST /api/auth/logout
// @desc    Logout user (clear cookie)
router.post("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.json({ message: "Logged out successfully" });
});

export default router;
