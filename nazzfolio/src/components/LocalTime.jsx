import { useEffect, useState } from 'react';

const ACCENT = '#5a51e8';

const formatTime = (date) =>
  date.toLocaleTimeString('it-IT', {
    timeZone: 'Europe/Rome',
    hour12: false,
  });

const LocalTime = () => {
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="text-[var(--muted)] text-[11px] flex items-center gap-1.5 tabular-nums">
      <span style={{ color: ACCENT }}>$</span>
      <span>{time} · Italy</span>
      <span
        className="inline-block w-[6px] h-3"
        style={{
          backgroundColor: ACCENT,
          animation: 'blink 0.8s step-end infinite',
        }}
      />
    </p>
  );
};

export default LocalTime;
