const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Event date is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["upcoming", "brewing", "past"],
      default: "upcoming",
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
    },
    location: {
      type: String,
      default: "KIET Group of Institutions, Ghaziabad",
    },
    moreInfoUrl: {
      type: String,
      default: "",
    },
    prize: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
    highlights: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: "",
    },
    accent: {
      type: String,
      default: "#bcf954",
    },
    gradient: {
      type: String,
      default: "linear-gradient(135deg,#0a1a02 0%,#0e0e0e 100%)",
    },
    participants: {
      type: Number,
      default: 0,
    },
    photos: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for querying events by status ordered by creation date
EventSchema.index({ status: 1, createdAt: -1 });
EventSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Event", EventSchema);
