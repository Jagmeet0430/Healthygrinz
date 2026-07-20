"use client";

import { useState } from "react";

export function AdminAiLab() {
  const [note, setNote] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("Upload a report, X-ray image, or paste clinical notes.");
  const [result, setResult] = useState("");

  async function analyze() {
    if (!note.trim() && !file) {
      setStatus("Add notes or choose a file first.");
      return;
    }

    const formData = new FormData();
    formData.set("note", note);
    if (file) formData.set("file", file);

    setStatus("Reviewing with clinical guardrails...");
    setResult("");

    try {
      const response = await fetch("/api/ai/report", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as { result?: string; error?: string };
      if (!response.ok) throw new Error(data.error || "Unable to analyze report.");
      setResult(data.result || "");
      setStatus("AI review ready for dentist verification.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to analyze report.");
    }
  }

  return (
    <div className="ai-lab">
      <section className="ai-lab-console">
        <div>
          <p className="section-kicker">AI Lab</p>
          <h2>Report and X-ray assistant</h2>
          <p>
            Structured support for observations, follow-up questions, red flags, and next-step suggestions. Final
            interpretation stays with the dentist.
          </p>
        </div>
        <label>
          Doctor query or report notes
          <textarea
            rows={7}
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Example: Patient has lower molar pain. Review this X-ray for visible concerns and questions to verify clinically."
          />
        </label>
        <label>
          Upload image or report
          <input
            type="file"
            accept="image/*,.pdf,.txt,.md"
            onChange={(event) => setFile(event.target.files?.[0] || null)}
          />
        </label>
        {file ? <p className="form-note">Selected: {file.name}</p> : null}
        <button className="button primary" type="button" onClick={analyze}>
          Analyze securely
        </button>
        <p className="admin-status" aria-live="polite">
          {status}
        </p>
      </section>

      <section className="ai-lab-result">
        <h2>Clinical support output</h2>
        {result ? <pre>{result}</pre> : <p>No AI review yet.</p>}
      </section>
    </div>
  );
}

