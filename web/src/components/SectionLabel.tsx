export function SectionLabel({ text }: { text: string }) {
  return (
    <div className="label">
      <span className="label__dot" aria-hidden="true" />
      <span className="label__text">{text}</span>
      <span className="label__rule" aria-hidden="true" />
    </div>
  );
}
