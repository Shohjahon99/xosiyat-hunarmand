import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

function useCountUp(target: number, duration = 2000, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return count;
}

const stats = [
  { icon: '🎓', value: 100, suffix: '+', key: 'stats.apprentices' },
  { icon: '📅', value: 2014, suffix: '', key: 'stats.since_year' },
  { icon: '👩', value: 23, suffix: '', key: 'stats.active_students' },
  { icon: '🏆', value: 6, suffix: '', key: 'stats.directions' },
];

function StatItem({ icon, value, suffix, label, active }: {
  icon: string; value: number; suffix: string; label: string; active: boolean;
}) {
  const count = useCountUp(value, 2000, active);
  return (
    <div className="text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="font-playfair text-3xl md:text-4xl font-bold text-gold-primary">
        {count}{suffix}
      </div>
      <div className="text-cream-dark text-sm mt-1 opacity-90">{label}</div>
    </div>
  );
}

export default function StatsStrip() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="stats" className="bg-red-dark py-10 md:py-14" ref={ref}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s, i) => (
            <StatItem
              key={i}
              icon={s.icon}
              value={s.value}
              suffix={s.suffix}
              label={t(s.key)}
              active={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
