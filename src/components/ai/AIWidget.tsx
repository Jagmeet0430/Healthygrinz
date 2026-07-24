"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Sparkles } from "lucide-react";

type ServiceMode = "ai" | null;

type Message = {
  id: string;
  role: "assistant" | "patient";
  text: string;
  time: string;
  status?: "sent" | "delivered" | "seen";
};

type SpeechRecognitionConstructor = new () => {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: { results: ArrayLike<{ 0: { transcript: string } }> }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

function createWidgetId(prefix: string) {
  const randomPart =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
  return `${prefix}-${randomPart}`;
}

export function AIWidget() {
  const [mode, setMode] = useState<ServiceMode>(null);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<InstanceType<SpeechRecognitionConstructor> | null>(null);

  const [aiMessages, setAiMessages] = useState<Message[]>([
    {
      id: createWidgetId("ai"),
      role: "assistant",
      text:
        "Hi, I am HealthyGrinz AI. I can explain symptoms, treatments, reports, X-rays, prescriptions, costs, clinic FAQs, and appointment planning. I do not replace a dentist.",
      time: "Now",
    },
  ]);

  const patientSummary = useMemo(
    () => ({
      name: "Guest Patient",
      age: "Not added",
      gender: "Not added",
      phone: "Add during booking",
      email: "Not added",
      history: "No medical history shared yet",
      previousVisits: "No previous visit selected",
      upcoming: "No confirmed appointment",
      payments: "No pending invoice",
      aiSummary: aiMessages.filter((message) => message.role === "patient").slice(-2).map((message) => message.text).join(" | ") || "No AI escalation yet.",
    }),
    [aiMessages],
  );

  useEffect(() => {
    setSpeechSupported(Boolean(window.SpeechRecognition || window.webkitSpeechRecognition));
    return () => recognitionRef.current?.stop();
  }, []);

  async function askAi(question: string) {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || aiLoading) return;

    const patientMessage: Message = {
      id: createWidgetId("ai"),
      role: "patient",
      text: cleanQuestion,
      time: "Now",
      status: "seen",
    };
    setAiMessages((current) => [...current, patientMessage]);
    setAiInput("");
    setAiLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: cleanQuestion }),
      });
      const data = (await response.json()) as { answer?: string; error?: string };
      const answer = data.answer || data.error || "I could not answer that right now.";
      setAiMessages((current) => [
        ...current,
        {
          id: createWidgetId("ai"),
          role: "assistant",
          text: `${answer}\n\nIf symptoms are severe, unclear, or worsening, please connect with a dentist for a clinical opinion.`,
          time: "Now",
        },
      ]);
    } catch {
      setAiMessages((current) => [
        ...current,
        {
          id: createWidgetId("ai"),
          role: "assistant",
          text: "HealthyGrinz AI is temporarily unavailable. I think you should connect with one of our dentists.",
          time: "Now",
        },
      ]);
    } finally {
      setAiLoading(false);
    }
  }

  function connectToDoctor() {
    const summary = patientSummary.aiSummary === "No AI escalation yet." ? "Patient requested doctor support from HealthyGrinz AI." : patientSummary.aiSummary;
    window.localStorage.setItem("healthygrinz_ai_escalation", summary);
    window.location.href = "/doctor-chat";
  }

  function toggleListening() {
    if (!speechSupported) return;

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) return;

    const recognition = new Recognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript || "";
      setAiInput(transcript);
      if (transcript) void askAi(transcript);
    };
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  }

  function speak(text: string) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  }

  return (
    <>
      {!mode ? (
        <div className="care-launcher-stack" aria-label="HealthyGrinz patient communication">
          <button className="care-launcher ai" type="button" onClick={() => setMode("ai")} aria-label="Open HealthyGrinz AI" title="HealthyGrinz AI">
            <Sparkles aria-hidden="true" />
            <span>Chat with AI</span>
          </button>
          <a className="care-launcher doctor" href="https://wa.me/919821127942" target="_blank" rel="noreferrer" aria-label="Open WhatsApp chat" title="Chat with us">
            <MessageCircle aria-hidden="true" />
          </a>
        </div>
      ) : null}

      <div className={`care-widget ${mode ? "is-open" : ""}`}>
        {mode === "ai" ? (
          <section className="care-panel ai-service" aria-label="HealthyGrinz AI assistant">
            <div className="care-panel-header">
              <div>
                <strong>HealthyGrinz AI</strong>
                <span>Symptoms, treatments, reports, costs, FAQs, voice support</span>
              </div>
              <button type="button" onClick={() => setMode(null)} aria-label="Close HealthyGrinz AI">
                x
              </button>
            </div>

            <div className="care-messages">
              {aiMessages.map((message) => (
                <article className={`care-message ${message.role}`} key={message.id}>
                  <p>{message.text}</p>
                  {message.role === "assistant" ? (
                    <div className="care-message-actions">
                      <button type="button" onClick={() => speak(message.text)}>Listen</button>
                      <button type="button" onClick={connectToDoctor}>Connect to Doctor</button>
                    </div>
                  ) : null}
                </article>
              ))}
              {aiLoading ? <article className="care-message assistant">HealthyGrinz AI is thinking...</article> : null}
            </div>

            <form
              className="care-input-row"
              onSubmit={(event) => {
                event.preventDefault();
                void askAi(aiInput);
              }}
            >
              <input value={aiInput} onChange={(event) => setAiInput(event.target.value)} placeholder="Ask HealthyGrinz AI..." aria-label="Ask HealthyGrinz AI" />
              <button className={listening ? "is-active" : ""} type="button" onClick={toggleListening} disabled={!speechSupported}>Voice</button>
              <button type="submit" disabled={aiLoading}>Send</button>
            </form>
          </section>
        ) : null}
      </div>
    </>
  );
}
