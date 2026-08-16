import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Lock, RefreshCw, Sparkles } from 'lucide-react';

const values = [
  {
    icon: Scale,
    numeral: 'I',
    title: 'Integrity',
    description: 'We operate with honesty and transparency, in every order and every conversation.',
  },
  {
    icon: Lock,
    numeral: 'II',
    title: 'Security',
    description: 'Protecting customer data is our priority, from upload to final delivery.',
  },
  {
    icon: RefreshCw,
    numeral: 'III',
    title: 'Reliability',
    description: 'Consistent and dependable service delivery, order after order.',
  },
  {
    icon: Sparkles,
    numeral: 'IV',
    title: 'Excellence',
    description: 'Continuous improvement and customer satisfaction, never treated as done.',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const CoreValues = () => {
  return (
    <section className="relative overflow-hidden" style={{ background: 'var(--dark)' }}>
      {/* Engraved line texture, consistent with hero */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 1440 800"
      >
        <defs>
          <pattern id="valuesGuilloche" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M0,60 Q30,0 60,60 T120,60" fill="none" stroke="#D4AF37" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1440" height="800" fill="url(#valuesGuilloche)" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
          className="max-w-2xl mb-16 lg:mb-20"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-5">
            <span className="w-6 h-px" style={{ background: 'var(--secondary)' }} />
            <span className="text-xs font-semibold tracking-[0.14em] uppercase" style={{ color: 'var(--secondary)' }}>
              Our values
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl lg:text-[2.75rem] leading-[1.15] font-semibold"
            style={{ fontFamily: "'Fraunces', serif", color: '#F8FAFC' }}
          >
            The principles behind every order
          </motion.h2>
        </motion.div>

        {/* Pillars */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
          className="grid grid-cols-1 lg:grid-cols-4"
        >
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                variants={fadeUp}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="relative px-1 lg:px-8 py-9 lg:py-2 border-t first:border-t-0 lg:border-t-0 lg:border-l lg:first:border-l-0"
                style={{ borderColor: 'rgba(248,250,252,0.1)' }}
              >
                <motion.span
                  variants={{ rest: { opacity: 0.12 }, hover: { opacity: 0.22 } }}
                  className="block select-none font-semibold mb-2"
                  style={{ fontFamily: "'Fraunces', serif", fontSize: '3rem', color: 'var(--secondary)', lineHeight: 1 }}
                >
                  {value.numeral}
                </motion.span>

                <motion.div
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
                  transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                  style={{ border: '1.5px solid var(--secondary)' }}
                >
                  <Icon size={20} strokeWidth={1.5} style={{ color: 'var(--secondary)' }} />
                </motion.div>

                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ fontFamily: "'Fraunces', serif", color: '#F8FAFC' }}
                >
                  {value.title}
                </h3>

                <p className="text-sm leading-relaxed max-w-[15rem]" style={{ color: 'var(--text-light)' }}>
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CoreValues;