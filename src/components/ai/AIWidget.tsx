"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Message = {
  role: "assistant" | "user";
  text: string;
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

export function AIWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi, I can help with clinic timings, treatments, appointment planning, and what symptoms to mention to the dentist.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<InstanceType<SpeechRecognitionConstructor> | null>(null);

  const speechSupported = useMemo(
    () => typeof window !== "undefined" && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition),
    [],
  );

  useEffect(() => {
    return () => recognitionRef.current?.stop();
  }, []);

  async function askAi(question: string) {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || loading) return;

    setMessages((current) => [...current, { role: "user", text: cleanQuestion }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: cleanQuestion }),
      });
      const data = (await response.json()) as { answer?: string; error?: string };
      const answer = data.answer || data.error || "I could not answer that right now.";
      setMessages((current) => [...current, { role: "assistant", text: answer }]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "assistant", text: "The assistant is temporarily unavailable. Please call or WhatsApp the clinic." },
      ]);
    } finally {
      setLoading(false);
    }
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
      setInput(transcript);
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
      {!open ? (
        <button className="ai-left-launcher" type="button" onClick={() => setOpen(true)}>
          Chat with AI
        </button>
      ) : null}
      <div className={`ai-widget ${open ? "is-open" : ""}`}>
        {open ? (
          <section className="ai-panel" aria-label="Healthy Grins AI assistant">
          <div className="ai-panel-header">
            <div>
              <strong>Smile AI</strong>
              <span>Clinic guide</span>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close AI assistant">
              x
            </button>
          </div>

          <div className="ai-messages">
            {messages.map((message, index) => (
              <article className={`ai-message ${message.role}`} key={`${message.role}-${index}`}>
                <p>{message.text}</p>
                {message.role === "assistant" ? (
                  <button type="button" onClick={() => speak(message.text)}>
                    Listen
                  </button>
                ) : null}
              </article>
            ))}
            {loading ? <article className="ai-message assistant">Thinking...</article> : null}
          </div>

          <form
            className="ai-input-row"
            onSubmit={(event) => {
              event.preventDefault();
              void askAi(input);
            }}
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about pain, timing, treatment, fees..."
              aria-label="Ask the clinic assistant"
            />
            <button className={listening ? "is-active" : ""} type="button" onClick={toggleListening} disabled={!speechSupported}>
              Voice
            </button>
            <button type="submit" disabled={loading}>
              Send
            </button>
          </form>
          </section>
        ) : null}
        {!open ? (
          <button className="ai-launcher" type="button" onClick={() => setOpen(true)} aria-label="Open AI chat">
            AI
          </button>
        ) : null}
      </div>
    </>
  );
}
