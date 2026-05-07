import { useEffect, useState } from 'react';

const ACCENT = '#382FBC';

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
    <p className="text-gray-600 text-[11px] flex items-center justify-center gap-1.5 mb-2 tabular-nums">
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
