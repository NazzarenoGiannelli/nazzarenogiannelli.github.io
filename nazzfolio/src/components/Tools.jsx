import { ArrowUpRight } from "@phosphor-icons/react";
import stats from "../data/stats.json";
import { tools } from "../content";

const Tools = () => (
  <section id="tools" className="px-6 md:px-12 pb-28 md:pb-36">
    <div className="grid md:grid-cols-12 gap-8 mb-12 md:mb-16">
      <p data-reveal className="section-label md:col-span-4">
        <span className="text-[var(--accent-bright)]">//</span> small tools
      </p>
      <p
        data-reveal
        className="md:col-span-8 text-sm md:text-base text-[var(--ink-soft)] max-w-prose"
      >
        Things I built because I needed them in production, then shared. Some
        are free, some are a few dollars on Gumroad.
      </p>
    </div>

    <ul className="border-t border-white/10">
      {tools.map((t) => {
        const proof = t.proof(stats);
        return (
          <li key={t.name}>
            <a
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="tool-row group grid grid-cols-[1fr_auto] md:grid-cols-12 items-baseline gap-x-6 gap-y-2 border-b border-white/10 py-6 md:py-7"
            >
              <span className="row-title display text-xl md:text-2xl md:col-span-4">
                {t.name}
              </span>
              <ArrowUpRight
                size={22}
                className="row-arrow text-[var(--muted)] self-center md:order-last md:col-span-1 md:justify-self-end"
              />
              <span className="col-span-2 md:col-span-4 text-sm text-[var(--ink-soft)]">
                {t.what}
              </span>
              <span className="col-span-2 md:col-span-3 text-xs text-[var(--muted)] flex gap-4">
                <span className="text-[var(--accent-bright)]">{t.where}</span>
                {proof && <span>{proof}</span>}
              </span>
            </a>
          </li>
        );
      })}
    </ul>

    <p data-reveal className="mt-8 text-xs text-[var(--muted)]">
      Everything else, including a few Notion templates, is on{" "}
      <a
        href="https://nazzareno.gumroad.com/"
        target="_blank"
        rel="noopener noreferrer"
        data-hover
        className="link-underline text-[var(--ink-soft)]"
      >
        Gumroad
      </a>
      .
    </p>
  </section>
);

export default Tools;
