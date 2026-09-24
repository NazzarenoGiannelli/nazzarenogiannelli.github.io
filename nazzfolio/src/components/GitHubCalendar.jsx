import data from "../data/github-contributions.json";

const ACCENT = "#5a51e8";
const LEVEL_COLORS = [
  "rgba(255, 255, 255, 0.05)",
  "rgba(90, 81, 232, 0.28)",
  "rgba(90, 81, 232, 0.52)",
  "rgba(90, 81, 232, 0.78)",
  "rgba(90, 81, 232, 1.00)",
];

const formatDate = (iso) => {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
};

// ~8 months of history
const VISIBLE_WEEKS = 35;

const GitHubCalendar = () => {
  if (!data || data.placeholder || !data.weeks?.length) return null;

  const visibleWeeks = data.weeks.slice(-VISIBLE_WEEKS);
  // Count only what the grid shows, so the number and the cells agree
  const visibleTotal = visibleWeeks.flat().reduce((sum, day) => sum + day.c, 0);
  const since = new Date(visibleWeeks[0][0].d + "T00:00:00Z").toLocaleDateString(
    "en-US",
    { month: "long", year: "numeric", timeZone: "UTC" },
  );

  return (
    <section className="px-6 md:px-12 pb-28 md:pb-36">
      <p data-reveal className="section-label mb-10">
        <span style={{ color: ACCENT }}>//</span> activity
      </p>

      <div
        data-reveal
        className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mb-10"
      >
        <span className="display text-6xl md:text-8xl hollow-accent">
          {visibleTotal.toLocaleString("en-US")}
        </span>
        <span className="text-xs md:text-sm text-[var(--muted)]">
          GitHub contributions since {since},{" "}
          <a
            href="https://github.com/NazzarenoGiannelli"
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="hover:text-[var(--accent-bright)] transition-colors"
          >
            @NazzarenoGiannelli
          </a>
        </span>
      </div>

      <div
        className="gh-grid grid gap-[3px] w-full"
        style={{
          gridTemplateColumns: `repeat(${visibleWeeks.length}, minmax(0, 1fr))`,
          gridTemplateRows: "repeat(7, minmax(0, 1fr))",
          gridAutoFlow: "column",
        }}
        role="img"
        aria-label={`${visibleTotal} GitHub contributions since ${since}`}
      >
        {visibleWeeks.flatMap((week, wi) => {
          const cells = [];
          for (let di = 0; di < 7; di += 1) {
            const day = week[di];
            if (!day) {
              cells.push(
                <div key={`${wi}-${di}-empty`} className="aspect-square" />
              );
              continue;
            }
            cells.push(
              <div
                key={day.d}
                title={`${day.c} contribution${day.c === 1 ? "" : "s"} on ${formatDate(day.d)}`}
                className="gh-cell aspect-square"
                style={{
                  backgroundColor: LEVEL_COLORS[day.l] ?? LEVEL_COLORS[0],
                }}
              />
            );
          }
          return cells;
        })}
      </div>

      <div className="flex items-center justify-end gap-1.5 mt-4 text-[10px] text-[var(--muted)]">
        <span>less</span>
        {LEVEL_COLORS.map((c, i) => (
          <span
            key={i}
            style={{
              width: 10,
              height: 10,
              backgroundColor: c,
              display: "inline-block",
            }}
          />
        ))}
        <span>more</span>
      </div>
    </section>
  );
};

export default GitHubCalendar;
