const mongoose = require("mongoose");

const TeamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Member name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["core", "coordinator"],
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      default: "",
      trim: true,
    },
    domain: {
      type: String,
      default: "",
      trim: true,
    },
    photo: {
      type: String,
      default: "",
      trim: true,
    },
    bio: {
      type: String,
      default: "",
      trim: true,
    },
    linkedin: {
      type: String,
      default: "",
      trim: true,
    },
    github: {
      type: String,
      default: "",
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeamMember", TeamMemberSchema);
