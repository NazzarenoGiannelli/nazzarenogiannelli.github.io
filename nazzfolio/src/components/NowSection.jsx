const ACCENT = '#382FBC';

// Edit these freely — short, declarative, present tense.
const ITEMS = [
  { label: 'Building', value: 'R3PLICA — digital furniture replicas' },
  { label: 'Tinkering', value: 'Blender + Unreal pipelines' },
  { label: 'Reading', value: '"Hyperion" — Dan Simmons' },
  { label: 'Based in', value: 'Italy' },
];

const NowSection = () => (
  <div className="mb-8">
    <p className="text-gray-500 text-xs mb-3" style={{ color: '#888' }}>
      <span style={{ color: ACCENT }}>//</span> now
    </p>
    <div
      className="px-4 py-3 border border-gray-800"
      style={{ backgroundColor: '#111' }}
    >
      <ul className="flex flex-col gap-1.5 text-xs">
        {ITEMS.map(({ label, value }) => (
          <li key={label} className="flex gap-2">
            <span style={{ color: ACCENT }}>&gt;</span>
            <span className="text-gray-500">{label}</span>
            <span className="text-gray-300">{value}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default NowSection;
