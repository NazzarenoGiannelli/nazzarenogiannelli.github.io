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

const GitHubCalendar = () => {
  if (!data || data.placeholder || !data.weeks?.length) return null;

  const { totalContributions, weeks } = data;

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

        <div className="overflow-x-auto -mx-1 px-1 pb-1">
          <div
            className="grid grid-flow-col gap-[2px]"
            style={{ gridTemplateRows: 'repeat(7, minmax(0, 1fr))' }}
            role="img"
            aria-label={`${totalContributions} GitHub contributions in the last year`}
          >
            {weeks.flatMap((week, wi) => {
              const cells = [];
              for (let di = 0; di < 7; di += 1) {
                const day = week[di];
                if (!day) {
                  cells.push(
                    <div
                      key={`${wi}-${di}-empty`}
                      style={{ width: 10, height: 10 }}
                    />,
                  );
                  continue;
                }
                cells.push(
                  <div
                    key={day.d}
                    title={`${day.c} contribution${day.c === 1 ? '' : 's'} on ${formatDate(day.d)}`}
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: LEVEL_COLORS[day.l] ?? LEVEL_COLORS[0],
                    }}
                  />
                );
              }
              return cells;
            })}
          </div>
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
