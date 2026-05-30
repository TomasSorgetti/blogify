import "../../../styles/cta-background.css";

export function CTABackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="cta-beam-h" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="cta-beam-v" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="cta-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>

          <filter
            id="cta-glow-filter"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <pattern
            id="cta-grid"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="0.5"
              strokeOpacity="0.04"
            />
          </pattern>

          <pattern
            id="cta-dots"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="20"
              cy="20"
              r="1"
              fill="var(--accent)"
              fillOpacity="0.1"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#cta-grid)" />

        <g className="left-elements">
          <rect
            x="5%"
            y="-100"
            width="1"
            height="80"
            fill="url(#cta-beam-v)"
            className="animate-beam-down-left"
          />
          <rect
            x="10%"
            y="-100"
            width="1"
            height="60"
            fill="url(#cta-beam-v)"
            className="animate-beam-down-left-2"
          />

          <circle
            cx="3%"
            cy="30%"
            r="2"
            fill="var(--accent)"
            fillOpacity="0.3"
            className="animate-float-left-1"
          />
          <circle
            cx="8%"
            cy="60%"
            r="1.5"
            fill="var(--accent)"
            fillOpacity="0.25"
            className="animate-float-left-2"
          />
          <circle
            cx="12%"
            cy="45%"
            r="1"
            fill="var(--accent)"
            fillOpacity="0.2"
            className="animate-float-left-3"
          />

          <path
            d="M 20 30 L 20 15 L 35 15"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeOpacity="0.15"
            className="animate-corner-left"
          />
          <g className="animate-corner-left-2">
            <line
              x1="20"
              y1="calc(100% - 30px)"
              x2="20"
              y2="calc(100% - 15px)"
              stroke="var(--accent)"
              strokeWidth="1"
              strokeOpacity="0.15"
            />
            <line
              x1="20"
              y1="calc(100% - 15px)"
              x2="35"
              y2="calc(100% - 15px)"
              stroke="var(--accent)"
              strokeWidth="1"
              strokeOpacity="0.15"
            />
          </g>
        </g>

        <g className="right-elements">
          <rect
            x="95%"
            y="-100"
            width="1"
            height="80"
            fill="url(#cta-beam-v)"
            className="animate-beam-down-right"
          />
          <rect
            x="90%"
            y="-100"
            width="1"
            height="60"
            fill="url(#cta-beam-v)"
            className="animate-beam-down-right-2"
          />

          <circle
            cx="97%"
            cy="40%"
            r="2"
            fill="var(--accent)"
            fillOpacity="0.3"
            className="animate-float-right-1"
          />
          <circle
            cx="92%"
            cy="70%"
            r="1.5"
            fill="var(--accent)"
            fillOpacity="0.25"
            className="animate-float-right-2"
          />
          <circle
            cx="88%"
            cy="25%"
            r="1"
            fill="var(--accent)"
            fillOpacity="0.2"
            className="animate-float-right-3"
          />

          <g className="animate-corner-right">
            <line
              x1="calc(100% - 20px)"
              y1="15"
              x2="calc(100% - 35px)"
              y2="15"
              stroke="var(--accent)"
              strokeWidth="1"
              strokeOpacity="0.15"
            />
            <line
              x1="calc(100% - 20px)"
              y1="15"
              x2="calc(100% - 20px)"
              y2="30"
              stroke="var(--accent)"
              strokeWidth="1"
              strokeOpacity="0.15"
            />
          </g>
          <g className="animate-corner-right-2">
            <line
              x1="calc(100% - 20px)"
              y1="calc(100% - 15px)"
              x2="calc(100% - 35px)"
              y2="calc(100% - 15px)"
              stroke="var(--accent)"
              strokeWidth="1"
              strokeOpacity="0.15"
            />
            <line
              x1="calc(100% - 20px)"
              y1="calc(100% - 15px)"
              x2="calc(100% - 20px)"
              y2="calc(100% - 30px)"
              stroke="var(--accent)"
              strokeWidth="1"
              strokeOpacity="0.15"
            />
          </g>
        </g>

        <ellipse
          cx="0%"
          cy="50%"
          rx="15%"
          ry="40%"
          fill="var(--accent)"
          fillOpacity="0.03"
        />
        <ellipse
          cx="100%"
          cy="50%"
          rx="15%"
          ry="40%"
          fill="var(--accent)"
          fillOpacity="0.03"
        />
      </svg>

      <div className="absolute left-1/2 top-1/2 h-75 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[80px]" />
    </div>
  );
}
