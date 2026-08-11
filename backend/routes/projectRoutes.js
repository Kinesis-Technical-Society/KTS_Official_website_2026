const express = require("express");
const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");
const { cacheMiddleware, clearCache } = require("../middleware/cacheMiddleware");
const router = express.Router();

const DEFAULT_PROJECTS = [
  {
    title: "StudyNotion – Learning Management System",
    description: "A comprehensive LMS platform for online learning with course management",
    techStack: ["React", "Node.js", "Tailwind", "NodeMailer"],
    liveLink: "https://studynotion-yash-aggarwal.vercel.app/",
    githubLink: "https://github.com/yash-070702/StudyNotion",
    domain: "Web Development",
    linkedinUrl: "https://www.linkedin.com/in/yash-kumar-aggarwal-519658265/",
  },
  {
    title: "AlgoFlow – DSA Algorithm Visualizer",
    description: "Interactive visualization tool for data structures and algorithms with step-by-step animations.",
    techStack: ["Next.js", "Node.js", "Tailwind", "Animater"],
    liveLink: "https://algo-flow-nine.vercel.app/",
    githubLink: "https://github.com/Shivendra-11/AlgoFlow",
    domain: "Web Development",
    linkedinUrl: "https://www.linkedin.com/in/shivendra-keshari-46aa67256/",
  },
  {
    title: "TicketEase – Ticket Exchange Platform",
    description: "Peer-to-peer ticket marketplace for buying and selling event tickets securely with verification and services.",
    techStack: ["React", "Node.js", "Tailwind", "NodeMailer"],
    liveLink: "https://ticket-ease-frontend-apx2.vercel.app/",
    githubLink: "https://github.com/Shivendra-11/TicketEase_Frontend",
    domain: "Web Development",
    linkedinUrl: "https://www.linkedin.com/in/shivendra-keshari-46aa67256/",
  },
  {
    title: "CodeSync – Real-time Collaborative Code Editor",
    description: "Multi-developer coding platform with live collaboration, instant synchronization.",
    techStack: ["Python", "MediaPipe", "OpenCV", "Streamlit"],
    liveLink: "https://unified-code-client.vercel.app/",
    githubLink: "https://github.com/yash-070702/Codehive",
    domain: "Web Development",
    linkedinUrl: "https://www.linkedin.com/in/yash-kumar-aggarwal-519658265/",
  },
  {
    title: "DevLinker – Seniors to Juniors Connection Platform",
    description: "A platform that connects seniors with juniors to help them learn new skills and share knowledge.",
    techStack: ["React", "Node.js", "Tailwind", "NodeMailer"],
    githubLink: "https://github.com/Shivendra-11/devTinder-web-UI",
    domain: "Web Development",
    linkedinUrl: "https://www.linkedin.com/in/shivendra-keshari-46aa67256/",
  },
  {
    title: "PoseFit – Yoga Posture Correction",
    description: "A pose detection system using MediaPipe and custom ML model to give real-time feedback on yoga posture correctness.",
    techStack: ["Python", "MediaPipe", "OpenCV", "Streamlit"],
    liveLink: "https://posefityoga.netlify.app/",
    githubLink: "https://github.com/VashuJain2024/PoseFit_Yoga",
    domain: "Machine Learning",
    linkedinUrl: "https://www.linkedin.com/in/vashujain/",
  },
  {
    title: "AI Recommendation Music System",
    description: "Intelligent music discovery platform using machine learning algorithms for personalized song recommendations.",
    techStack: ["Python", "MediaPipe", "OpenCV", "Streamlit"],
    githubLink: "https://github.com/srisheph/Promptune",
    domain: "Machine Learning",
    linkedinUrl: "https://www.linkedin.com/in/srisheph/",
  },
  {
    title: "Intrusion Detection System",
    description: "Advanced network security solution that monitors and analyzes network traffic to detect threats.",
    techStack: ["Python", "MediaPipe", "OpenCV", "Streamlit"],
    githubLink: "https://github.com/aniketyadav-22/Intrusion-Detection-System",
    domain: "Machine Learning",
    linkedinUrl: "https://www.linkedin.com/in/aniket-yadav-work22/",
  },
  {
    title: "Pixel-to-Code Portfolio Converter",
    description: "UI/UX design to code conversion tool that transforms portfolio designs into fully functional responsive websites.",
    techStack: ["UI/UX", "Figma", "Adobe XD"],
    liveLink: "https://www.figma.com/proto/siKSnPnIRlV6l2LINvHaGX/Untitled?node-id=1-2",
    domain: "UI/UX",
    linkedinUrl: "https://www.linkedin.com/in/shivendra-keshari-46aa67256/",
  },
];

// Helper to seed initial projects if collection is empty
const seedInitialProjectsIfEmpty = async () => {
  try {
    const count = await Project.countDocuments();
    if (count === 0) {
      const formatted = DEFAULT_PROJECTS.map((p) => ({
        title: p.title,
        description: p.description,
        techStack: Array.isArray(p.techStack) ? p.techStack : [],
        domain: p.domain || "Web Development",
        linkedinUrl: p.linkedinUrl || "",
        githubLink: p.githubLink || "",
        liveLink: p.liveLink || "",
      }));

      await Project.insertMany(formatted);
      console.log(`[Seed] Initialized database with ${formatted.length} default projects into MongoDB.`);
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
router.get("/", cacheMiddleware(60), async (req, res) => {
  try {
    await seedInitialProjectsIfEmpty();
    const projects = await Project.find().sort({ createdAt: -1 }).lean();
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
router.get("/:id", cacheMiddleware(60), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).lean();
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
    clearCache("/api/projects");

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

    clearCache("/api/projects");

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

    clearCache("/api/projects");

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
