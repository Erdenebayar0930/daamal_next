import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { ContactForm } from "./ContactForm";
import { contact } from "@/lib/content";

export function Contact() {
  return (
    <section
      className="section section--surface section--top-line section--clip"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div
        className="glow"
        aria-hidden="true"
        style={{
          bottom: "-20%",
          left: "-5%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 65%)",
        }}
      />

      <div className="shell">
        <Reveal>
          <SectionLabel text="Холбоо барих" />
        </Reveal>

        <div className="split">
          <Reveal delay={60}>
            <h2 className="h2 contact__title" id="contact-title">
              {contact.headline[0]}
              <br />
              <span className="accent">{contact.headline[1]}</span>
              <br />
              {contact.headline[2]}
            </h2>

            {contact.details.map((d) => (
              <div className="detail" key={d.k}>
                <span className="detail__k">{d.k}</span>
                {d.href ? (
                  <a
                    className="detail__v"
                    href={d.href}
                    {...(d.href.startsWith("http")
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                  >
                    {d.v}
                  </a>
                ) : (
                  <span className="detail__v">{d.v}</span>
                )}
              </div>
            ))}
          </Reveal>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
