import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { barter } from "@/lib/content";

const TERM_DOTS = ["#ff5f57", "#febc2e", "#28c840"];

function Terminal() {
  const { terminal } = barter;
  return (
    <div className="term">
      <div className="term__bar">
        {TERM_DOTS.map((c) => (
          <span className="term__dot" key={c} style={{ background: c }} aria-hidden="true" />
        ))}
        <span className="term__name">{terminal.title}</span>
      </div>
      <div className="term__body">
        {terminal.lines.map((l) => (
          <div key={l.cmd}>
            <span className="term__prompt">$</span> <span className="term__cmd">{l.cmd}</span>
            <span className={`term__arg--${l.tone}`}>{l.arg}</span>
          </div>
        ))}
        <div className="term__comment">{terminal.comment}</div>
      </div>
    </div>
  );
}

export function Barter() {
  return (
    <section
      className="section section--surface section--top-line section--clip"
      id="barter"
      aria-labelledby="barter-title"
    >
      <div
        className="glow"
        aria-hidden="true"
        style={{
          top: "-20%",
          right: "-5%",
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="shell">
        <Reveal>
          <SectionLabel text="Бартерын тухай" />
        </Reveal>

        <div className="split">
          <Reveal delay={60}>
            <h2 className="h2 barter__title" id="barter-title">
              {barter.headline[0]}
              <br />
              <span className="accent">{barter.headline[1]}</span>
              <br />
              {barter.headline[2]}
            </h2>

            {barter.body.map((p) => (
              <p className="barter__body" key={p.slice(0, 24)}>
                {p}
              </p>
            ))}

            <Terminal />
          </Reveal>

          <div className="steps">
            {barter.steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <div className="step">
                  <span className="step__n">{s.n}</span>
                  <div>
                    <h3 className="step__title">{s.title}</h3>
                    <p className="step__body">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
