/** Sharingan-style swirl used as the Loma logo. */
export default function Sharingan({ size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="animate-spin-slow shrink-0"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="46" fill="#7f1d1d" stroke="#ffb347" strokeWidth="4" />
      <path
        d="M50 50 C50 22 78 22 78 50 C78 74 56 78 50 62"
        fill="none"
        stroke="#1a0505"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M50 50 C26 58 18 36 36 30 C56 24 66 42 54 52"
        fill="none"
        stroke="#1a0505"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle cx="50" cy="50" r="9" fill="#1a0505" />
    </svg>
  );
}
