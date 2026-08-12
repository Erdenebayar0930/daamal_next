"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { nav } from "@/lib/content";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll(); // сэргээгдсэн scroll байрлалыг мөн барина
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Drawer нээлттэй байхад Esc-ээр хаах + өргөн дэлгэц болбол автоматаар хаах
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 901px)");
    const onChange = () => mq.matches && setOpen(false);

    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  return (
    <nav className="nav" data-scrolled={scrolled}>
      <div className="nav__bar">
        <Logo />

        <div className="nav__links">
          {nav.map((item) => (
            <a key={item.href} className="nav__link" href={item.href}>
              {item.label}
            </a>
          ))}
          <a className="btn btn--nav" href="#contact">
            Холбогдох
          </a>
        </div>

        <button
          type="button"
          className="nav__burger"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Меню хаах" : "Меню нээх"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className="nav__drawer" id="mobile-nav">
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}>
            Холбогдох
          </a>
        </div>
      )}
    </nav>
  );
}
