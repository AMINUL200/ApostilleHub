import React from 'react';
import { motion } from 'framer-motion';

const trustItems = [
  {
    label: 'Government accepted',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 2 3 7v2h18V7l-9-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3 21h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Secure document handling',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2.5 4 5.5v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10v-6L12 2.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="m8.5 12 2.4 2.5L15.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'GDPR compliant',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="10.5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="15" r="1.3" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Worldwide delivery',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.8 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.8-3.8-9S9.5 5.6 12 3Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const HomeTrustBarSection = () => {
  return (
    <section style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
      <div
        style={{ background: 'var(--gradient-gold)', height: 3 }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-y-8"
        >
          {trustItems.map((item, i) => (
            <motion.div
              key={item.label}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="flex items-center gap-3 px-4"
              style={
                i !== 0
                  ? { borderLeft: '1px solid var(--border)' }
                  : undefined
              }
            >
              <div
                className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: 'var(--background)', color: 'var(--primary)' }}
              >
                {item.icon}
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10" fill="var(--success)" />
                  <path d="m8 12.5 2.5 2.5L16 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span
                  className="text-sm font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeTrustBarSection;