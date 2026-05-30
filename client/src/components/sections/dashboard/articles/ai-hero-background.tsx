export default function AiHeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="ai-flow-h" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="40%" stopColor="var(--accent)" stopOpacity="0.45" />
            <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="ai-flow-v" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="40%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="ai-center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.07" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>

          <filter id="ai-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <pattern
            id="ai-dot-grid"
            x="0"
            y="0"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="14"
              cy="14"
              r="0.7"
              fill="var(--foreground)"
              fillOpacity="0.07"
            />
          </pattern>
        </defs>

        {/* Dot grid */}
        <rect width="100%" height="100%" fill="url(#ai-dot-grid)" />
        {/* Center ambient glow */}
        <rect width="100%" height="100%" fill="url(#ai-center-glow)" />

        {/* Horizontal scan lines */}
        <rect
          x="-160"
          y="22%"
          width="160"
          height="1"
          fill="url(#ai-flow-h)"
          className="animate-ai-scan-1"
        />
        <rect
          x="-120"
          y="68%"
          width="120"
          height="1"
          fill="url(#ai-flow-h)"
          className="animate-ai-scan-2"
        />

        {/* Vertical scan lines */}
        <rect
          x="18%"
          y="-100"
          width="1"
          height="100"
          fill="url(#ai-flow-v)"
          className="animate-ai-vscan-1"
        />
        <rect
          x="82%"
          y="-80"
          width="1"
          height="80"
          fill="url(#ai-flow-v)"
          className="animate-ai-vscan-2"
        />

        {/* Decorative: sparkle cluster top-left */}
        <g filter="url(#ai-glow)" className="animate-ai-float-1">
          <circle
            cx="7%"
            cy="18%"
            r="1.2"
            fill="var(--accent)"
            fillOpacity="0.55"
          />
          <circle
            cx="calc(7% + 8px)"
            cy="calc(18% - 6px)"
            r="0.7"
            fill="var(--accent)"
            fillOpacity="0.35"
          />
          <circle
            cx="calc(7% - 5px)"
            cy="calc(18% + 9px)"
            r="0.6"
            fill="var(--accent)"
            fillOpacity="0.3"
          />
          <line
            x1="7%"
            y1="18%"
            x2="calc(7% + 8px)"
            y2="calc(18% - 6px)"
            stroke="var(--accent)"
            strokeWidth="0.4"
            strokeOpacity="0.25"
          />
          <line
            x1="7%"
            y1="18%"
            x2="calc(7% - 5px)"
            y2="calc(18% + 9px)"
            stroke="var(--accent)"
            strokeWidth="0.4"
            strokeOpacity="0.2"
          />
        </g>

        {/* Decorative: writing/pen icon top-right */}
        <g filter="url(#ai-glow)" className="animate-ai-float-2">
          <rect
            x="calc(90% - 12px)"
            y="12%"
            width="18"
            height="22"
            rx="2"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.6"
            strokeOpacity="0.3"
          />
          <line
            x1="calc(90% - 8px)"
            y1="calc(12% + 8px)"
            x2="calc(90% + 2px)"
            y2="calc(12% + 8px)"
            stroke="var(--accent)"
            strokeWidth="0.5"
            strokeOpacity="0.22"
          />
          <line
            x1="calc(90% - 8px)"
            y1="calc(12% + 13px)"
            x2="calc(90% + 2px)"
            y2="calc(12% + 13px)"
            stroke="var(--accent)"
            strokeWidth="0.5"
            strokeOpacity="0.22"
          />
          <line
            x1="calc(90% - 8px)"
            y1="calc(12% + 18px)"
            x2="calc(90% - 2px)"
            y2="calc(12% + 18px)"
            stroke="var(--accent)"
            strokeWidth="0.5"
            strokeOpacity="0.18"
          />
        </g>

        {/* Decorative: orbit ring bottom-right */}
        <g className="animate-ai-orbit">
          <circle
            cx="91%"
            cy="74%"
            r="22"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.5"
            strokeOpacity="0.18"
            strokeDasharray="4 8"
          />
          <circle
            cx="91%"
            cy="74%"
            r="2"
            fill="var(--accent)"
            fillOpacity="0.4"
            className="animate-ai-pulse"
          />
        </g>

        {/* Decorative: bracket/code icon bottom-left */}
        <g filter="url(#ai-glow)" className="animate-ai-float-3">
          <path
            d="M calc(6% + 8px) 76% l -8 8 l 8 8"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.7"
            strokeOpacity="0.28"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M calc(6% + 16px) 76% l 8 8 l -8 8"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.7"
            strokeOpacity="0.28"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Floating nodes */}
        <circle
          cx="22%"
          cy="35%"
          r="1.4"
          fill="var(--accent)"
          fillOpacity="0.38"
          className="animate-ai-node-1"
        />
        <circle
          cx="78%"
          cy="55%"
          r="1.4"
          fill="var(--accent)"
          fillOpacity="0.32"
          className="animate-ai-node-2"
        />
        <circle
          cx="45%"
          cy="82%"
          r="1.2"
          fill="var(--accent)"
          fillOpacity="0.35"
          className="animate-ai-node-3"
        />
        <circle
          cx="62%"
          cy="20%"
          r="1"
          fill="var(--accent)"
          fillOpacity="0.28"
          className="animate-ai-node-1"
        />

        {/* Subtle connector lines */}
        <line
          x1="22%"
          y1="35%"
          x2="45%"
          y2="50%"
          stroke="var(--accent)"
          strokeWidth="0.4"
          strokeOpacity="0.07"
        />
        <line
          x1="78%"
          y1="55%"
          x2="62%"
          y2="20%"
          stroke="var(--accent)"
          strokeWidth="0.4"
          strokeOpacity="0.07"
        />
      </svg>

      {/* Layered ambient glow blobs */}
      <div className="absolute left-1/2 top-1/2 h-64 w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/4 blur-[70px]" />
      <div className="absolute -left-16 -top-8 h-48 w-48 rounded-full bg-accent/3 blur-[50px]" />
      <div className="absolute -right-16 -bottom-8 h-48 w-48 rounded-full bg-accent/3 blur-[50px]" />

      <style>{`
        @keyframes ai-scan {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(100vw + 320px));
          }
        }
        @keyframes ai-vscan {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(calc(100% + 200px));
          }
        }
        @keyframes ai-float-a {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(5px, -7px);
          }
        }
        @keyframes ai-float-b {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-4px, -5px);
          }
        }
        @keyframes ai-float-c {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(3px, -6px);
          }
        }
        @keyframes ai-orbit-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes ai-pulse {
          0%,
          100% {
            opacity: 0.25;
            transform: scale(1);
          }
          50% {
            opacity: 0.55;
            transform: scale(1.25);
          }
        }
        @keyframes ai-node {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.55;
            transform: scale(1.3);
          }
        }

        .animate-ai-scan-1 {
          animation: ai-scan 15s linear infinite;
        }
        .animate-ai-scan-2 {
          animation: ai-scan 19s linear infinite 5s;
        }
        .animate-ai-vscan-1 {
          animation: ai-vscan 13s linear infinite;
        }
        .animate-ai-vscan-2 {
          animation: ai-vscan 17s linear infinite 3s;
        }

        .animate-ai-float-1 {
          animation: ai-float-a 11s ease-in-out infinite;
        }
        .animate-ai-float-2 {
          animation: ai-float-b 13s ease-in-out infinite 2s;
        }
        .animate-ai-float-3 {
          animation: ai-float-c 15s ease-in-out infinite 4s;
        }

        .animate-ai-orbit {
          animation: ai-orbit-spin 30s linear infinite;
          transform-origin: 91% 74%;
        }
        .animate-ai-pulse {
          animation: ai-pulse 3s ease-in-out infinite;
        }

        .animate-ai-node-1 {
          animation: ai-node 5s ease-in-out infinite;
        }
        .animate-ai-node-2 {
          animation: ai-node 5s ease-in-out infinite 1.6s;
        }
        .animate-ai-node-3 {
          animation: ai-node 5s ease-in-out infinite 3.2s;
        }
      `}</style>
    </div>
  );
}
