"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type SplashPhase = "white" | "covering" | "logo" | "dim" | "exit";

const preloadAssets = [
  "/assets/reference/logo-splash-white.png",
  "/assets/reference/logo-primary-453657.png",
  "/images/healthy-grins-hero-hd.png",
];

export function SplashScreen() {
  const [active, setActive] = useState(true);
  const [phase, setPhase] = useState<SplashPhase>("white");

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    preloadAssets.forEach((src) => {
      const image = new window.Image();
      image.src = src;
    });

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];

    if (reducedMotion) {
      timers.push(window.setTimeout(() => setPhase("logo"), 80));
      timers.push(window.setTimeout(() => setPhase("exit"), 720));
      timers.push(window.setTimeout(() => setActive(false), 980));
    } else {
      timers.push(window.setTimeout(() => setPhase("covering"), 250));
      timers.push(window.setTimeout(() => setPhase("logo"), 900));
      timers.push(window.setTimeout(() => setPhase("dim"), 2600));
      timers.push(window.setTimeout(() => setPhase("exit"), 3000));
      timers.push(window.setTimeout(() => setActive(false), 4100));
    }

    timers.push(window.setTimeout(() => setActive(false), 5000));

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);

  useEffect(() => {
    if (active) return;
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }, [active]);

  if (!active) return null;

  return (
    <div className={`splash-screen is-${phase}`} aria-label="Healthy Grins loading screen" aria-live="polite">
      <div className="splash-loading" aria-hidden="true" />
      <div className="splash-panel">
        <Image src="/assets/reference/logo-splash-white.png" alt="Healthy Grins Dental Clinic" width={330} height={230} priority className="splash-logo" />
      </div>
    </div>
  );
}
