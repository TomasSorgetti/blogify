import mongoose from "mongoose";

const workbenchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: {
          type: String,
          enum: ["owner", "editor", "viewer"],
          default: "viewer",
        },
      },
    ],
    settings: {
      theme: { type: String, default: "light" },
      color: { type: String, default: null },
      integrations: [{ type: String }], // ej: "github", "slack"
      kanbanColumns: [
        {
          id: String,
          title: String,
          color: String,
          position: Number,
          isDefault: { type: Boolean, default: false },
        },
      ],
    },
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true },
);

workbenchSchema.index({ owner: 1, createdAt: -1 });
workbenchSchema.index({ "members.userId": 1 });
workbenchSchema.index({ isArchived: 1, updatedAt: -1 });

export default mongoose.model("Workbench", workbenchSchema);
