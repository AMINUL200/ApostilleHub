import React from 'react';
import { motion } from 'framer-motion';
import { Globe2 } from 'lucide-react';

const countries = [
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'United States', flag: '🇺🇸' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'Italy', flag: '🇮🇹' },
  { name: 'Spain', flag: '🇪🇸' },
  { name: 'UAE', flag: '🇦🇪' },
  { name: 'India', flag: '🇮🇳' },
];

// Marker positions plotted around the globe face — decorative, not geographic
const markers = [
  { top: '22%', left: '46%' },
  { top: '34%', left: '28%' },
  { top: '20%', left: '24%' },
  { top: '68%', left: '78%' },
  { top: '18%', left: '55%' },
  { top: '26%', left: '50%' },
  { top: '38%', left: '52%' },
  { top: '42%', left: '44%' },
  { top: '46%', left: '62%' },
  { top: '50%', left: '58%' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const chip = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const HomeCountriesWeSupport = () => {
  return (
    <section className="relative overflow-hidden" style={{ background: 'var(--dark)' }}>
      {/* Faint engraved line texture, consistent with hero */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 1440 800"
      >
        <defs>
          <pattern id="countriesGuilloche" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M0,60 Q30,0 60,60 T120,60" fill="none" stroke="#D4AF37" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1440" height="800" fill="url(#countriesGuilloche)" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
          className="max-w-2xl mx-auto text-center mb-16 lg:mb-20"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-5 justify-center">
            <span className="w-6 h-px" style={{ background: 'var(--secondary)' }} />
            <span className="text-xs font-semibold tracking-[0.14em] uppercase" style={{ color: 'var(--secondary)' }}>
              Global coverage
            </span>
            <span className="w-6 h-px" style={{ background: 'var(--secondary)' }} />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl lg:text-[2.75rem] leading-[1.15] font-semibold mb-5"
            style={{ fontFamily: "'Fraunces', serif", color: '#F8FAFC' }}
          >
            Global coverage across{' '}
            <span style={{ color: 'var(--secondary)' }}>150+ countries</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-lg leading-relaxed" style={{ color: 'var(--text-light)' }}>
            Wherever your documents need to be recognised, our network of specialists and
            partner authorities gets them there.
          </motion.p>
        </motion.div>

        {/* Wireframe globe with pulsing markers */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mb-16 lg:mb-20"
          style={{ width: 'min(90vw, 460px)', aspectRatio: '1 / 1' }}
        >
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <circle cx="200" cy="200" r="180" fill="none" stroke="rgba(212,175,55,0.35)" strokeWidth="1" />
            <circle cx="200" cy="200" r="180" fill="rgba(212,175,55,0.04)" />
            {/* Meridians */}
            {[0, 30, 60, 90, 120, 150].map((deg) => (
              <ellipse
                key={deg}
                cx="200"
                cy="200"
                rx={180 * Math.abs(Math.cos((deg * Math.PI) / 180))}
                ry="180"
                fill="none"
                stroke="rgba(212,175,55,0.16)"
                strokeWidth="1"
              />
            ))}
            {/* Latitudes */}
            {[-120, -60, 0, 60, 120].map((y) => (
              <ellipse
                key={y}
                cx="200"
                cy={200 + y}
                rx={Math.sqrt(Math.max(180 * 180 - y * y, 0))}
                ry={Math.sqrt(Math.max(180 * 180 - y * y, 0)) * 0.18}
                fill="none"
                stroke="rgba(212,175,55,0.16)"
                strokeWidth="1"
              />
            ))}
          </svg>

          {markers.map((m, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="absolute w-2.5 h-2.5 rounded-full"
              style={{ top: m.top, left: m.left, background: 'var(--secondary)', boxShadow: '0 0 0 4px rgba(212,175,55,0.18)' }}
            >
              <motion.span
                animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.25, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full"
                style={{ background: 'var(--secondary)' }}
              />
            </motion.span>
          ))}

          {/* Centre badge */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: 'var(--gradient-gold)', boxShadow: '0 12px 30px rgba(212,175,55,0.35)' }}
          >
            <Globe2 size={26} strokeWidth={1.75} style={{ color: 'var(--dark)' }} />
          </div>
        </motion.div>

        {/* Popular countries */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          <motion.p
            variants={fadeUp}
            className="text-center text-xs font-semibold tracking-[0.14em] uppercase mb-6"
            style={{ color: 'var(--text-light)' }}
          >
            Popular countries
          </motion.p>

          <motion.div variants={container} className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {countries.map((country) => (
              <motion.div
                key={country.name}
                variants={chip}
                whileHover={{ y: -3, borderColor: 'rgba(212,175,55,0.5)' }}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full cursor-default"
                style={{ background: 'rgba(248,250,252,0.04)', border: '1px solid rgba(248,250,252,0.12)' }}
              >
                <span className="text-base leading-none">{country.flag}</span>
                <span className="text-sm font-medium" style={{ color: '#F8FAFC' }}>
                  {country.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeCountriesWeSupport;