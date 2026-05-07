const ACCENT = '#382FBC';

// Edit these freely — daily-driver tools and languages, kept current.
const STACK = [
  { label: 'software', items: ['Unreal Engine', 'Blender'] },
  { label: 'code', items: ['Python', 'React'] },
  { label: 'terminal', items: ['WezTerm', 'zoxide', 'lazygit', 'yazi'] },
  { label: 'ai', items: ['Claude Code', 'Wispr Flow'] },
  { label: 'utils', items: ['Listary', 'XYplorer', 'Granola'] },
];

const Stack = () => (
  <div className="mb-8">
    <p className="text-gray-500 text-xs mb-3" style={{ color: '#888' }}>
      <span style={{ color: ACCENT }}>//</span> stack
    </p>
    <div
      className="px-4 py-3 border border-gray-800"
      style={{ backgroundColor: '#111' }}
    >
      <ul className="flex flex-col gap-1.5 text-xs">
        {STACK.map(({ label, items }) => (
          <li key={label} className="flex gap-3">
            <span className="text-gray-500 w-20 shrink-0">{label}</span>
            <span className="text-gray-300 flex-1">
              {items.map((item, i) => (
                <span key={item}>
                  {item}
                  {i < items.length - 1 && (
                    <span className="text-gray-600 mx-1.5">·</span>
                  )}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Stack;
