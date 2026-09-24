import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import stats from "../data/stats.json";
import { howIWork, now, NOW_UPDATED, LINKEDIN_URL } from "../content";
import { prefersReducedMotion } from "../lib/motion";

const resolve = (v) => (typeof v === "function" ? v(stats) : v);

// Everything the terminal prints, line by line. `cmd` lines get typed out,
// the rest appear as output.
const SCRIPT = [
  { kind: "cmd", text: "cat how-i-work.md" },
  ...howIWork.map(([k, v]) => ({ kind: "row", k, v })),
  { kind: "gap" },
  { kind: "cmd", text: "cat now.md" },
  ...now.map(([k, v]) => ({ kind: "row", k, v: resolve(v) })),
  { kind: "note", text: `updated ${NOW_UPDATED}` },
];

const TYPE_SPEED = 38; // ms per character
const LINE_PAUSE = 90;

const Prompt = () => (
  <span className="text-[var(--accent-bright)] select-none">~/nazz $ </span>
);

const Line = ({ line, typed }) => {
  if (line.kind === "cmd")
    return (
      <div>
        <Prompt />
        <span className="text-[var(--ink)]">{typed ?? line.text}</span>
      </div>
    );
  if (line.kind === "row")
    return (
      <div className="grid grid-cols-[7.5rem_1fr] md:grid-cols-[9rem_1fr] gap-3">
        <span className="text-[var(--muted)]">{line.k}</span>
        <span className="text-[var(--ink-soft)]">{line.v}</span>
      </div>
    );
  if (line.kind === "note")
    return <div className="text-[var(--muted)] mt-1"># {line.text}</div>;
  return <div className="h-4" />;
};

const Terminal = () => {
  const ref = useRef(null);
  const [shown, setShown] = useState(0); // lines fully shown
  const [chars, setChars] = useState(0); // chars typed on the current cmd line
  const [started, setStarted] = useState(false);
  const done = shown >= SCRIPT.length;

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(SCRIPT.length);
      return;
    }
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 75%",
      once: true,
      onEnter: () => setStarted(true),
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    if (!started || done) return;
    const line = SCRIPT[shown];
    let t;
    if (line.kind === "cmd" && chars < line.text.length) {
      t = setTimeout(() => setChars((c) => c + 1), TYPE_SPEED);
    } else {
      t = setTimeout(
        () => {
          setShown((s) => s + 1);
          setChars(0);
        },
        line.kind === "cmd" ? 320 : LINE_PAUSE,
      );
    }
    return () => clearTimeout(t);
  }, [started, shown, chars, done]);

  const current = SCRIPT[shown];

  return (
    <div
      ref={ref}
      className="terminal border border-white/10 bg-[#0c0b14]/90 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="ml-3 text-[11px] text-[var(--muted)]">
          wezterm: nazz
        </span>
      </div>
      <div
        className="p-5 md:p-8 text-xs md:text-sm leading-7 min-h-[20rem] md:min-h-[20.5rem]"
        aria-label="How I work and what I'm doing now"
      >
        {SCRIPT.slice(0, shown).map((line, i) => (
          <Line key={i} line={line} />
        ))}
        {!done && started && current.kind === "cmd" && (
          <div>
            <Prompt />
            <span className="text-[var(--ink)]">
              {current.text.slice(0, chars)}
            </span>
            <span className="term-caret" />
          </div>
        )}
        {done && (
          <div>
            <Prompt />
            <span className="term-caret" />
          </div>
        )}
      </div>
      {/* Full text for screen readers and no-JS, independent of the typing */}
      <div className="sr-only">
        {howIWork.map(([k, v]) => `${k}: ${v}. `)}
        {now.map(([k, v]) => `${k}: ${resolve(v)}. `)}
      </div>
    </div>
  );
};

const HowIWork = () => (
  <section id="how" className="px-6 md:px-12 pb-28 md:pb-36">
    <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
      <div className="md:col-span-5">
        <p data-reveal className="section-label mb-10">
          <span className="text-[var(--accent-bright)]">//</span> how I work
        </p>
        <h2 data-reveal className="display text-5xl md:text-7xl mb-8">
          Low-level,
          <span className="block hollow">on purpose</span>
        </h2>
        <div
          data-reveal
          className="flex flex-col gap-5 text-sm md:text-base text-[var(--ink-soft)] leading-relaxed max-w-prose"
        >
          <p>
            At some point I realized the tools that last are the boring ones
            that have been around forever. So I work close to the metal: a
            terminal, a keyboard, my voice and a folder of text files.
          </p>
          <p>
            Claude Code sits on top of all of it and reads the same files I
            do, so it feels more like a pal than a tool. It's also why I'm
            useful beyond just coding: the same setup runs my notes, my
            planning and a good part of a company.
          </p>
          <p className="text-[var(--muted)] text-sm">
            I write about this setup on{" "}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="link-underline text-[var(--ink-soft)]"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      </div>

      <div className="md:col-span-7 md:sticky md:top-28">
        <Terminal />
      </div>
    </div>
  </section>
);

export default HowIWork;
