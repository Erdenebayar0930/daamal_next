import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { ServiceIcon } from "./ServiceIcon";
import { services, servicesIntro } from "@/lib/content";

export function Services() {
  const t = servicesIntro.title;
  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="shell">
        <Reveal>
          <SectionLabel text={servicesIntro.label} />
        </Reveal>

        <Reveal delay={80}>
          <h2 className="h2 services__title" id="services-title">
            {`${t.before} `}
            <span className="accent">{t.accent}</span>
            {` ${t.after}`}
            <br />
            <span className="accent-muted">{t.muted}</span>
          </h2>
        </Reveal>

        <div className="cards">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <article className="card">
                <span className="card__icon">
                  <ServiceIcon name={s.key} />
                </span>
                <span className="card__n">{s.n}</span>
                <h3 className="card__title">{s.title}</h3>
                <p className="card__desc">{s.desc}</p>
                <span className="card__rail" aria-hidden="true" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
