export function BlogHeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="blog-flow-h" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="40%" stopColor="var(--accent)" stopOpacity="0.5" />
            <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="blog-flow-v" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="40%" stopColor="var(--accent)" stopOpacity="0.4" />
            <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="blog-center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>

          <filter
            id="blog-soft-glow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <pattern
            id="blog-dot-pattern"
            x="0"
            y="0"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="16"
              cy="16"
              r="0.8"
              fill="var(--foreground)"
              fillOpacity="0.06"
            />
          </pattern>

          <pattern
            id="blog-grid-pattern"
            x="0"
            y="0"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 64 0 L 0 0 0 64"
              fill="none"
              stroke="var(--foreground)"
              strokeWidth="0.4"
              strokeOpacity="0.03"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#blog-dot-pattern)" />
        <rect width="100%" height="100%" fill="url(#blog-grid-pattern)" />
        <rect width="100%" height="100%" fill="url(#blog-center-glow)" />

        {/* Horizontal flow lines */}
        <g className="blog-flow-h">
          <rect
            x="-150"
            y="25%"
            width="150"
            height="1"
            fill="url(#blog-flow-h)"
            className="animate-blog-flow-right-1"
          />
          <rect
            x="-150"
            y="75%"
            width="120"
            height="1"
            fill="url(#blog-flow-h)"
            className="animate-blog-flow-right-2"
          />
        </g>

        {/* Vertical flow lines */}
        <g className="blog-flow-v">
          <rect
            x="20%"
            y="-100"
            width="1"
            height="100"
            fill="url(#blog-flow-v)"
            className="animate-blog-flow-down-1"
          />
          <rect
            x="80%"
            y="-100"
            width="1"
            height="80"
            fill="url(#blog-flow-v)"
            className="animate-blog-flow-down-2"
          />
        </g>

        {/* Decorative shapes */}
        <g filter="url(#blog-soft-glow)">
          {/* Document icon - top left */}
          <g className="animate-blog-float-1">
            <rect
              x="8%"
              y="20%"
              width="24"
              height="30"
              rx="2"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="0.6"
              strokeOpacity="0.35"
            />
            <line
              x1="calc(8% + 6px)"
              y1="calc(20% + 10px)"
              x2="calc(8% + 18px)"
              y2="calc(20% + 10px)"
              stroke="var(--accent)"
              strokeWidth="0.5"
              strokeOpacity="0.25"
            />
            <line
              x1="calc(8% + 6px)"
              y1="calc(20% + 16px)"
              x2="calc(8% + 18px)"
              y2="calc(20% + 16px)"
              stroke="var(--accent)"
              strokeWidth="0.5"
              strokeOpacity="0.25"
            />
            <line
              x1="calc(8% + 6px)"
              y1="calc(20% + 22px)"
              x2="calc(8% + 14px)"
              y2="calc(20% + 22px)"
              stroke="var(--accent)"
              strokeWidth="0.5"
              strokeOpacity="0.25"
            />
          </g>

          {/* Pencil icon - top right */}
          <g className="animate-blog-float-2">
            <svg x="92%" y="30%" overflow="visible">
              <path
                d="M 0 0 l 15 -15 l 5 5 l -15 15 l -7 2 l 2 -7 Z"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="0.6"
                strokeOpacity="0.3"
              />
            </svg>
          </g>

          {/* Circular orbit - center right */}
          <g className="animate-blog-orbit">
            <circle
              cx="90%"
              cy="60%"
              r="25"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="0.5"
              strokeOpacity="0.2"
              strokeDasharray="3 6"
            />
            <circle
              cx="90%"
              cy="60%"
              r="2"
              fill="var(--accent)"
              fillOpacity="0.3"
              className="animate-blog-pulse"
            />
          </g>

          {/* Tag/label shape - bottom left */}
          <g className="animate-blog-float-3">
            <svg x="5%" y="70%" overflow="visible">
              <path
                d="M 0 0 l 20 0 l 8 10 l -8 10 l -20 0 Z"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="0.5"
                strokeOpacity="0.25"
              />
              <circle
                cx="8"
                cy="10"
                r="2"
                fill="var(--accent)"
                fillOpacity="0.2"
              />
            </svg>
          </g>

          {/* Grid/layout icon - bottom right */}
          <g className="animate-blog-float-4">
            <rect
              x="88%"
              y="80%"
              width="10"
              height="10"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="0.5"
              strokeOpacity="0.25"
            />
            <rect
              x="calc(88% + 12px)"
              y="80%"
              width="10"
              height="10"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="0.5"
              strokeOpacity="0.25"
            />
            <rect
              x="88%"
              y="calc(80% + 12px)"
              width="10"
              height="10"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="0.5"
              strokeOpacity="0.25"
            />
            <rect
              x="calc(88% + 12px)"
              y="calc(80% + 12px)"
              width="10"
              height="10"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="0.5"
              strokeOpacity="0.25"
            />
          </g>
        </g>

        {/* Floating nodes */}
        <g className="blog-nodes">
          <circle
            cx="15%"
            cy="40%"
            r="1.5"
            fill="var(--accent)"
            fillOpacity="0.4"
            className="animate-blog-node-1"
          />
          <circle
            cx="85%"
            cy="25%"
            r="1.5"
            fill="var(--accent)"
            fillOpacity="0.35"
            className="animate-blog-node-2"
          />
          <circle
            cx="50%"
            cy="85%"
            r="1.5"
            fill="var(--accent)"
            fillOpacity="0.4"
            className="animate-blog-node-3"
          />
          <circle
            cx="25%"
            cy="75%"
            r="1"
            fill="var(--accent)"
            fillOpacity="0.3"
            className="animate-blog-node-1"
          />
          <circle
            cx="70%"
            cy="45%"
            r="1"
            fill="var(--accent)"
            fillOpacity="0.25"
            className="animate-blog-node-2"
          />
        </g>

        {/* Subtle connections */}
        <g className="opacity-[0.06]">
          <line
            x1="15%"
            y1="40%"
            x2="50%"
            y2="50%"
            stroke="var(--accent)"
            strokeWidth="0.5"
          />
          <line
            x1="85%"
            y1="25%"
            x2="70%"
            y2="45%"
            stroke="var(--accent)"
            strokeWidth="0.5"
          />
        </g>
      </svg>

      {/* Gradient overlays */}
      <div className="absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/3 blur-[80px]" />
      <div className="absolute -left-20 top-0 h-[200px] w-[200px] rounded-full bg-accent/2 blur-[60px]" />
      <div className="absolute -right-20 bottom-0 h-[200px] w-[200px] rounded-full bg-accent/2 blur-[60px]" />

      <style>{`
        @keyframes blog-flow-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(100vw + 300px));
          }
        }
        @keyframes blog-flow-down {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(calc(100% + 200px));
          }
        }
        @keyframes blog-float {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(6px, -8px);
          }
        }
        @keyframes blog-float-2 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-4px, -6px);
          }
        }
        @keyframes blog-float-3 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(4px, -5px);
          }
        }
        @keyframes blog-orbit {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes blog-pulse-node {
          0%,
          100% {
            opacity: 0.25;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.3);
          }
        }
        @keyframes blog-pulse {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.15);
          }
        }

        .animate-blog-flow-right-1 {
          animation: blog-flow-right 16s linear infinite;
        }
        .animate-blog-flow-right-2 {
          animation: blog-flow-right 20s linear infinite 4s;
        }

        .animate-blog-flow-down-1 {
          animation: blog-flow-down 14s linear infinite;
        }
        .animate-blog-flow-down-2 {
          animation: blog-flow-down 18s linear infinite 3s;
        }

        .animate-blog-float-1 {
          animation: blog-float 12s ease-in-out infinite;
        }
        .animate-blog-float-2 {
          animation: blog-float-2 14s ease-in-out infinite 2s;
        }
        .animate-blog-float-3 {
          animation: blog-float-3 16s ease-in-out infinite 4s;
        }
        .animate-blog-float-4 {
          animation: blog-float 18s ease-in-out infinite 6s;
        }

        .animate-blog-orbit {
          animation: blog-orbit 35s linear infinite;
          transform-origin: 90% 60%;
        }
        .animate-blog-pulse {
          animation: blog-pulse 3s ease-in-out infinite;
        }

        .animate-blog-node-1 {
          animation: blog-pulse-node 5s ease-in-out infinite;
        }
        .animate-blog-node-2 {
          animation: blog-pulse-node 5s ease-in-out infinite 1.5s;
        }
        .animate-blog-node-3 {
          animation: blog-pulse-node 5s ease-in-out infinite 3s;
        }
      `}</style>
    </div>
  );
}
