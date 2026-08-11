const express = require("express");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const TeamMember = require("../models/TeamMember");
const authMiddleware = require("../middleware/authMiddleware");
const { cacheMiddleware, clearCache } = require("../middleware/cacheMiddleware");
const router = express.Router();

// Helper function to seed team members from static JSON files (Core Team & Coordinators only)
const seedInitialTeamIfEmpty = async (force = false) => {
  try {
    // Clean up any legacy mentors or founders from DB
    await TeamMember.deleteMany({ category: { $in: ["mentor", "founder"] } });

    // Deduplicate existing team members in DB (by name + category + role)
    const existingMembers = await TeamMember.find({}).sort({ order: 1, createdAt: 1 });
    const seen = new Set();
    const dupsToDelete = [];

    for (const m of existingMembers) {
      const key = `${(m.name || "").toLowerCase().trim()}|${(m.category || "").toLowerCase().trim()}|${(m.role || "").toLowerCase().trim()}`;
      if (seen.has(key)) {
        dupsToDelete.push(m._id);
      } else {
        seen.add(key);
      }
    }

    if (dupsToDelete.length > 0) {
      await TeamMember.deleteMany({ _id: { $in: dupsToDelete } });
      console.log(`[Seed] Cleaned up ${dupsToDelete.length} duplicate team members from database.`);
      clearCache("/api/team");
    }

    const count = await TeamMember.countDocuments();
    if (count > 0 && !force) return;

    if (force) {
      await TeamMember.deleteMany({});
      console.log("[Seed] Cleared existing Team Members for reseed.");
    }
  } catch (err) {
    console.warn("Failed to seed initial team members:", err.message);
  }
};

/**
 * @route   GET /api/team
 * @desc    Fetch all team members (optionally filter by category)
 * @access  Public
 */
router.get("/", cacheMiddleware(60), async (req, res) => {
  try {
    await seedInitialTeamIfEmpty();
    const { category } = req.query;

    const filter = {};
    if (category) {
      filter.category = String(category).toLowerCase();
    }

    const members = await TeamMember.find(filter).sort({ order: 1, createdAt: -1 }).lean();
    return res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error fetching team members",
      error: error.message,
    });
  }
});

/**
 * @route   POST /api/team
 * @desc    Create a new team member
 * @access  Private (Admin)
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, category, role, domain, photo, bio, linkedin, github, order } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Member name is required." });
    }
    if (!category || !category.trim()) {
      return res.status(400).json({ success: false, message: "Category is required." });
    }

    const newMember = new TeamMember({
      name: name.trim(),
      category: category.trim().toLowerCase(),
      role: (role || "").trim(),
      domain: (domain || "").trim(),
      photo: (photo || "").trim(),
      bio: (bio || "").trim(),
      linkedin: (linkedin || "").trim(),
      github: (github || "").trim(),
      order: order ? Number(order) : 0,
    });

    const savedMember = await newMember.save();
    clearCache("/api/team");

    return res.status(201).json({
      success: true,
      message: `Team member "${savedMember.name}" created successfully.`,
      data: savedMember,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating team member",
      error: error.message,
    });
  }
});

/**
 * @route   PUT /api/team/:id
 * @desc    Update an existing team member
 * @access  Private (Admin)
 */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, category, role, domain, photo, bio, linkedin, github, order } = req.body;

    let existing = null;
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      existing = await TeamMember.findById(req.params.id);
    }
    if (!existing) {
      existing = await TeamMember.findOne({ name: req.params.id });
    }

    if (!existing) {
      return res.status(404).json({ success: false, message: "Team member not found" });
    }

    if (name) existing.name = name.trim();
    if (category) existing.category = category.trim().toLowerCase();
    if (role !== undefined) existing.role = role.trim();
    if (domain !== undefined) existing.domain = domain.trim();
    if (photo !== undefined) existing.photo = photo.trim();
    if (bio !== undefined) existing.bio = bio.trim();
    if (linkedin !== undefined) existing.linkedin = linkedin.trim();
    if (github !== undefined) existing.github = github.trim();
    if (order !== undefined) existing.order = Number(order);

    const updatedMember = await existing.save();
    clearCache("/api/team");

    return res.status(200).json({
      success: true,
      message: "Team member updated successfully",
      data: updatedMember,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating team member",
      error: error.message,
    });
  }
});

/**
 * @route   DELETE /api/team/:id
 * @desc    Delete a team member
 * @access  Private (Admin)
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    let member = null;
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      member = await TeamMember.findById(req.params.id);
    }
    if (!member) {
      member = await TeamMember.findOne({ name: req.params.id });
    }

    if (!member) {
      return res.status(404).json({ success: false, message: "Team member not found" });
    }

    await TeamMember.findByIdAndDelete(member._id);
    clearCache("/api/team");

    return res.status(200).json({
      success: true,
      message: `Team member "${member.name}" deleted successfully.`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting team member",
      error: error.message,
    });
  }
});

/**
 * @route   POST /api/team/reseed
 * @desc    Force re-seed all team members from static JSON files
 * @access  Private (Admin)
 */
router.post("/reseed", authMiddleware, async (req, res) => {
  try {
    await seedInitialTeamIfEmpty(true);
    clearCache("/api/team");
    return res.status(200).json({
      success: true,
      message: "Successfully re-seeded all team members from data folder JSON files!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error re-seeding team members",
      error: error.message,
    });
  }
});

module.exports = router;
