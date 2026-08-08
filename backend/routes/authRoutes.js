const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

/**
 * @route   POST /api/admin/login
 * @desc    Admin login route - verifies email & password strictly against .env
 * @access  Public
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const envEmail = process.env.ADMIN_EMAIL || "admin@kts.com";
  const envPassword = process.env.ADMIN_PASSWORD || "ktsadmin123";

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide both email and password.",
    });
  }

  // Exact match with environment variables as requested
  if (email.trim() === envEmail.trim() && password.trim() === envPassword.trim()) {
    const secret = process.env.JWT_SECRET || "kts_jwt_secret_key_2026_secure";
    const token = jwt.sign(
      { email: envEmail, role: "admin" },
      secret,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Admin authentication successful.",
      token,
      admin: {
        email: envEmail,
        role: "admin",
      },
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid admin credentials. Email or password does not match.",
  });
});

/**
 * @route   GET /api/admin/me
 * @desc    Verify current admin session token
 * @access  Private
 */
router.get("/me", require("../middleware/authMiddleware"), (req, res) => {
  return res.status(200).json({
    success: true,
    admin: req.admin,
  });
});

module.exports = router;
