const express = require("express");
const fs = require("fs");
const path = require("path");
const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Helper to seed initial projects if collection is empty
const seedInitialProjectsIfEmpty = async () => {
  try {
    const count = await Project.countDocuments();
    if (count === 0) {
      // Read initial projects from projects.json
      const jsonPath = path.join(__dirname, "../../frontend/app/data/projects.json");
      if (fs.existsSync(jsonPath)) {
        const rawData = fs.readFileSync(jsonPath, "utf-8");
        const initialProjects = JSON.parse(rawData);

        const formatted = initialProjects.map((p) => ({
          title: p.title,
          description: p.description,
          techStack: Array.isArray(p.techStack) ? p.techStack : (p.techStack ? p.techStack.split(",").map((s) => s.trim()) : []),
          domain: p.domain || "Web Development",
          linkedinUrl: p.linkedinUrl || "",
          githubLink: p.githubLink || p.githubUrl || "",
          liveLink: p.liveLink || p.liveUrl || "",
        }));

        await Project.insertMany(formatted);
        console.log(`[Seed] Initialized database with ${formatted.length} projects from projects.json`);
      }
    }
  } catch (err) {
    console.warn("Failed to seed initial projects:", err.message);
  }
};

/**
 * @route   GET /api/projects
 * @desc    Fetch all projects (auto-seeds initial projects if DB empty)
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    await seedInitialProjectsIfEmpty();
    const projects = await Project.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error fetching projects",
      error: error.message,
    });
  }
});

/**
 * @route   GET /api/projects/:id
 * @desc    Get single project by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving project",
      error: error.message,
    });
  }
});

/**
 * @route   POST /api/projects
 * @desc    Create a new project
 * @access  Private (Admin)
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    let { title, description, techStack, domain, linkedinUrl, githubLink, liveLink } = req.body;

    // Sanitize & Format TechStack if string passed
    if (typeof techStack === "string") {
      techStack = techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }

    // Validation for required fields
    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: "Project title is required." });
    }
    if (!description || !description.trim()) {
      return res.status(400).json({ success: false, message: "Project description is required." });
    }
    if (!techStack || !Array.isArray(techStack) || techStack.length === 0) {
      return res.status(400).json({ success: false, message: "Tech stack is required (at least one technology)." });
    }
    if (!domain || !domain.trim()) {
      return res.status(400).json({ success: false, message: "Domain is required." });
    }
    if (!linkedinUrl || !linkedinUrl.trim()) {
      return res.status(400).json({ success: false, message: "LinkedIn URL is required." });
    }

    // Validation: At least one of GitHub link or Live link is required
    const cleanGithub = (githubLink || "").trim();
    const cleanLive = (liveLink || "").trim();
    if (!cleanGithub && !cleanLive) {
      return res.status(400).json({
        success: false,
        message: "At least one link (GitHub Link OR Live Link) is required.",
      });
    }

    const newProject = new Project({
      title: title.trim(),
      description: description.trim(),
      techStack,
      domain: domain.trim(),
      linkedinUrl: linkedinUrl.trim(),
      githubLink: cleanGithub,
      liveLink: cleanLive,
    });

    const savedProject = await newProject.save();

    return res.status(201).json({
      success: true,
      message: "Project created successfully!",
      data: savedProject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message,
    });
  }
});

/**
 * @route   PUT /api/projects/:id
 * @desc    Update an existing project
 * @access  Private (Admin)
 */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    let { title, description, techStack, domain, linkedinUrl, githubLink, liveLink } = req.body;

    if (typeof techStack === "string") {
      techStack = techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }

    const updateData = {};
    if (title) updateData.title = title.trim();
    if (description) updateData.description = description.trim();
    if (techStack && Array.isArray(techStack)) updateData.techStack = techStack;
    if (domain) updateData.domain = domain.trim();
    if (linkedinUrl) updateData.linkedinUrl = linkedinUrl.trim();
    if (githubLink !== undefined) updateData.githubLink = (githubLink || "").trim();
    if (liveLink !== undefined) updateData.liveLink = (liveLink || "").trim();

    // Check link validation if updating links
    const existingProject = await Project.findById(req.params.id);
    if (!existingProject) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    const finalGithub = updateData.githubLink !== undefined ? updateData.githubLink : existingProject.githubLink;
    const finalLive = updateData.liveLink !== undefined ? updateData.liveLink : existingProject.liveLink;

    if (!finalGithub && !finalLive) {
      return res.status(400).json({
        success: false,
        message: "At least one link (GitHub Link OR Live Link) is required.",
      });
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update project",
      error: error.message,
    });
  }
});

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete a project
 * @access  Private (Admin)
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message,
    });
  }
});

module.exports = router;
