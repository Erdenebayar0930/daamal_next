import { site } from "@/lib/content";

/** Даамалын лого — гурвалжин ромб + голд нь солилцооны тэмдэг. */
export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M20 2L38 20L20 38L2 20Z"
        stroke="#3b82f6"
        strokeWidth="1.2"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M20 8L32 20L20 32L8 20Z"
        stroke="#3b82f6"
        strokeWidth="1.4"
        fill="rgba(59,130,246,0.05)"
      />
      <circle cx="20" cy="8" r="2" fill="#22d3ee" />
      <circle cx="32" cy="20" r="2" fill="#3b82f6" />
      <circle cx="20" cy="32" r="2" fill="#22d3ee" />
      <circle cx="8" cy="20" r="2" fill="#3b82f6" />
      <path
        d="M20 14v12M14 20h12"
        stroke="#e8eef8"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M14 14l4 4M22 22l4 4"
        stroke="#22d3ee"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M26 14l-4 4M18 22l-4 4"
        stroke="#22d3ee"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export function Logo() {
  return (
    <a className="logo" href="#top" aria-label={`${site.name} — эхлэл`}>
      <LogoMark size={32} />
      <span className="logo__word">{site.latinName}</span>
    </a>
  );
}
