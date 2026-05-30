import "../../../styles/features.css";
import SparklesIcon from "../../ui/icons/sparkles-icon";
import WorkspaceIcon from "../../ui/icons/workspace-icon";
import KeyIcon from "../../ui/icons/key-icon";
import ChartIcon from "../../ui/icons/chart-icon";
import GlobeIcon from "../../ui/icons/globe-icon";
import ZapIcon from "../../ui/icons/zap-icon";
import FeatureCard from "../../ui/cards/feature-card";

const features = [
  {
    icon: SparklesIcon,
    title: "AI-Powered Writing",
    description:
      "Generate drafts, rewrite content, and optimize for SEO with our AI tools.",
    link: "/#features",
  },
  {
    icon: WorkspaceIcon,
    title: "Collaborative Workspaces",
    description:
      "Organize content by team, project, or client with powerful workspace management.",
    link: "/#features",
  },
  {
    icon: KeyIcon,
    title: "Public API",
    description:
      "Access your content programmatically with secure API keys and granular scopes.",
    link: "/#features",
  },
  {
    icon: ChartIcon,
    title: "Analytics & Insights",
    description:
      "Track views, engagement, and API usage with detailed analytics dashboards.",
    link: "/#features",
  },
  {
    icon: GlobeIcon,
    title: "Multi-Platform Export",
    description:
      "Export to WordPress, Medium, Notion, or embed anywhere with our JS widget.",
    link: "/#features",
  },
  {
    icon: ZapIcon,
    title: "Lightning Fast",
    description:
      "Built on modern infrastructure for instant publishing and real-time updates.",
    link: "/#features",
  },
];

export function Features() {
  return (
    <section className="border-t border-border py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to build a modern blog
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From AI-assisted writing to powerful integrations, we&apos;ve got
            you covered.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border border-border/50" />
            ))}
          </div>

          <ul className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <li key={feature.title}>
                <FeatureCard index={index} feature={feature} />
              </li>
            ))}
          </ul>

          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <svg className="h-full w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient
                  id="line-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    stopColor="hsl(var(--accent))"
                    stopOpacity="0"
                  />
                  <stop
                    offset="50%"
                    stopColor="hsl(var(--accent))"
                    stopOpacity="0.3"
                  />
                  <stop
                    offset="100%"
                    stopColor="hsl(var(--accent))"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
