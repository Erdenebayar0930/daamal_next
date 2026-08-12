"use client";

import { useState } from "react";
import { contact } from "@/lib/content";

type Status = "idle" | "sending" | "ok" | "bad";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [note, setNote] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setNote("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json: { ok?: boolean; error?: string } = await res.json().catch(() => ({}));

      if (!res.ok || !json.ok) {
        setStatus("bad");
        setNote(json.error ?? contact.error);
        return;
      }

      setStatus("ok");
      setNote(contact.success);
      form.reset();
    } catch {
      setStatus("bad");
      setNote(contact.error);
    }
  }

  const sending = status === "sending";

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      {contact.fields.map((f) => (
        <div className="field" key={f.id}>
          <label className="field__label" htmlFor={f.id}>
            {f.label}
            {f.required ? " *" : ""}
          </label>
          <input
            className="field__input"
            id={f.id}
            name={f.id}
            type={f.type}
            placeholder={f.ph}
            required={f.required}
            autoComplete={f.id === "name" ? "name" : f.id === "email" ? "email" : "organization"}
            maxLength={200}
            disabled={sending}
          />
        </div>
      ))}

      <div className="field">
        <label className="field__label" htmlFor={contact.messageField.id}>
          {contact.messageField.label} *
        </label>
        <textarea
          className="field__input"
          id={contact.messageField.id}
          name={contact.messageField.id}
          rows={4}
          placeholder={contact.messageField.ph}
          required
          maxLength={4000}
          disabled={sending}
        />
      </div>

      {/* Bot-уудыг шүүх honeypot — хүн харахгүй, бөглөгдвөл сервер тал үл ялиг татгалзана */}
      <input
        type="text"
        name="company_url"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      <button className="btn btn--primary form__submit" type="submit" disabled={sending}>
        {sending ? contact.submitting : contact.submit}
      </button>

      {note && (
        <p className="form__note" data-tone={status === "ok" ? "ok" : "bad"} role="status">
          {note}
        </p>
      )}
    </form>
  );
}
