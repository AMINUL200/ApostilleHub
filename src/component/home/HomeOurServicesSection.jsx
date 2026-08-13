import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Apostille services',
    description: 'Official apostille certification for international document use.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="3" width="16" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="17" cy="17" r="4.5" fill="var(--surface)" stroke="currentColor" strokeWidth="1.5" />
        <path d="m15.3 17 1.1 1.1 2.3-2.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Embassy legalisation',
    description: 'Embassy and consulate authentication services.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 2 3 7v2h18V7l-9-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3 21h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Notary services',
    description: 'Certified notary verification and witnessing.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9.5 12.5 7 22l5-3 5 3-2.5-9.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="m9.7 8 1.6 1.6L14.3 6.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Translation services',
    description: 'Professional certified translations.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M4 5h9M8.5 3v2M11 5c-.6 3-2 5.4-4.5 7M6.8 8.8c1 1.3 2.6 2.4 4.7 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m14 21 3.5-8L21 21M15 18.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Corporate documents',
    description: 'Business certificates and commercial legalisation.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M3 21V9l7-4v16M14 21V4l7 3v14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M6.5 9h1M6.5 12h1M6.5 15h1M17 9h1M17 12h1M17 15h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9.5 21v-4h1.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Educational documents',
    description: 'Degree, diploma and academic certificate apostille.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 4 2 9l10 5 10-5-10-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M6 11.5V17c0 1.4 2.7 3 6 3s6-1.6 6-3v-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 9v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const HomeOurServicesSection = () => {
  return (
    <section style={{ background: 'var(--background)' }} className="py-8 lg:py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
          className="max-w-2xl mb-16"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 mb-5"
          >
            <span className="w-6 h-px" style={{ background: 'var(--secondary)' }} />
            <span
              className="text-xs font-semibold tracking-[0.14em] uppercase"
              style={{ color: 'var(--secondary-hover)' }}
            >
              Our services
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl lg:text-[2.75rem] leading-[1.15] font-semibold mb-4"
            style={{ fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}
          >
            Professional apostille and legalisation services
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Every service is handled by verified officers and tracked from upload to delivery,
            whatever kind of document you're legalising.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative p-7 rounded-2xl cursor-pointer"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300"
                style={{ background: 'var(--background)', color: 'var(--primary)' }}
              >
                {service.icon}
              </div>

              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}
              >
                {service.title}
              </h3>

              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
                {service.description}
              </p>

              <div
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group-hover:gap-2.5"
                style={{ color: 'var(--primary)' }}
              >
                Explore service
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div
                className="absolute top-0 right-0 w-14 h-14 rounded-tr-2xl rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'var(--gradient-gold)', maskImage: 'radial-gradient(circle at top right, black, transparent 70%)' }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeOurServicesSection;