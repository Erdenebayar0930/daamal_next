import { LogoMark } from "./Logo";
import { hero, site } from "@/lib/content";

function ArrowRight() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top">
      {/* --- decoration --- */}
      <div className="grid-overlay" aria-hidden="true" />
      <div
        className="glow"
        aria-hidden="true"
        style={{
          top: "-15%",
          right: "-8%",
          width: 800,
          height: 800,
          background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 60%)",
        }}
      />
      <div
        className="glow"
        aria-hidden="true"
        style={{
          bottom: 0,
          left: "-10%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 65%)",
        }}
      />
      <div
        className="glow"
        aria-hidden="true"
        style={{
          top: "40%",
          left: "30%",
          width: 300,
          height: 300,
          background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 65%)",
        }}
      />

      {/* --- content --- */}
      <div className="hero__inner">
        <div className="hero__rule" aria-hidden="true" />

        <div className="hero__copy">
          <p className="eyebrow">
            <span className="eyebrow__dot" aria-hidden="true" />
            <span className="eyebrow__text">{site.tagline}</span>
          </p>

          <h1 className="hero__title">
            {hero.lines.map((line, i) => (
              <span key={line} className={i === hero.accentLine ? "accent" : undefined}>
                {line}
              </span>
            ))}
          </h1>

          <p className="hero__lead">{hero.lead}</p>

          <div className="stats">
            {hero.stats.map((s) => (
              <div className="stats__item" key={s.label}>
                <span className="stats__value">{s.value}</span>
                <span className="stats__label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="hero__actions">
            <a className="btn btn--primary" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
              <ArrowRight />
            </a>
            <a className="btn btn--ghost" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>

        <div className="hero__mark" aria-hidden="true">
          <LogoMark size={260} />
        </div>
      </div>
    </section>
  );
}
