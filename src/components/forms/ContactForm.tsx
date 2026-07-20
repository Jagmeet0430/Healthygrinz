"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState("");

  async function submit(formData: FormData) {
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    setStatus("Sending message...");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setStatus(response.ok ? "Message sent. The clinic will respond soon." : "Please check your details and try again.");
  }

  return (
    <form className="contact-form" action={submit}>
      <h3>Send a message</h3>
      <label>
        Name
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" />
      </label>
      <label>
        Phone
        <input name="phone" type="tel" autoComplete="tel" />
      </label>
      <label>
        Message
        <textarea name="message" rows={5} placeholder="How can we help?" required />
      </label>
      <button className="button primary form-button" type="submit">
        Send message
      </button>
      <p className="form-note" aria-live="polite">
        {status || "We only use these details to respond to your enquiry."}
      </p>
    </form>
  );
}
