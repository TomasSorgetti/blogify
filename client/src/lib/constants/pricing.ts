export const FEATURE_COMPARISON = [
  { feature: "Articles", free: "3", pro: "30", premium: "Unlimited" },
  { feature: "Workspaces", free: "1", pro: "5", premium: "Unlimited" },
  { feature: "Team members", free: "1", pro: "5", premium: "Unlimited" },
  {
    feature: "API Access",
    free: false,
    pro: "Read-only",
    premium: "Full access",
  },
  { feature: "API Key scopes", free: false, pro: false, premium: true },
  {
    feature: "Rate limiting",
    free: "100/day",
    pro: "10K/day",
    premium: "100K/day",
  },
  { feature: "AI draft generation", free: false, pro: false, premium: true },
  { feature: "AI rewriting", free: false, pro: false, premium: true },
  { feature: "SEO optimization", free: false, pro: false, premium: true },
  { feature: "Export to WordPress", free: false, pro: true, premium: true },
  { feature: "Export to Medium", free: false, pro: true, premium: true },
  { feature: "Export to Notion", free: false, pro: true, premium: true },
  { feature: "JS embed widget", free: true, pro: true, premium: true },
  {
    feature: "Analytics",
    free: "Basic",
    pro: "Detailed",
    premium: "Advanced",
  },
  { feature: "User badges", free: false, pro: false, premium: true },
  {
    feature: "Support",
    free: "Community",
    pro: "Email",
    premium: "24/7 Priority",
  },
];

export const PRICING_FAQ = [
  {
    q: "Can I upgrade or downgrade anytime?",
    a: "Yes, you can change your plan at any time. Changes take effect immediately, and we'll prorate your billing accordingly.",
  },
  {
    q: "What happens if I exceed my article limit?",
    a: "You'll receive a notification when approaching your limit. To add more articles, you'll need to upgrade your plan or delete existing articles.",
  },
  {
    q: "Is there a free trial for paid plans?",
    a: "Yes, both Pro and Premium plans come with a 14-day free trial. No credit card required to start.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
  },
];
