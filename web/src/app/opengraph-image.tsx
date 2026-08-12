import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "daamal — barter developer";

/**
 * OG зураг. Кирилл фонт нэмэлт татахгүйн тулд зөвхөн латин текст хэрэглэсэн
 * (ImageResponse-ийн үндсэн фонт Кириллийг бүрэн зурдаггүй).
 */
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#04080f",
        padding: 72,
        position: "relative",
      }}
    >
      {/* grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.14) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      {/* glow */}
      <div
        style={{
          position: "absolute",
          top: -220,
          right: -140,
          width: 760,
          height: 760,
          borderRadius: 9999,
          background: "radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(4,8,15,0) 62%)",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <svg width="52" height="52" viewBox="0 0 40 40" fill="none">
          <path d="M20 2L38 20L20 38L2 20Z" stroke="#3b82f6" strokeWidth="1.2" opacity="0.4" />
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
          <path d="M20 14v12M14 20h12" stroke="#e8eef8" strokeWidth="1.2" opacity="0.5" />
        </svg>
        <div style={{ fontSize: 34, color: "#e8eef8", letterSpacing: -1 }}>daamal</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div
          style={{
            fontSize: 82,
            lineHeight: 1.02,
            color: "#e8eef8",
            letterSpacing: -3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Build your system.</span>
          <span style={{ color: "#3b82f6" }}>Pay in barter.</span>
        </div>
        <div style={{ fontSize: 26, color: "rgba(160,175,210,0.72)", maxWidth: 820 }}>
          Custom finance &amp; registry platforms for any industry — no cash required.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(59,130,246,0.2)",
          paddingTop: 22,
          fontSize: 20,
          color: "rgba(120,140,180,0.75)",
          letterSpacing: 2,
        }}
      >
        <span>DAAMAL.ORG</span>
        <span style={{ color: "#22d3ee" }}>BARTER DEVELOPER</span>
      </div>
    </div>,
    size,
  );
}
