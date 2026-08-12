"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** ms — grid дотор дараалуулж гарахад */
  delay?: number;
  className?: string;
  /** Эцэг элемент нь <ul> байвал "li" */
  as?: "div" | "li";
};

/**
 * Scroll-руу орж ирэхэд нэг удаа fade+rise хийнэ.
 * Харагдсаны дараа observer салгагдана — дахин ажиллахгүй.
 */
export function Reveal({ children, delay = 0, className, as: Tag = "div" }: Props) {
  const node = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  // "div" | "li" хоёуланд тохирох callback ref
  const setNode = useCallback((el: HTMLElement | null) => {
    node.current = el;
  }, []);

  useEffect(() => {
    const el = node.current;
    if (!el) return;

    // IntersectionObserver дэмждэггүй хөтөч дээр агуулгыг нуухгүй.
    if (typeof IntersectionObserver === "undefined") {
      const t = setTimeout(() => setShown(true), 0);
      return () => clearTimeout(t);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={setNode}
      className={className ? `reveal ${className}` : "reveal"}
      data-shown={shown}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
