import { useId } from "react";

interface PricingCardBackgroundProps {
  variant: "free" | "pro" | "premium";
}

export function PricingCardBackground({ variant }: PricingCardBackgroundProps) {
  const id = useId();

  const colors = {
    free: { primary: "#22d3ee", secondary: "#0891b2", rgb: "34, 211, 238" },
    pro: { primary: "#a855f7", secondary: "#7c3aed", rgb: "168, 85, 247" },
    premium: { primary: "#f97316", secondary: "#ea580c", rgb: "249, 115, 22" },
  };

  const { primary } = colors[variant];

  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`${id}-grid`}
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke={primary}
              strokeWidth="0.5"
              opacity="0.08"
            />
          </pattern>

          <pattern
            id={`${id}-dots`}
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="20" cy="20" r="1" fill={primary} opacity="0.12" />
          </pattern>

          <radialGradient id={`${id}-radial`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={primary} stopOpacity="0.15" />
            <stop offset="100%" stopColor={primary} stopOpacity="0" />
          </radialGradient>

          <linearGradient id={`${id}-flow-h`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={primary} stopOpacity="0" />
            <stop offset="50%" stopColor={primary} stopOpacity="0.6" />
            <stop offset="100%" stopColor={primary} stopOpacity="0" />
          </linearGradient>

          <linearGradient id={`${id}-flow-v`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={primary} stopOpacity="0" />
            <stop offset="50%" stopColor={primary} stopOpacity="0.5" />
            <stop offset="100%" stopColor={primary} stopOpacity="0" />
          </linearGradient>

          <filter
            id={`${id}-glow`}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="100%" height="100%" fill={`url(#${id}-grid)`} />
        <rect width="100%" height="100%" fill={`url(#${id}-dots)`} />

        <circle cx="50%" cy="50%" r="200" fill={`url(#${id}-radial)`} />

        <g className="flow-horizontal">
          <rect
            x="-100"
            y="30%"
            width="200"
            height="1"
            fill={`url(#${id}-flow-h)`}
            className="animate-flow-h-1"
          />
          <rect
            x="-100"
            y="55%"
            width="180"
            height="0.8"
            fill={`url(#${id}-flow-h)`}
            className="animate-flow-h-2"
          />
          <rect
            x="-100"
            y="75%"
            width="190"
            height="0.8"
            fill={`url(#${id}-flow-h)`}
            className="animate-flow-h-3"
          />
        </g>

        <g className="flow-vertical">
          <rect
            x="25%"
            y="-100"
            width="1"
            height="200"
            fill={`url(#${id}-flow-v)`}
            className="animate-flow-v-1"
          />
          <rect
            x="70%"
            y="-100"
            width="0.8"
            height="180"
            fill={`url(#${id}-flow-v)`}
            className="animate-flow-v-2"
          />
        </g>

        <g filter={`url(#${id}-glow)`}>
          <circle
            cx="30"
            cy="40"
            r="2.5"
            fill={primary}
            className="animate-pulse"
            style={{ animationDuration: "2s" }}
          />
          <circle
            cx="370"
            cy="60"
            r="2"
            fill={primary}
            className="animate-pulse"
            style={{ animationDuration: "2.5s" }}
          />
          <circle
            cx="50"
            cy="450"
            r="2"
            fill={primary}
            className="animate-pulse"
            style={{ animationDuration: "3s" }}
          />
          <circle
            cx="350"
            cy="420"
            r="2.5"
            fill={primary}
            className="animate-pulse"
            style={{ animationDuration: "2s" }}
          />
        </g>

        <g opacity="0.4" filter={`url(#${id}-glow)`}>
          <line
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            stroke={primary}
            strokeWidth="0.8"
            strokeDasharray="6 8"
            className="animate-dash-1"
          />
          <line
            x1="300"
            y1="0"
            x2="400"
            y2="100"
            stroke={primary}
            strokeWidth="0.8"
            strokeDasharray="6 8"
            className="animate-dash-2"
          />
          <line
            x1="50"
            y1="450"
            x2="150"
            y2="350"
            stroke={primary}
            strokeWidth="0.8"
            strokeDasharray="6 8"
            className="animate-dash-1"
          />
        </g>

        <g>
          <circle
            cx="80"
            cy="120"
            r="20"
            fill="none"
            stroke={primary}
            strokeWidth="0.4"
            opacity="0.3"
            className="animate-orbit"
          />
          <circle cx="80" cy="120" r="3" fill={primary} opacity="0.8" />
        </g>
        <g>
          <circle
            cx="320"
            cy="380"
            r="25"
            fill="none"
            stroke={primary}
            strokeWidth="0.4"
            opacity="0.25"
            className="animate-orbit"
            style={{ animationDirection: "reverse" }}
          />
          <circle cx="320" cy="380" r="2.5" fill={primary} opacity="0.7" />
        </g>
      </svg>

      <style>{`
        @keyframes flow-h {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(500px);
          }
        }
        @keyframes flow-v {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(500px);
          }
        }
        @keyframes dash-animation {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 14;
          }
        }
        @keyframes orbit-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .animate-flow-h-1 {
          animation: flow-h 3s ease-in-out infinite;
        }
        .animate-flow-h-2 {
          animation: flow-h 3.5s ease-in-out infinite 0.3s;
        }
        .animate-flow-h-3 {
          animation: flow-h 4s ease-in-out infinite 0.6s;
        }

        .animate-flow-v-1 {
          animation: flow-v 3.2s ease-in-out infinite 0.2s;
        }
        .animate-flow-v-2 {
          animation: flow-v 3.8s ease-in-out infinite 0.5s;
        }

        .animate-dash-1 {
          animation: dash-animation 2s linear infinite;
        }
        .animate-dash-2 {
          animation: dash-animation 2s linear infinite 0.5s;
        }

        .animate-orbit {
          animation: orbit-spin 8s linear infinite;
          transform-origin: center;
        }
      `}</style>
    </div>
  );
}
