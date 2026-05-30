import "../../../styles/background.css";

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient
            id="flow-gradient-h"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="40%" stopColor="var(--accent)" stopOpacity="0.6" />
            <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>

          <linearGradient
            id="flow-gradient-v"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="40%" stopColor="var(--accent)" stopOpacity="0.5" />
            <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>

          <linearGradient
            id="diagonal-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="center-glow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>

          <filter id="soft-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <pattern
            id="dot-pattern"
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
              fill="var(--foreground)"
              fillOpacity="0.08"
            />
          </pattern>

          <pattern
            id="grid-pattern"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="var(--foreground)"
              strokeWidth="0.5"
              strokeOpacity="0.04"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />

        <rect width="100%" height="100%" fill="url(#center-glow)" />

        <g className="flow-lines-h">
          <rect
            x="-200"
            y="18%"
            width="200"
            height="1"
            fill="url(#flow-gradient-h)"
            className="animate-flow-right-1"
          />
          <rect
            x="-200"
            y="35%"
            width="150"
            height="1"
            fill="url(#flow-gradient-h)"
            className="animate-flow-right-2"
          />
          <rect
            x="-200"
            y="65%"
            width="180"
            height="1"
            fill="url(#flow-gradient-h)"
            className="animate-flow-right-3"
          />
          <rect
            x="-200"
            y="82%"
            width="160"
            height="1"
            fill="url(#flow-gradient-h)"
            className="animate-flow-right-4"
          />
        </g>

        <g className="flow-lines-v">
          <rect
            x="15%"
            y="-150"
            width="1"
            height="150"
            fill="url(#flow-gradient-v)"
            className="animate-flow-down-1"
          />
          <rect
            x="40%"
            y="-150"
            width="1"
            height="120"
            fill="url(#flow-gradient-v)"
            className="animate-flow-down-2"
          />
          <rect
            x="60%"
            y="-150"
            width="1"
            height="140"
            fill="url(#flow-gradient-v)"
            className="animate-flow-down-3"
          />
          <rect
            x="85%"
            y="-150"
            width="1"
            height="130"
            fill="url(#flow-gradient-v)"
            className="animate-flow-down-4"
          />
        </g>

        <g filter="url(#soft-glow)" className="opacity-30">
          <line
            x1="-50"
            y1="100%"
            x2="25%"
            y2="50%"
            stroke="url(#diagonal-gradient)"
            strokeWidth="1"
            strokeDasharray="6 12"
            className="animate-dash-flow"
          />
          <line
            x1="75%"
            y1="-50"
            x2="105%"
            y2="50%"
            stroke="url(#diagonal-gradient)"
            strokeWidth="1"
            strokeDasharray="6 12"
            className="animate-dash-flow-reverse"
          />
        </g>

        <g className="shapes" filter="url(#soft-glow)">
          <path
            d="M 80 50 L 95 58 L 95 74 L 80 82 L 65 74 L 65 58 Z"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.5"
            strokeOpacity="0.4"
            className="animate-float-gentle-1"
          />

          <g className="animate-orbit">
            <circle
              cx="88%"
              cy="28%"
              r="35"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="0.5"
              strokeOpacity="0.25"
              strokeDasharray="4 8"
            />
            <circle
              cx="88%"
              cy="28%"
              r="25"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="0.5"
              strokeOpacity="0.15"
            />
            <circle
              cx="88%"
              cy="28%"
              r="3"
              fill="var(--accent)"
              fillOpacity="0.3"
              className="animate-pulse-glow"
            />
          </g>

          <path
            d="M 60 420 L 85 470 L 35 470 Z"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.5"
            strokeOpacity="0.35"
            className="animate-float-gentle-2"
          />

          <path
            d="M 92 75 l 20 15 l -20 15 l -20 -15 Z"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.5"
            strokeOpacity="0.3"
            className="animate-float-gentle-3"
          />

          <rect
            x="8%"
            y="35%"
            width="18"
            height="18"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.5"
            strokeOpacity="0.3"
            className="animate-rotate-slow origin-center"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        </g>

        <g className="nodes">
          <circle
            cx="20%"
            cy="25%"
            r="2"
            fill="var(--accent)"
            fillOpacity="0.5"
            className="animate-pulse-node"
          />
          <circle
            cx="75%"
            cy="20%"
            r="1.5"
            fill="var(--accent)"
            fillOpacity="0.4"
            className="animate-pulse-node-delay-1"
          />
          <circle
            cx="50%"
            cy="85%"
            r="2"
            fill="var(--accent)"
            fillOpacity="0.45"
            className="animate-pulse-node-delay-2"
          />
          <circle
            cx="85%"
            cy="60%"
            r="1.5"
            fill="var(--accent)"
            fillOpacity="0.4"
            className="animate-pulse-node"
          />
          <circle
            cx="10%"
            cy="70%"
            r="1.5"
            fill="var(--accent)"
            fillOpacity="0.35"
            className="animate-pulse-node-delay-1"
          />
          <circle
            cx="35%"
            cy="15%"
            r="1"
            fill="var(--accent)"
            fillOpacity="0.3"
            className="animate-pulse-node-delay-2"
          />
          <circle
            cx="65%"
            cy="45%"
            r="1"
            fill="var(--accent)"
            fillOpacity="0.25"
            className="animate-pulse-node"
          />
        </g>

        <g className="connections opacity-[0.08]">
          <line
            x1="20%"
            y1="25%"
            x2="35%"
            y2="15%"
            stroke="var(--accent)"
            strokeWidth="0.5"
          />
          <line
            x1="75%"
            y1="20%"
            x2="85%"
            y2="60%"
            stroke="var(--accent)"
            strokeWidth="0.5"
          />
          <line
            x1="50%"
            y1="85%"
            x2="65%"
            y2="45%"
            stroke="var(--accent)"
            strokeWidth="0.5"
          />
        </g>
      </svg>

      <div className="absolute left-1/2 top-1/3 h-125 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/4 blur-[120px]" />
      <div className="absolute -left-32 -top-32 h-87.5 w-87.5 rounded-full bg-accent/3 blur-[100px]" />
      <div className="absolute -bottom-32 -right-32 h-100 w-100 rounded-full bg-accent/3 blur-[100px]" />
    </div>
  );
}
