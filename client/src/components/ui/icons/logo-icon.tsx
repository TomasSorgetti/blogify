export default function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* Document outline */}
      <rect
        x="50"
        y="30"
        width="100"
        height="140"
        rx="8"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.85"
      />

      {/* Content lines */}
      <line
        x1="65"
        y1="55"
        x2="135"
        y2="55"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.6"
      />
      <line
        x1="65"
        y1="75"
        x2="135"
        y2="75"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.5"
      />
      <line
        x1="65"
        y1="95"
        x2="115"
        y2="95"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.5"
      />

      {/* Accent beam */}
      <path
        d="M 65 120 Q 90 130 110 120 T 135 120"
        stroke="url(#logoGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Accent corner */}
      <circle cx="148" cy="32" r="5" fill="currentColor" opacity="0.8" />
      <path
        d="M 148 32 Q 142 38 138 44"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
