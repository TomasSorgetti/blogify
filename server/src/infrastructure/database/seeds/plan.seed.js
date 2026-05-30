export default async function seedPlans(PlanSchema) {
  const defaultPlans = [
    {
      name: "Free Plan",
      price: { monthly: 0, yearly: 0 },
      features: {
        workbenches: 1,
        articlesPerWorkbench: 3,
        collaborators: 1,
        apiKeys: 0,
        storageLimitMB: 500,
        aiTools: false,
        kanban: false,
      },
      featureList: [
        "Up to 3 articles per workspace",
        "1 workspace",
        "Basic support",
      ],
      stripePriceId: null,
      isActive: true,
    },
    {
      name: "Pro Plan",
      price: { monthly: 10, yearly: 100 },
      features: {
        workbenches: 3,
        articlesPerWorkbench: 30,
        collaborators: 5,
        apiKeys: 3,
        storageLimitMB: 2000,
        aiTools: false,
        kanban: true,
      },
      featureList: [
        "Up to 30 articles per workspace",
        "3 workspaces",
        "Editorial Kanban Board",
        "API access (3 keys)",
        "Priority support",
      ],
      stripePriceId: "price_1SHHYIPXi2Uj1TwTRIG1YVVA",
      isActive: true,
    },
    {
      name: "Premium Plan",
      price: { monthly: 25, yearly: 300 },
      features: {
        workbenches: 10,
        articlesPerWorkbench: -1,
        collaborators: 20,
        apiKeys: 10,
        storageLimitMB: 10000,
        aiTools: true,
        kanban: true,
      },
      featureList: [
        "Unlimited articles",
        "10 workspaces",
        "Editorial Kanban Board",
        "API access (10 keys)",
        "AI tools included",
        "24/7 premium support",
      ],
      stripePriceId: "price_1SHIXqPXi2Uj1TwTPTZ8FYl1",
      isActive: true,
    },
  ];

  for (const plan of defaultPlans) {
    await PlanSchema.findOneAndUpdate(
      { name: plan.name },
      { $set: plan },
      { upsert: true, new: true },
    );
    console.log(`Plan '${plan.name}' upserted`);
  }
}
