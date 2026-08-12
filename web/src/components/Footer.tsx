import { Logo } from "./Logo";
import { footerCopy } from "@/lib/content";

export function Footer() {
  return (
    <footer className="footer">
      <Logo />
      <span className="footer__copy">{footerCopy()}</span>
    </footer>
  );
}
