import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const team = [
  {
    name: 'James Whitfield',
    role: 'CEO',
    description: 'Leads the company\u2019s vision for simple, transparent document legalisation.',
  },
  {
    name: 'Elena Marsh',
    role: 'Operations Manager',
    description: 'Oversees day-to-day processing, keeping every order moving on schedule.',
  },
  {
    name: 'Rohan Kapoor',
    role: 'Apostille Specialist',
    description: 'Verifies and certifies documents against each country\u2019s exact requirements.',
  },
  {
    name: 'Aisha Bello',
    role: 'Customer Support Lead',
    description: 'Makes sure every client gets clear answers fast, start to finish.',
  },
];

const avatarUrl = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0F4C81&color=F8FAFC&size=256&font-size=0.35&bold=true&format=svg`;

const getItemsPerView = () => {
  if (typeof window === 'undefined') return 4;
  const w = window.innerWidth;
  if (w >= 1024) return 4; // desktop
  if (w >= 768) return 3; // tablet
  return 1; // mobile
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const TeamSection = () => {
  const [itemsPerView, setItemsPerView] = useState(getItemsPerView);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);

  const maxIndex = Math.max(team.length - itemsPerView, 0);

  useEffect(() => {
    const onResize = () => setItemsPerView(getItemsPerView());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    setIndex((i) => Math.min(i, Math.max(team.length - itemsPerView, 0)));
  }, [itemsPerView]);

  const paginate = useCallback(
    (dir) => {
      setIndex((prev) => {
        if (maxIndex === 0) return 0;
        let next = prev + dir;
        if (next < 0) next = maxIndex;
        if (next > maxIndex) next = 0;
        return next;
      });
    },
    [maxIndex]
  );

  useEffect(() => {
    if (isPaused || maxIndex === 0) return;
    const timer = setInterval(() => paginate(1), 4500);
    return () => clearInterval(timer);
  }, [isPaused, maxIndex, paginate]);

  const slideWidth = 100 / itemsPerView;
  const showNav = maxIndex > 0;

  return (
    <section style={{ background: 'var(--surface)' }} className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-5 justify-center">
            <span className="w-6 h-px" style={{ background: 'var(--secondary)' }} />
            <span className="text-xs font-semibold tracking-[0.14em] uppercase" style={{ color: 'var(--secondary-hover)' }}>
              Our team
            </span>
            <span className="w-6 h-px" style={{ background: 'var(--secondary)' }} />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl lg:text-[2.75rem] leading-[1.15] font-semibold"
            style={{ fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}
          >
            The people behind every apostille
          </motion.h2>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden" ref={trackRef}>
            <motion.div
              className="flex"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(e, info) => {
                if (info.offset.x < -60) paginate(1);
                else if (info.offset.x > 60) paginate(-1);
              }}
              animate={{ x: `-${index * slideWidth}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {team.map((member) => (
                <div
                  key={member.name}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${slideWidth}%` }}
                >
                  <div
                    className="h-full rounded-2xl p-8 flex flex-col items-center text-center transition-shadow duration-300 hover:shadow-lg"
                    style={{ background: 'var(--background)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
                  >
                    <div className="relative mb-5">
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{ border: '2px solid var(--secondary)', opacity: 0.4, transform: 'scale(1.14)' }}
                      />
                      <img
                        src={avatarUrl(member.name)}
                        alt={member.name}
                        draggable={false}
                        className="w-24 h-24 rounded-full object-cover select-none"
                        style={{ boxShadow: 'var(--shadow-sm)' }}
                      />
                    </div>

                    <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}>
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--primary)' }}>
                      {member.role}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Nav arrows */}
          {showNav && (
            <>
              <button
                onClick={() => paginate(-1)}
                aria-label="Previous team members"
                className="absolute left-0 sm:-left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-105"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)', color: 'var(--primary)' }}
              >
                <ChevronLeft size={20} strokeWidth={2} />
              </button>
              <button
                onClick={() => paginate(1)}
                aria-label="Next team members"
                className="absolute right-0 sm:-right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-105"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)', color: 'var(--primary)' }}
              >
                <ChevronRight size={20} strokeWidth={2} />
              </button>
            </>
          )}
        </div>

        {/* Dot indicators */}
        {showNav && (
          <div className="flex justify-center gap-2.5 mt-10">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === index ? 22 : 8,
                  height: 8,
                  background: i === index ? 'var(--gradient-gold)' : 'var(--border)',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;