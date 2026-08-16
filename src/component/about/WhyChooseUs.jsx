import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BadgeCheck, Zap, Globe2, Radar, Headset } from 'lucide-react';

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Secure document handling',
    description: '256-bit encrypted document storage.',
  },
  {
    icon: BadgeCheck,
    title: 'Expert verification team',
    description: 'Experienced apostille specialists.',
  },
  {
    icon: Zap,
    title: 'Fast processing',
    description: 'Express and priority services available.',
  },
  {
    icon: Globe2,
    title: 'Worldwide coverage',
    description: 'Support for 100+ countries.',
  },
  {
    icon: Radar,
    title: 'Live order tracking',
    description: 'Track progress in real time.',
  },
  {
    icon: Headset,
    title: 'Dedicated support',
    description: 'Expert assistance whenever needed.',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const WhyChooseUs = () => {
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
            <span
              className="text-xs font-semibold tracking-[0.14em] uppercase"
              style={{ color: 'var(--secondary-hover)' }}
            >
              Why choose us
            </span>
            <span className="w-6 h-px" style={{ background: 'var(--secondary)' }} />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl lg:text-[2.75rem] leading-[1.15] font-semibold"
            style={{ fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}
          >
            Why clients trust us
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                variants={fadeUp}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="relative rounded-2xl p-8 overflow-hidden cursor-default"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {/* Background index number */}
                <span
                  className="absolute -top-3 right-4 select-none pointer-events-none font-semibold"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: '4.5rem',
                    color: 'var(--primary)',
                    opacity: 0.045,
                    lineHeight: 1,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <motion.div
                  variants={{ rest: { y: 0 }, hover: { y: -6 } }}
                  transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                  className="relative"
                >
                  <motion.div
                    variants={{ rest: { rotate: 0, scale: 1 }, hover: { rotate: -8, scale: 1.06 } }}
                    transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{ background: 'var(--background)', color: 'var(--primary)' }}
                  >
                    <Icon size={24} strokeWidth={1.75} />
                  </motion.div>

                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}
                  >
                    {reason.title}
                  </h3>

                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {reason.description}
                  </p>
                </motion.div>

                {/* Gold underline reveal */}
                <motion.span
                  variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-0 left-0 right-0 h-[3px]"
                  style={{ background: 'var(--gradient-gold)', transformOrigin: 'left' }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;