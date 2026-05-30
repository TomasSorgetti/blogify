type Props = {
  index: number;
  feature: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
    link: string;
  };
};
export default function FeatureCard({ index, feature }: Props) {
  return (
    <div className="group relative overflow-hidden border border-border/50 bg-background/50 p-8 transition-all duration-300 hover:bg-card hover:border-accent/30">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id={`feature-grid-${index}`}
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="hsl(var(--accent))"
                strokeWidth="0.5"
                strokeOpacity="0.08"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill={`url(#feature-grid-${index})`}
          />
        </svg>

        <div className="absolute inset-0 bg-linear-to-br from-accent/10 via-transparent to-transparent" />
        <div className="absolute inset-0">
          <div
            className="absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-accent/50 to-transparent"
            style={{ animation: "shimmer 2s infinite" }}
          />
          <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-accent/30 to-transparent" />
          <div className="absolute left-0 top-0 h-full w-px bg-linear-to-b from-transparent via-accent/30 to-transparent" />
          <div className="absolute right-0 top-0 h-full w-px bg-linear-to-b from-transparent via-accent/30 to-transparent" />
        </div>
      </div>

      <div className="pointer-events-none absolute right-4 top-4 grid grid-cols-3 gap-1 opacity-20 transition-opacity group-hover:opacity-40">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="h-1 w-1 rounded-full bg-accent" />
        ))}
      </div>

      <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-accent/5 blur-2xl transition-all duration-500 group-hover:bg-accent/10 group-hover:scale-150" />

      <div className="relative">
        <div className="relative mb-6 inline-flex">
          <div className="absolute inset-0 rounded-lg bg-accent/20 blur-xl opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-secondary/80 transition-all duration-300 group-hover:border-accent/50 group-hover:bg-accent/10">
            <feature.icon className="h-6 w-6 text-accent transition-transform duration-300 group-hover:scale-110" />
          </div>
        </div>

        <div className="absolute right-0 top-0 font-mono text-xs text-muted-foreground/30 transition-colors group-hover:text-accent/30">
          0{index + 1}
        </div>

        <h3 className="mb-3 text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
          {feature.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {feature.description}
        </p>

        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition-all duration-300 group-hover:opacity-100">
          <a href={feature.link}>Learn more</a>
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
