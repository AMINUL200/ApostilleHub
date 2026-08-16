import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Award, FileCheck2, Star } from 'lucide-react';

const stats = [
  { icon: Award, value: '10+', label: 'Years in business' },
  { icon: FileCheck2, value: '50,000+', label: 'Documents processed' },
  { icon: Star, value: '98%', label: 'Client satisfaction' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden" style={{ background: 'var(--background)' }}>
      {/* Oversized watermark type, purely decorative */}
      <p
        aria-hidden="true"
        className="absolute select-none pointer-events-none whitespace-nowrap font-semibold"
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 'clamp(6rem, 18vw, 16rem)',
          color: 'var(--primary)',
          opacity: 0.045,
          top: '-2%',
          left: '-2%',
          lineHeight: 1,
        }}
      >
        Apostille
      </p>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-14 pb-24 lg:pt-20 lg:pb-32">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-1.5 text-sm mb-14 lg:mb-20"
          style={{ color: 'var(--text-secondary)' }}
        >
          <span className="hover:underline cursor-pointer">Home</span>
          <ChevronRight size={14} strokeWidth={2} style={{ color: 'var(--text-light)' }} />
          <span style={{ color: 'var(--primary)' }} className="font-medium">
            About us
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-16 lg:gap-12 items-center">
          {/* Left column */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-6">
              <span className="w-6 h-px" style={{ background: 'var(--secondary)' }} />
              <span
                className="text-xs font-semibold tracking-[0.14em] uppercase"
                style={{ color: 'var(--secondary-hover)' }}
              >
                About us
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-[2.5rem] leading-[1.12] sm:text-5xl lg:text-[3.25rem] font-semibold mb-6"
              style={{ fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}
            >
              A team built to get your documents{' '}
              <span style={{ color: 'var(--primary)' }}>recognised</span>, wherever they need to be.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg leading-relaxed mb-10 max-w-xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              We started as a small team of legal specialists frustrated by how slow and opaque
              document legalisation could be. Today we're a full apostille and legalisation desk —
              still run by people who check every stamp themselves.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-14">
              <button className="btn-primary">Meet the team</button>
              <button className="btn-outline">Our process</button>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-10 gap-y-6">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="flex items-center gap-3">
                    {i > 0 && (
                      <span
                        className="hidden sm:block w-px h-10 -ml-5 mr-5"
                        style={{ background: 'var(--border)' }}
                      />
                    )}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--primary)' }}
                    >
                      <Icon size={17} strokeWidth={1.75} />
                    </div>
                    <div>
                      <p
                        className="text-xl font-semibold leading-none mb-1"
                        style={{ fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}
                      >
                        {stat.value}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right column — offset photo collage + rotating seal */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md" style={{ minHeight: 440 }}>
              {/* Gold frame accent behind the main photo */}
              <div
                className="absolute top-6 -right-5 w-[78%] h-[72%] rounded-2xl"
                style={{ border: '2px solid var(--secondary)', opacity: 0.35 }}
              />

              {/* Main photo - Professional team reviewing documents */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="relative rounded-2xl overflow-hidden ml-auto"
                style={{ width: '78%', height: 340, boxShadow: 'var(--shadow-lg)' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&h=600&fit=crop&crop=center"
                  alt="Our apostille and legalisation specialists at work"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Secondary photo - Documents being reviewed */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                className="absolute -bottom-8 left-0 rounded-2xl overflow-hidden"
                style={{ width: '52%', height: 190, boxShadow: 'var(--shadow-lg)', border: '4px solid var(--surface)' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&crop=center"
                  alt="Documents being reviewed and stamped"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Rotating seal badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -top-6 -left-6 w-24 h-24 sm:w-28 sm:h-28"
              >
                <motion.svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                >
                  <defs>
                    <path id="sealCircle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                  </defs>
                  <circle cx="50" cy="50" r="49" fill="var(--gradient-gold)" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(11,18,32,0.2)" strokeWidth="1" />
                  <text fontSize="8.3" fontWeight="700" letterSpacing="2" fill="var(--dark)">
                    <textPath href="#sealCircle" startOffset="0%">
                      TRUSTED • SINCE 2015 •
                    </textPath>
                  </text>
                </motion.svg>
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ transform: 'none' }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--dark)' }}
                  >
                    <Award size={16} strokeWidth={1.75} style={{ color: 'var(--secondary)' }} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;