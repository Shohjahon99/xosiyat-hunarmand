import { useState } from 'react';

const IMAGES = [
  '/photo_2026-06-06_19-21-51.jpg',
  '/photo_2026-06-06_19-23-05.jpg',
  '/photo_2026-06-06_19-23-54.jpg',
  '/photo_2026-06-06_19-24-05.jpg',
  '/photo_2026-06-06_19-24-14.jpg',
  '/photo_2026-06-06_19-24-21.jpg',
  '/photo_2026-06-06_19-24-27.jpg',
  '/photo_2026-06-06_19-24-31.jpg',
];

const DOUBLED = [...IMAGES, ...IMAGES];

export default function Marquee() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="py-10 overflow-hidden relative">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-cream-primary to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-cream-primary to-transparent pointer-events-none" />

      <div
        className="flex gap-5"
        style={{ animation: paused ? 'none' : 'marquee 30s linear infinite' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {DOUBLED.map((src, i) => (
          <div
            key={i}
            className="shrink-0 w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-4 border-cream-dark shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
