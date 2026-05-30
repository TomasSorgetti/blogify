import "../../../styles/animated-rocket.css";

export function AnimatedRocket() {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{ filter: "drop-shadow(0 0 20px rgba(0, 212, 255, 0.3))" }}
      >
        <defs>
          <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8e8e8" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#a0a0a0" />
          </linearGradient>
          <linearGradient id="rocketNose" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff6b6b" />
            <stop offset="50%" stopColor="#ff8787" />
            <stop offset="100%" stopColor="#c92a2a" />
          </linearGradient>
          <linearGradient id="rocketFin" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="50%" stopColor="#00b8db" />
            <stop offset="100%" stopColor="#0099b8" />
          </linearGradient>
          <linearGradient id="rocketWindow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="50%" stopColor="#0099cc" />
            <stop offset="100%" stopColor="#006688" />
          </linearGradient>
          <linearGradient id="flame1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff6b35" />
            <stop offset="50%" stopColor="#f7931e" />
            <stop offset="100%" stopColor="#ffdd00" />
          </linearGradient>
          <linearGradient id="flame2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff4444" />
            <stop offset="50%" stopColor="#ff6b35" />
            <stop offset="100%" stopColor="#f7931e" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="rocket-float">
          <ellipse
            cx="100"
            cy="175"
            rx="20"
            ry="5"
            fill="rgba(0,0,0,0.2)"
            className="rocket-shadow"
          />

          <g className="flames" filter="url(#glow)">
            <path
              d="M92 145 L100 175 L108 145 Z"
              fill="url(#flame1)"
              className="flame-main"
            />
            <path
              d="M95 145 L100 165 L105 145 Z"
              fill="url(#flame2)"
              className="flame-inner"
            />
            <path
              d="M88 142 L93 160 L98 142 Z"
              fill="url(#flame1)"
              className="flame-left"
              opacity="0.8"
            />
            <path
              d="M102 142 L107 160 L112 142 Z"
              fill="url(#flame1)"
              className="flame-right"
              opacity="0.8"
            />
          </g>

          <path
            d="M75 130 L85 145 L85 115 Z"
            fill="url(#rocketFin)"
            stroke="#0088aa"
            strokeWidth="1"
          />
          <path d="M78 128 L83 138 L83 122 Z" fill="rgba(255,255,255,0.3)" />

          <path
            d="M125 130 L115 145 L115 115 Z"
            fill="url(#rocketFin)"
            stroke="#0088aa"
            strokeWidth="1"
          />
          <path d="M122 128 L117 138 L117 122 Z" fill="rgba(0,0,0,0.2)" />

          <path
            d="M85 145 L85 80 Q85 60 100 45 Q115 60 115 80 L115 145 Z"
            fill="url(#rocketBody)"
            stroke="#888"
            strokeWidth="1"
          />

          <path
            d="M87 140 L87 82 Q87 65 98 52 L92 58 Q88 70 88 82 L88 140 Z"
            fill="rgba(255,255,255,0.4)"
          />

          <path
            d="M113 140 L113 82 Q113 65 102 52 L108 58 Q112 70 112 82 L112 140 Z"
            fill="rgba(0,0,0,0.1)"
          />

          <path
            d="M85 80 Q85 60 100 45 Q115 60 115 80 Z"
            fill="url(#rocketNose)"
            stroke="#a02020"
            strokeWidth="1"
          />
          <path
            d="M90 75 Q92 62 100 50 L96 55 Q91 65 90 75 Z"
            fill="rgba(255,255,255,0.4)"
          />

          <circle
            cx="100"
            cy="100"
            r="14"
            fill="#444"
            stroke="#333"
            strokeWidth="2"
          />
          <circle cx="100" cy="100" r="11" fill="url(#rocketWindow)" />
          <ellipse cx="96" cy="96" rx="4" ry="3" fill="rgba(255,255,255,0.5)" />

          <rect x="85" y="120" width="30" height="4" fill="#ff6b6b" />
          <rect x="85" y="126" width="30" height="2" fill="#00d4ff" />

          <circle cx="88" cy="90" r="1.5" fill="#666" />
          <circle cx="112" cy="90" r="1.5" fill="#666" />
          <circle cx="88" cy="135" r="1.5" fill="#666" />
          <circle cx="112" cy="135" r="1.5" fill="#666" />
        </g>

        <g className="particles">
          <circle
            cx="85"
            cy="160"
            r="2"
            fill="#ffdd00"
            className="particle p1"
          />
          <circle
            cx="100"
            cy="170"
            r="1.5"
            fill="#ff6b35"
            className="particle p2"
          />
          <circle
            cx="115"
            cy="158"
            r="2"
            fill="#ffdd00"
            className="particle p3"
          />
          <circle
            cx="90"
            cy="165"
            r="1"
            fill="#f7931e"
            className="particle p4"
          />
          <circle
            cx="110"
            cy="168"
            r="1.5"
            fill="#ff6b35"
            className="particle p5"
          />
        </g>

        <g className="speed-lines" opacity="0.4">
          <line
            x1="70"
            y1="90"
            x2="70"
            y2="110"
            stroke="#00d4ff"
            strokeWidth="1"
            className="speed-line s1"
          />
          <line
            x1="60"
            y1="100"
            x2="60"
            y2="130"
            stroke="#00d4ff"
            strokeWidth="1"
            className="speed-line s2"
          />
          <line
            x1="130"
            y1="85"
            x2="130"
            y2="105"
            stroke="#00d4ff"
            strokeWidth="1"
            className="speed-line s3"
          />
          <line
            x1="140"
            y1="95"
            x2="140"
            y2="125"
            stroke="#00d4ff"
            strokeWidth="1"
            className="speed-line s4"
          />
        </g>
      </svg>
    </div>
  );
}
