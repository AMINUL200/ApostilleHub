import React from 'react';
import { motion } from 'framer-motion';

const HomeHeroSection = () => {
  const statuses = [
    { label: 'Received', done: true },
    { label: 'Verified', done: true },
    { label: 'Apostille completed', done: true },
    { label: 'Delivered', done: false },
  ];

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="relative overflow-hidden" style={{ background: 'var(--dark)' }}>
      {/* Guilloché-style engraved line texture */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 1440 800"
      >
        <defs>
          <pattern id="guilloche" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M0,60 Q30,0 60,60 T120,60" fill="none" stroke="#D4AF37" strokeWidth="1" />
            <path d="M0,90 Q30,30 60,90 T120,90" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="1440" height="800" fill="url(#guilloche)" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 grid lg:grid-cols-[1.15fr_1fr] gap-16 items-center">
        {/* Left column */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.35)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--secondary)' }} />
            <span
              className="text-xs font-semibold tracking-[0.14em] uppercase"
              style={{ color: 'var(--secondary)' }}
            >
              Hague Convention Apostille &amp; Legalisation
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-[2.75rem] leading-[1.1] sm:text-6xl lg:text-[3.75rem] font-semibold mb-6"
            style={{ fontFamily: "'Fraunces', serif", color: '#F8FAFC' }}
          >
            Your documents,
            <br />
            <span style={{ color: 'var(--secondary)' }}>apostilled</span> and recognised anywhere.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg leading-relaxed mb-10 max-w-xl"
            style={{ color: 'var(--text-light)' }}
          >
            Upload your documents and our verified officers handle every signature, stamp, and
            shipment — reviewed, apostilled, and tracked from submission to delivery, in more
            than 60 countries.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-14">
            <button className="btn-gold">Start an order</button>
            <button
              className="btn-outline"
              style={{ borderColor: 'rgba(248,250,252,0.3)', color: '#F8FAFC' }}
            >
              Track my order
            </button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="grid grid-cols-3 gap-8 pt-8"
            style={{ borderTop: '1px solid rgba(248,250,252,0.1)' }}
          >
            {[
              { value: '60+', label: 'Countries served' },
              { value: '24–48h', label: 'Express processing' },
              { value: '256-bit', label: 'Encrypted uploads' },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-2xl font-semibold mb-1"
                  style={{ fontFamily: "'Fraunces', serif", color: '#F8FAFC' }}
                >
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-wide" style={{ color: 'var(--text-light)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right column — document stack with seal + status tracker */}
        <div className="relative flex justify-center lg:justify-end pb-10">
          <div className="relative w-full max-w-sm" style={{ minHeight: 460 }}>
            {/* Back page, peeking out for depth */}
            <motion.div
              initial={{ opacity: 0, rotate: 2, y: 30 }}
              animate={{ opacity: 1, rotate: 6, y: 18 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="absolute inset-0 rounded-xl"
              style={{
                background: 'var(--surface)',
                boxShadow: 'var(--shadow-md)',
                transformOrigin: 'bottom left',
              }}
            />

            {/* Front certificate page */}
            <motion.div
              initial={{ opacity: 0, rotate: -3, y: 40 }}
              animate={{ opacity: 1, rotate: -2, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="relative rounded-xl p-8"
              style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-lg)' }}
            >
              {/* Letterhead */}
              <div
                className="flex items-center justify-between pb-5 mb-6"
                style={{ borderBottom: '2px solid var(--primary)' }}
              >
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.16em] mb-1"
                    style={{ color: 'var(--text-light)' }}
                  >
                    Order #APS-40218
                  </p>
                  <p
                    className="font-semibold"
                    style={{ fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}
                  >
                    Certificate of Apostille
                  </p>
                </div>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ border: '1.5px solid var(--primary)' }}
                >
                  <span className="text-[10px] font-bold" style={{ color: 'var(--primary)' }}>
                    HC
                  </span>
                </div>
              </div>

              {/* Simulated document text lines */}
              <div className="space-y-2.5 mb-6">
                {[100, 92, 96, 70].map((w, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scaleX: 0.6 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.55 + i * 0.08 }}
                    style={{
                      transformOrigin: 'left',
                      height: 6,
                      width: `${w}%`,
                      borderRadius: 3,
                      background: 'var(--border)',
                    }}
                  />
                ))}
              </div>

              {/* Status tracker */}
              <div className="space-y-3 mb-8">
                {statuses.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                      style={
                        s.done
                          ? { background: 'var(--primary)', color: '#fff' }
                          : { background: 'transparent', border: '2px solid var(--secondary)' }
                      }
                    >
                      {s.done ? '✓' : ''}
                    </span>
                    <span
                      className="text-sm"
                      style={{
                        color: s.done ? 'var(--text-primary)' : 'var(--text-secondary)',
                        fontWeight: s.done ? 500 : 400,
                      }}
                    >
                      {s.label}
                    </span>
                    {!s.done && (
                      <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                        className="ml-auto w-1.5 h-1.5 rounded-full"
                        style={{ background: 'var(--secondary)' }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Signature line */}
              <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                <div>
                  <div className="w-24 h-px mb-1" style={{ background: 'var(--text-light)' }} />
                  <p className="text-[10px]" style={{ color: 'var(--text-light)' }}>
                    Authorised officer
                  </p>
                </div>
              </div>

              {/* Wax seal, stamped on */}
              <motion.div
                initial={{ opacity: 0, scale: 1.8, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: -8 }}
                transition={{ duration: 0.5, delay: 1.3, type: 'spring', stiffness: 220, damping: 14 }}
                className="absolute -bottom-8 -right-6"
              >
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--gradient-gold)', boxShadow: '0 12px 28px rgba(212,175,55,0.4)' }}
                >
                  <div
                    className="w-[84px] h-[84px] rounded-full flex items-center justify-center"
                    style={{ border: '2px solid rgba(11,18,32,0.25)' }}
                  >
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest text-center leading-tight"
                      style={{ color: 'var(--dark)' }}
                    >
                      Verified
                      <br />
                      Apostille
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;