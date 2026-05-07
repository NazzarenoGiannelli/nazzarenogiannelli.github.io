const ACCENT = '#382FBC';

// Edit these freely — daily-driver tools and languages, kept current.
// Each item can be a string or { name, href } to link out to the tool.
const STACK = [
  {
    label: 'software',
    items: [
      { name: 'Unreal Engine', href: 'https://www.unrealengine.com/' },
      { name: 'Blender', href: 'https://www.blender.org/' },
    ],
  },
  {
    label: 'code',
    items: [
      { name: 'Python', href: 'https://www.python.org/' },
      { name: 'React', href: 'https://react.dev/' },
    ],
  },
  {
    label: 'terminal',
    items: [
      { name: 'WezTerm', href: 'https://wezterm.org/' },
      { name: 'zoxide', href: 'https://github.com/ajeetdsouza/zoxide' },
      { name: 'lazygit', href: 'https://github.com/jesseduffield/lazygit' },
      { name: 'yazi', href: 'https://yazi-rs.github.io/' },
    ],
  },
  {
    label: 'ai',
    items: [
      { name: 'Claude Code', href: 'https://claude.com/product/claude-code' },
      { name: 'Wispr Flow', href: 'https://wisprflow.ai/' },
    ],
  },
  {
    label: 'utils',
    items: [
      { name: 'Listary', href: 'https://www.listary.com/' },
      { name: 'XYplorer', href: 'https://www.xyplorer.com/' },
      { name: 'Granola', href: 'https://www.granola.ai/' },
    ],
  },
];

const Item = ({ item }) => {
  const name = typeof item === 'string' ? item : item.name;
  const href = typeof item === 'string' ? null : item.href;

  if (!href) return <span>{name}</span>;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-300 hover:text-[#382FBC] transition-colors duration-200"
    >
      {name}
    </a>
  );
};

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
              {items.map((item, i) => {
                const key = typeof item === 'string' ? item : item.name;
                return (
                  <span key={key}>
                    <Item item={item} />
                    {i < items.length - 1 && (
                      <span className="text-gray-600 mx-1.5">·</span>
                    )}
                  </span>
                );
              })}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Stack;
