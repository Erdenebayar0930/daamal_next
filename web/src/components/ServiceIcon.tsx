import type { ServiceKey } from "@/lib/content";

const icons: Record<ServiceKey, React.ReactNode> = {
  // Санхүү — карт / гүйлгээний хүснэгт
  finance: (
    <>
      <rect x="3" y="7" width="26" height="18" rx="2" stroke="#3b82f6" strokeWidth="1.4" />
      <path d="M3 12h26" stroke="#3b82f6" strokeWidth="1.4" />
      <path d="M9 18h6M9 22h4M19 18h4" stroke="#22d3ee" strokeWidth="1.3" strokeLinecap="round" />
    </>
  ),
  // Бүртгэл — модулиуд
  registry: (
    <>
      <rect x="3" y="3" width="12" height="12" rx="1.5" stroke="#3b82f6" strokeWidth="1.4" />
      <rect x="17" y="3" width="12" height="12" rx="1.5" stroke="#3b82f6" strokeWidth="1.4" />
      <rect x="3" y="17" width="12" height="12" rx="1.5" stroke="#3b82f6" strokeWidth="1.4" />
      <rect x="17" y="17" width="12" height="12" rx="1.5" stroke="#22d3ee" strokeWidth="1.4" />
      <circle cx="23" cy="23" r="3" fill="rgba(34,211,238,0.15)" />
    </>
  ),
  // Аналитик — өсөлтийн график
  analytics: (
    <>
      <polyline
        points="4,26 10,16 15,21 20,11 26,7"
        stroke="#3b82f6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="26" cy="7" r="2.5" fill="#22d3ee" />
      <path d="M4 26h24" stroke="rgba(59,130,246,0.3)" strokeWidth="1" />
    </>
  ),
  // Интеграц — холболтын зангилаа
  integration: (
    <>
      <circle cx="6" cy="16" r="3.5" stroke="#3b82f6" strokeWidth="1.4" />
      <circle cx="26" cy="6" r="3.5" stroke="#22d3ee" strokeWidth="1.4" />
      <circle cx="26" cy="26" r="3.5" stroke="#22d3ee" strokeWidth="1.4" />
      <path
        d="M9.5 16h6M18 8.5l-5 6M18 23.5l-5-6"
        stroke="#3b82f6"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </>
  ),
};

export function ServiceIcon({ name }: { name: ServiceKey }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {icons[name]}
    </svg>
  );
}
