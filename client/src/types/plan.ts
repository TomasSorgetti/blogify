export interface LandingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  variant: "free" | "pro" | "premium";
  popular?: boolean;
  disabled?: boolean;
}

export interface IPlan {
  _id: string;
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  currency: string;
  features: {
    workbenches: number;
    articlesPerWorkbench: number;
    collaborators: number;
    apiKeys: number;
    storageLimitMB: number;
    aiTools: boolean;
  };
  featureList: string[];
  isActive: boolean;
  stripePriceId: string;
}
