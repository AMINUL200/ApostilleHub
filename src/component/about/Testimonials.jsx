import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Lawson',
    location: 'United Kingdom',
    rating: 5,
    text: 'My degree was apostilled and back in my hands within three days. The tracker meant I never had to email and ask what was happening.',
  },
  {
    name: 'Ahmed Al Rashid',
    location: 'United Arab Emirates',
    rating: 5,
    text: 'Needed a business certificate legalised fast for a contract deadline. The express service came through exactly when promised.',
  },
  {
    name: 'Maria Gonzalez',
    location: 'Spain',
    rating: 5,
    text: 'Clear pricing, no surprise fees, and a support team that actually answers the phone. Made a stressful process feel manageable.',
  },
  {
    name: 'David Kim',
    location: 'Australia',
    rating: 4,
    text: 'Uploaded my police clearance from my phone and it was verified the same afternoon. Genuinely didn\u2019t expect it to be this simple.',
  },
  {
    name: 'Priya Nair',
    location: 'India',
    rating: 5,
    text: 'Used them for a marriage certificate and a power of attorney in the same order. Both arrived together, properly stamped and sealed.',
  },
];

const avatarUrl = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=D4AF37&color=0B1220&size=256&font-size=0.35&bold=true&format=svg`;

const getItemsPerView = () => {
  if (typeof window === 'undefined') return 3;
  const w = window.innerWidth;
  if (w >= 1024) return 3; // desktop
  if (w >= 768) return 2; // tablet
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

const Testimonials = () => {
  const [itemsPerView, setItemsPerView] = useState(getItemsPerView);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);

  const maxIndex = Math.max(testimonials.length - itemsPerView, 0);

  useEffect(() => {
    const onResize = () => setItemsPerView(getItemsPerView());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    setIndex((i) => Math.min(i, Math.max(testimonials.length - itemsPerView, 0)));
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
    <section style={{ background: 'var(--background)' }} className="py-24 lg:py-32">
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
              Testimonials
            </span>
            <span className="w-6 h-px" style={{ background: 'var(--secondary)' }} />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl lg:text-[2.75rem] leading-[1.15] font-semibold mb-4"
            style={{ fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}
          >
            What our clients say
          </motion.h2>

          <motion.p variants={fadeUp} className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Real orders, real turnaround times, from clients across our 150+ countries served.
          </motion.p>
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
              {testimonials.map((t) => (
                <div key={t.name} className="flex-shrink-0 px-3" style={{ width: `${slideWidth}%` }}>
                  <div
                    className="relative h-full rounded-2xl p-8 flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
                  >
                    <Quote
                      size={72}
                      strokeWidth={0}
                      fill="var(--primary)"
                      className="absolute -top-2 -right-2 opacity-[0.05] pointer-events-none"
                    />

                    <div className="relative flex gap-1 mb-5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          strokeWidth={0}
                          fill={i < t.rating ? 'var(--secondary)' : 'var(--border)'}
                        />
                      ))}
                    </div>

                    <p className="relative text-[15px] leading-relaxed mb-8 flex-1" style={{ color: 'var(--text-secondary)' }}>
                      "{t.text}"
                    </p>

                    <div className="relative flex items-center gap-3 pt-5" style={{ borderTop: '1px solid var(--border)' }}>
                      <img
                        src={avatarUrl(t.name)}
                        alt={t.name}
                        draggable={false}
                        className="w-11 h-11 rounded-full object-cover select-none flex-shrink-0"
                      />
                      <div>
                        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {t.name}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--text-light)' }}>
                          {t.location}
                        </p>
                      </div>
                    </div>
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
                aria-label="Previous testimonials"
                className="absolute left-0 sm:-left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-105"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)', color: 'var(--primary)' }}
              >
                <ChevronLeft size={20} strokeWidth={2} />
              </button>
              <button
                onClick={() => paginate(1)}
                aria-label="Next testimonials"
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

export default Testimonials;