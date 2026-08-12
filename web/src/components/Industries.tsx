import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { industries } from "@/lib/content";

export function Industries() {
  return (
    <section
      className="section section--top-line"
      id="industries"
      aria-labelledby="industries-title"
    >
      <div className="shell">
        <Reveal>
          <SectionLabel text="Хамрах хүрээ" />
        </Reveal>

        <Reveal delay={60}>
          <h2 className="h2 industries__title" id="industries-title">
            Бүх салбарт, <span className="accent">хүссэн хэлбэрээр</span>
          </h2>
        </Reveal>

        <ul className="chips">
          {industries.map((name, i) => (
            <Reveal as="li" key={name} delay={i * 30}>
              <span className="chip">{name}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
