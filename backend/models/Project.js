const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
    },
    techStack: {
      type: [String],
      required: [true, "Tech stack is required"],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "At least one tech stack item is required",
      },
    },
    domain: {
      type: String,
      required: [true, "Domain is required"],
      trim: true,
    },
    linkedinUrl: {
      type: String,
      required: [true, "LinkedIn URL is required"],
      trim: true,
    },
    githubLink: {
      type: String,
      default: "",
      trim: true,
    },
    liveLink: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Custom validation: at least one of githubLink or liveLink must be provided
ProjectSchema.pre("validate", function (next) {
  const github = (this.githubLink || "").trim();
  const live = (this.liveLink || "").trim();
  if (!github && !live) {
    this.invalidate("githubLink", "At least one of GitHub Link or Live Link is required.");
    this.invalidate("liveLink", "At least one of GitHub Link or Live Link is required.");
  }
  next();
});

module.exports = mongoose.model("Project", ProjectSchema);
