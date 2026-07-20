"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blogs";
import type { Treatment } from "@/lib/content";

type BlogAiPanelProps = {
  post: BlogPost;
  treatments: Treatment[];
};

function makeSummary(content: string) {
  const sentences = content
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean);
  return sentences.slice(0, 3).join(" ");
}

function makeSimpleExplanation(content: string) {
  return content
    .replace(/periapical/gi, "around the root tip")
    .replace(/periodontal/gi, "gum and bone support")
    .replace(/caries/gi, "tooth decay")
    .replace(/restoration/gi, "dental filling or repair")
    .replace(/diagnosis/gi, "dentist's final check")
    .split("\n")
    .filter(Boolean)
    .slice(0, 2)
    .join(" ");
}

function getArticleAnswer(question: string, post: BlogPost) {
  const terms = question
    .toLowerCase()
    .split(/\W+/)
    .filter((term) => term.length > 3);
  const paragraphs = post.content.split("\n").filter(Boolean);
  const match = paragraphs.find((paragraph) => terms.some((term) => paragraph.toLowerCase().includes(term)));

  if (match) {
    return `${match} This is educational information from the article, not a confirmed diagnosis. Please book a dentist consultation for personal advice.`;
  }

  return "I can answer only from this article. I did not find that topic clearly in the post, so please ask the clinic or book a dental consultation for personal guidance.";
}

export function BlogAiPanel({ post, treatments }: BlogAiPanelProps) {
  const [summary, setSummary] = useState("");
  const [simple, setSimple] = useState("");
  const [faq, setFaq] = useState<string[]>([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [saved, setSaved] = useState(false);
  const [voiceState, setVoiceState] = useState<"idle" | "reading" | "paused">("idle");
  const [speed, setSpeed] = useState("1");

  const relatedTreatments = useMemo(
    () => treatments.filter((treatment) => post.content.toLowerCase().includes(treatment.title.split(" ")[0].toLowerCase())).slice(0, 3),
    [post.content, treatments],
  );

  function readArticle() {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${post.title}. ${post.excerpt}. ${post.content}`);
    utterance.rate = Number(speed);
    utterance.lang = "en-IN";
    utterance.onend = () => setVoiceState("idle");
    window.speechSynthesis.speak(utterance);
    setVoiceState("reading");
  }

  function pauseOrResume() {
    if (!("speechSynthesis" in window)) return;
    if (voiceState === "reading") {
      window.speechSynthesis.pause();
      setVoiceState("paused");
      return;
    }
    window.speechSynthesis.resume();
    setVoiceState("reading");
  }

  function stopVoice() {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setVoiceState("idle");
  }

  function saveArticle() {
    const key = "healthygrinz_reading_list";
    const current = JSON.parse(window.localStorage.getItem(key) || "[]") as string[];
    const next = Array.from(new Set([post.slug, ...current]));
    window.localStorage.setItem(key, JSON.stringify(next));
    setSaved(true);
  }

  function downloadGuide() {
    const guide = [
      post.title,
      "",
      post.excerpt,
      "",
      "AI Summary",
      summary || makeSummary(post.content),
      "",
      "Preventive Care Tips",
      "- Brush twice daily with a soft toothbrush.",
      "- Floss or use interdental cleaning once daily.",
      "- Book a dentist visit if pain, swelling, bleeding, or sensitivity continues.",
      "",
      "Disclaimer",
      "This guide is educational and does not replace a dentist consultation.",
    ].join("\n");
    const blob = new Blob([guide], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${post.slug}-patient-guide.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <aside className="blog-ai-panel" aria-label="DentMind AI article tools">
      <div className="blog-ai-hero">
        <span>DentMind AI</span>
        <h2>Patient education assistant</h2>
        <p>Use article-only AI tools for summaries, simple explanations, voice reading, and appointment next steps.</p>
      </div>

      <div className="blog-ai-actions">
        <button type="button" onClick={() => setSummary(makeSummary(post.content))}>AI Summary</button>
        <button type="button" onClick={() => setSimple(makeSimpleExplanation(post.content))}>Explain Simply</button>
        <button
          type="button"
          onClick={() =>
            setFaq([
              `What should I do first after reading "${post.title}"?`,
              "When should I book a dentist appointment?",
              "Which symptoms should I tell the dentist about?",
            ])
          }
        >
          Generate FAQ
        </button>
        <button type="button" onClick={saveArticle}>{saved ? "Saved" : "Save Article"}</button>
        <button type="button" onClick={downloadGuide}>Download Guide</button>
      </div>

      {summary ? <article><strong>AI Summary</strong><p>{summary}</p></article> : null}
      {simple ? <article><strong>Simple Language</strong><p>{simple}</p></article> : null}

      <article>
        <strong>Voice Assistant</strong>
        <div className="blog-voice-row">
          <select value={speed} onChange={(event) => setSpeed(event.target.value)} aria-label="Playback speed">
            <option value="0.8">0.8x</option>
            <option value="1">1x</option>
            <option value="1.2">1.2x</option>
          </select>
          <button type="button" onClick={readArticle}>Read</button>
          <button type="button" onClick={pauseOrResume} disabled={voiceState === "idle"}>{voiceState === "paused" ? "Resume" : "Pause"}</button>
          <button type="button" onClick={stopVoice}>Stop</button>
        </div>
      </article>

      <article>
        <strong>Ask This Article</strong>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setAnswer(getArticleAnswer(question, post));
          }}
        >
          <input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about this article..." />
          <button type="submit">Ask</button>
        </form>
        {answer ? <p>{answer}</p> : null}
      </article>

      {faq.length ? (
        <article>
          <strong>Generated Patient FAQ</strong>
          <ul>
            {faq.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>
      ) : null}

      <article>
        <strong>Treatment Overview</strong>
        <p>Common care may include examination, X-ray when needed, cleaning, fillings, root canal, crowns, or preventive follow-up depending on the dentist&apos;s findings.</p>
      </article>

      <article>
        <strong>Related Treatments</strong>
        <div className="blog-chip-row">
          {(relatedTreatments.length ? relatedTreatments : treatments.slice(0, 3)).map((treatment) => (
            <Link key={treatment.slug} href={`/treatments/${treatment.slug}`}>{treatment.title}</Link>
          ))}
        </div>
      </article>

      <article className="blog-cta-card">
        <strong>Need personal guidance?</strong>
        <p>Book a consultation with Healthy Grins Dental Clinic for a dentist-reviewed treatment plan.</p>
        <Link href="/booking">Book appointment</Link>
      </article>
    </aside>
  );
}
