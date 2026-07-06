import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    price: {
      monthly: { type: Number, default: 0 },
      yearly: { type: Number, default: 0 },
    },
    currency: { type: String, default: "USD" },
    features: {
      workbenches: { type: Number, default: 1 },
      articlesPerWorkbench: { type: Number, default: 3 },
      collaborators: { type: Number, default: 1 },
      apiKeys: { type: Number, default: 0 },
      storageLimitMB: { type: Number, default: 500 },
      apiRequestsPerMonth: { type: Number, default: 1000 }, // -1 = unlimited
      aiTools: { type: Boolean, default: false },
      kanban: { type: Boolean, default: false },
    },
    featureList: [{ type: String }],
    isActive: { type: Boolean, default: true },
    stripePriceId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Plan", planSchema);
