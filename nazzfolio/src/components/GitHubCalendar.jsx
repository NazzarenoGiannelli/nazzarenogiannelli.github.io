import data from '../data/github-contributions.json';

const ACCENT = '#382FBC';
const LEVEL_COLORS = [
  '#161616',
  'rgba(56, 47, 188, 0.30)',
  'rgba(56, 47, 188, 0.55)',
  'rgba(56, 47, 188, 0.80)',
  'rgba(56, 47, 188, 1.00)',
];

const formatDate = (iso) => {
  const d = new Date(iso + 'T00:00:00Z');
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
};

const VISIBLE_WEEKS = 35;

const GitHubCalendar = () => {
  if (!data || data.placeholder || !data.weeks?.length) return null;

  const { totalContributions, weeks } = data;
  const visibleWeeks = weeks.slice(-VISIBLE_WEEKS);

  return (
    <div className="mb-10">
      <p className="text-gray-500 text-xs mb-3" style={{ color: '#888' }}>
        <span style={{ color: ACCENT }}>//</span> activity
      </p>
      <div
        className="px-4 py-4 border border-gray-800"
        style={{ backgroundColor: '#111' }}
      >
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-white text-xs">
            {totalContributions.toLocaleString()}{' '}
            <span className="text-gray-500">contributions / year</span>
          </span>
          <a
            href="https://github.com/NazzarenoGiannelli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#382FBC] transition-colors text-[10px]"
          >
            @NazzarenoGiannelli
          </a>
        </div>

        <div
          className="grid gap-[2px] w-full"
          style={{
            gridTemplateColumns: `repeat(${visibleWeeks.length}, minmax(0, 1fr))`,
            gridTemplateRows: 'repeat(7, minmax(0, 1fr))',
            gridAutoFlow: 'column',
          }}
          role="img"
          aria-label={`${totalContributions} GitHub contributions in the last year`}
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
                  title={`${day.c} contribution${day.c === 1 ? '' : 's'} on ${formatDate(day.d)}`}
                  className="aspect-square"
                  style={{
                    backgroundColor: LEVEL_COLORS[day.l] ?? LEVEL_COLORS[0],
                  }}
                />
              );
            }
            return cells;
          })}
        </div>

        <div className="flex items-center justify-end gap-1 mt-3 text-[10px] text-gray-500">
          <span>less</span>
          {LEVEL_COLORS.map((c, i) => (
            <span
              key={i}
              style={{ width: 10, height: 10, backgroundColor: c, display: 'inline-block' }}
            />
          ))}
          <span>more</span>
        </div>
      </div>
    </div>
  );
};

export default GitHubCalendar;
