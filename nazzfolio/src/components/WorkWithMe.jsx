import { useRef } from "react";
import { ArrowUpRight, Calendar, Envelope } from "@phosphor-icons/react";
import { CALL_URL, EMAIL, lanes } from "../content";

// Two lanes, each a panel with a wireframe grid that follows the cursor,
// like a viewport grid under an object.
const Lane = ({ lane }) => {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--gx", `${e.clientX - r.left}px`);
    el.style.setProperty("--gy", `${e.clientY - r.top}px`);
  };

  return (
    <article
      ref={ref}
      onPointerMove={onMove}
      className="lane relative border border-white/10 p-8 md:p-12 flex flex-col"
    >
      <span className="lane-grid" aria-hidden="true" />
      <div className="relative">
        <h3 className="display text-4xl md:text-6xl mb-3">{lane.title}</h3>
        <p className="text-sm text-[var(--accent-bright)] mb-8">
          {lane.audience}
        </p>
        <p className="text-sm md:text-base text-[var(--ink-soft)] leading-relaxed mb-8 max-w-prose">
          {lane.body}
        </p>
        <ul className="lane-items flex flex-col gap-3 text-sm mb-10">
          {lane.items.map((item) => (
            <li key={item} className="lane-item flex gap-3 items-baseline">
              <span className="text-[var(--accent-bright)]">&gt;</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <a
        href={lane.proof.href}
        target="_blank"
        rel="noopener noreferrer"
        data-hover
        className="relative mt-auto pt-6 border-t border-white/10 text-xs md:text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors flex items-start justify-between gap-4"
      >
        <span>
          <span className="text-[var(--ink-soft)]">Proof: </span>
          {lane.proof.text}
        </span>
        <ArrowUpRight size={16} className="shrink-0 mt-0.5" />
      </a>
    </article>
  );
};

const WorkWithMe = () => (
  <section id="work" className="px-6 md:px-12 py-28 md:py-36">
    <div className="grid md:grid-cols-12 gap-8 mb-12 md:mb-16">
      <p data-reveal className="section-label md:col-span-4">
        <span className="text-[var(--accent-bright)]">//</span> work with me
      </p>
      <p
        data-reveal
        className="md:col-span-8 text-base md:text-xl text-[var(--ink)] leading-relaxed max-w-3xl"
      >
        I take on a few projects at a time, in two areas where I've shipped
        real things. You'd be working with me directly, not with a team I
        hand you off to.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
      {lanes.map((lane) => (
        <Lane key={lane.id} lane={lane} />
      ))}
    </div>

    <div
      data-reveal
      className="mt-12 flex flex-col md:flex-row md:items-center gap-6 md:gap-10"
    >
      <p className="text-sm text-[var(--ink-soft)] max-w-md">
        Not sure which one fits? Book a call and tell me what you're trying to
        do. Thirty minutes is usually enough to know.
      </p>
      <div className="flex flex-wrap gap-4">
        <a
          href={CALL_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-hover
          className="btn-primary flex items-center gap-3 px-6 py-3.5 text-sm"
        >
          <Calendar size={18} /> Book a 30-min call
        </a>
        <a
          href={`mailto:${EMAIL}`}
          data-hover
          className="btn-ghost flex items-center gap-3 px-6 py-3.5 text-sm"
        >
          <Envelope size={18} /> Email me
        </a>
      </div>
    </div>
  </section>
);

export default WorkWithMe;
