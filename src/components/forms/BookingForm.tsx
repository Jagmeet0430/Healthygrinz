"use client";

import { useState } from "react";

const concerns = [
  "Tooth pain or sensitivity",
  "Cleaning and polishing",
  "Root canal consultation",
  "Filling, crown, or bridge",
  "Child dental visit",
  "Other dental concern",
];

type BookingFormProps = {
  phoneHref?: string;
};

export function BookingForm({ phoneHref = "+919821127942" }: BookingFormProps) {
  const [status, setStatus] = useState("");

  async function submit(formData: FormData) {
    const payload = {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      concern: String(formData.get("concern") || "").trim(),
      preferredTime: String(formData.get("preferredTime") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    setStatus("Sending request...");

    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setStatus("Please check the required fields and try again.");
      return;
    }

    const whatsappMessage = [
      "Hello Healthy Grins, I want to book a dental appointment.",
      `Name: ${payload.name}`,
      `Phone: ${payload.phone}`,
      `Concern: ${payload.concern}`,
      payload.preferredTime ? `Preferred time: ${payload.preferredTime}` : "",
      payload.message ? `Message: ${payload.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    setStatus("Request saved. Opening WhatsApp...");
    const phone = phoneHref.replace(/[^\d]/g, "");
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="contact-form" action={submit}>
      <h3>Send appointment request</h3>
      <label>
        Name
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label>
        Phone
        <input name="phone" type="tel" autoComplete="tel" required />
      </label>
      <label>
        Concern
        <select name="concern" required defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          {concerns.map((concern) => (
            <option key={concern}>{concern}</option>
          ))}
        </select>
      </label>
      <label>
        Preferred time
        <input name="preferredTime" type="text" placeholder="Example: Tuesday evening" />
      </label>
      <label>
        Message
        <textarea name="message" rows={4} placeholder="Symptoms or treatment questions" />
      </label>
      <button className="button primary form-button" type="submit">
        Send request
      </button>
      <p className="form-note" aria-live="polite">
        {status || "This can save your request and open WhatsApp with the message ready."}
      </p>
    </form>
  );
}
