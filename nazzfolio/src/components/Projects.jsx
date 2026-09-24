import { ArrowUpRight } from "@phosphor-icons/react";
import stats from "../data/stats.json";
import { projects } from "../content";
import TiltMedia from "./TiltMedia";

const resolve = (value) => (typeof value === "function" ? value(stats) : value);

const Projects = () => (
  <section id="projects" className="px-6 md:px-12 py-28 md:py-36">
    <p data-reveal className="section-label mb-14 md:mb-20">
      <span className="text-[var(--accent-bright)]">//</span> selected work
    </p>

    <div className="flex flex-col gap-24 md:gap-36">
      {projects.map((p, i) => {
        const facts = p.facts.map(resolve).filter(Boolean);
        const flip = i % 2 === 1;
        return (
          <article
            key={p.id}
            className="project grid md:grid-cols-12 gap-10 md:gap-14 items-center"
          >
            <div
              className={`project-media md:col-span-7 ${flip ? "md:order-2" : ""}`}
            >
              <TiltMedia media={p.media} />
            </div>

            <div className={`project-copy md:col-span-5 ${flip ? "md:order-1" : ""}`}>
              <p className="text-xs text-[var(--accent-bright)] mb-4">{p.role}</p>
              <h3 className="display text-5xl md:text-7xl mb-6 break-words">
                {p.title}
              </h3>
              <p className="text-sm md:text-base text-[var(--ink-soft)] leading-relaxed mb-8 max-w-prose">
                {p.body}
              </p>
              <ul className="flex flex-col gap-2 text-xs md:text-sm text-[var(--muted)] mb-8">
                {facts.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className="text-[var(--accent-bright)]">+</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
                {p.links.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-hover
                    className="link-underline inline-flex items-center gap-1.5"
                  >
                    {label} <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  </section>
);

export default Projects;
