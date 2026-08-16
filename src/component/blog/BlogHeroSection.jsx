import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, FolderOpen, RefreshCw, ArrowRight } from 'lucide-react';

const stats = [
  { icon: BookOpen, value: '500+', label: 'Articles' },
  { icon: FolderOpen, value: '7', label: 'Categories' },
  { icon: RefreshCw, value: 'Weekly', label: 'Updates' },
];

const topics = ['Apostille', 'Legalisation', 'Immigration', 'Visa processing', 'Education documents'];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const BlogHeroSection = () => {
  const [query, setQuery] = useState('');

  return (
    <section className="relative overflow-hidden" style={{ background: 'var(--dark)' }}>
      {/* Guilloché-style engraved line texture, consistent with the main hero */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 1440 800"
      >
        <defs>
          <pattern id="blogGuilloche" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M0,60 Q30,0 60,60 T120,60" fill="none" stroke="#D4AF37" strokeWidth="1" />
            <path d="M0,90 Q30,30 60,90 T120,90" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="1440" height="800" fill="url(#blogGuilloche)" />
      </svg>

      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="relative max-w-4xl mx-auto px-6 lg:px-12 py-24 lg:py-32 text-center"
      >
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{ background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.35)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--secondary)' }} />
          <span className="text-xs font-semibold tracking-[0.14em] uppercase" style={{ color: 'var(--secondary)' }}>
            Resources & insights
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-[2.5rem] leading-[1.1] sm:text-5xl lg:text-6xl font-semibold mb-6"
          style={{ fontFamily: "'Fraunces', serif", color: '#F8FAFC' }}
        >
          Knowledge hub <span style={{ color: 'var(--secondary)' }}>&amp; resources</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
          style={{ color: 'var(--text-light)' }}
        >
          Expert insights on apostille, legalisation, immigration, visa processing, education
          documents, and UK government updates.
        </motion.p>

        {/* Search bar */}
        <motion.div variants={fadeUp} className="relative max-w-xl mx-auto mb-8">
          <div
            className="flex items-center gap-3 rounded-full pl-6 pr-2 py-2 transition-colors duration-300 focus-within:border-[color:var(--secondary)]"
            style={{ background: 'rgba(248,250,252,0.06)', border: '1px solid rgba(248,250,252,0.16)' }}
          >
            <Search size={18} strokeWidth={2} style={{ color: 'var(--text-light)' }} className="flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="flex-1 bg-transparent border-none outline-none text-sm py-2.5"
              style={{ color: '#F8FAFC' }}
            />
            <button
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold flex-shrink-0 transition-transform duration-200 hover:scale-[1.03]"
              style={{ background: 'var(--gradient-gold)', color: 'var(--dark)' }}
            >
              Search
              <ArrowRight size={15} strokeWidth={2} />
            </button>
          </div>
        </motion.div>

        {/* Popular topics */}
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2.5 mb-16">
          {topics.map((topic) => (
            <button
              key={topic}
              className="px-4 py-1.5 rounded-full text-xs font-medium transition-colors duration-200"
              style={{
                background: 'rgba(248,250,252,0.04)',
                border: '1px solid rgba(248,250,252,0.14)',
                color: 'var(--text-light)',
              }}
            >
              {topic}
            </button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-8 sm:gap-14">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-6 sm:gap-14">
                {i > 0 && <span className="hidden sm:block w-px h-10" style={{ background: 'rgba(248,250,252,0.12)' }} />}
                <div className="flex flex-col items-center">
                  <Icon size={18} strokeWidth={1.75} style={{ color: 'var(--secondary)' }} className="mb-2" />
                  <p
                    className="text-xl sm:text-2xl font-semibold leading-none mb-1"
                    style={{ fontFamily: "'Fraunces', serif", color: '#F8FAFC' }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-wide" style={{ color: 'var(--text-light)' }}>
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BlogHeroSection;