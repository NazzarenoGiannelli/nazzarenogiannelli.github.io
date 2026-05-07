const ACCENT = '#382FBC';

const STACK = [
  { name: 'Blender', slug: 'blender' },
  { name: 'Unreal Engine', slug: 'unrealengine' },
  { name: 'React', slug: 'react' },
  { name: 'Python', slug: 'python' },
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'Notion', slug: 'notion' },
];

const iconUrl = (slug) => `https://cdn.simpleicons.org/${slug}/ffffff`;

const Stack = () => (
  <div className="mb-8">
    <p className="text-gray-500 text-xs mb-3" style={{ color: '#888' }}>
      <span style={{ color: ACCENT }}>//</span> stack
    </p>
    <div
      className="px-4 py-4 border border-gray-800"
      style={{ backgroundColor: '#111' }}
    >
      <ul className="grid grid-cols-3 sm:grid-cols-6 gap-y-4 gap-x-2">
        {STACK.map(({ name, slug }) => (
          <li
            key={slug}
            className="flex flex-col items-center gap-1.5 group"
            title={name}
          >
            <span
              aria-hidden="true"
              className="w-6 h-6 transition-colors duration-200"
              style={{
                backgroundColor: '#888',
                WebkitMaskImage: `url(${iconUrl(slug)})`,
                maskImage: `url(${iconUrl(slug)})`,
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = ACCENT;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#888';
              }}
            />
            <span className="text-[10px] text-gray-500 group-hover:text-gray-300 transition-colors">
              {name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Stack;
