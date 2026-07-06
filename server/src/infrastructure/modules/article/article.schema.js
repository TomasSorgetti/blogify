import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    summary: {
      type: String,
      required: [true, "Summary is required"],
      trim: true,
      maxlength: [500, "Summary must not exceed 500 characters"],
    },
    tags: {
      type: [String],
      index: true,
      default: [],
    },
    status: {
      type: String,
      enum: {
        values: ["DRAFT", "PUBLISHED", "ARCHIVED"],
        message: "{VALUE} is not a valid status",
      },
      default: "DRAFT",
    },
    views: {
      type: Number,
      default: 0,
      min: [0, "Views cannot be negative"],
    },
    image: {
      type: String,
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    language: {
      type: String,
      default: "en",
      trim: true,
      lowercase: true,
      index: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    workbench: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workbench",
      required: false,
      default: null,
    },
    isGlobal: {
      type: Boolean,
      default: false,
      index: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    kanbanColumn: {
      type: String,
      enum: {
        values: ["idea", "writing", "review", "published"],
        message: "{VALUE} is not a valid kanban column",
      },
      default: "idea",
    },
  },
  { timestamps: true },
);

articleSchema.index({
  title: "text",
  summary: "text",
  content: "text",
});

articleSchema.index({ workbench: 1, status: 1, createdAt: -1 });
articleSchema.index({ isGlobal: 1, status: 1, createdAt: -1 });
articleSchema.index({ author: 1, createdAt: -1 });
articleSchema.index({ status: 1, isFeatured: 1, createdAt: -1 });

export default mongoose.model("Article", articleSchema);
