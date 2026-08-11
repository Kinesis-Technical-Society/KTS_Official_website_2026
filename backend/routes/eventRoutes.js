const express = require("express");
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");
const { cacheMiddleware, clearCache } = require("../middleware/cacheMiddleware");
const router = express.Router();

/**
 * @route   GET /api/events
 * @desc    Fetch all events (with optional status query filter, e.g. ?status=upcoming)
 * @access  Public
 */
router.get("/", cacheMiddleware(60), async (req, res) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status) {
      if (status === "upcoming_or_brewing") {
        query.status = { $in: ["upcoming", "brewing"] };
      } else {
        query.status = status;
      }
    }

    const events = await Event.find(query).sort({ createdAt: -1 }).lean();
    return res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error fetching events",
      error: error.message,
    });
  }
});

/**
 * @route   GET /api/events/:id
 * @desc    Get single event by ID
 * @access  Public
 */
router.get("/:id", cacheMiddleware(60), async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).lean();
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving event",
      error: error.message,
    });
  }
});

/**
 * @route   POST /api/events
 * @desc    Create a single event
 * @access  Private (Admin)
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      date,
      status,
      description,
      location,
      moreInfoUrl,
      prize,
      tags,
      highlights,
      image,
      accent,
      gradient,
      participants,
      photos,
    } = req.body;

    if (!title || !date || !description) {
      return res.status(400).json({
        success: false,
        message: "Title, date, and description are required fields.",
      });
    }

    const event = await Event.create({
      title,
      date,
      status: status || "upcoming",
      description,
      location: location || "KIET Group of Institutions, Ghaziabad",
      moreInfoUrl: moreInfoUrl || "",
      prize: prize || "",
      tags: Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      highlights: Array.isArray(highlights) ? highlights : typeof highlights === "string" ? highlights.split("\n").map((h) => h.trim()).filter(Boolean) : [],
      image: image || "",
      accent: accent || "#bcf954",
      gradient: gradient || "linear-gradient(135deg,#0a1a02 0%,#0e0e0e 100%)",
      participants: participants ? Number(participants) : 0,
      photos: Array.isArray(photos) ? photos : [],
    });

    clearCache("/api/events");

    return res.status(201).json({
      success: true,
      message: "Event created successfully!",
      data: event,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create event",
      error: error.message,
    });
  }
});

/**
 * @route   PUT /api/events/:id
 * @desc    Update an existing event
 * @access  Private (Admin)
 */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (typeof updateData.tags === "string") {
      updateData.tags = updateData.tags.split(",").map((t) => t.trim()).filter(Boolean);
    }
    if (typeof updateData.highlights === "string") {
      updateData.highlights = updateData.highlights.split("\n").map((h) => h.trim()).filter(Boolean);
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found for update.",
      });
    }

    clearCache("/api/events");

    return res.status(200).json({
      success: true,
      message: "Event updated successfully!",
      data: updatedEvent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update event",
      error: error.message,
    });
  }
});

/**
 * @route   DELETE /api/events/:id
 * @desc    Delete an event
 * @access  Private (Admin)
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found for deletion.",
      });
    }

    clearCache("/api/events");

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully!",
      data: deletedEvent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete event",
      error: error.message,
    });
  }
});

module.exports = router;
