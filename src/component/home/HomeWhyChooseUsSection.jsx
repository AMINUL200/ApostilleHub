import React from 'react';
import { motion } from 'framer-motion';
import { Award, Zap, Globe2, CloudUpload, Radar, Headset } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Expert apostille specialists',
    description: 'Verified officers who know the exact rules for every destination country.',
  },
  {
    icon: Zap,
    title: 'Fast processing options',
    description: 'Standard and express turnaround, so urgent documents never wait in line.',
  },
  {
    icon: Globe2,
    title: 'Worldwide coverage',
    description: 'Apostille and legalisation support across more than 60 countries.',
  },
  {
    icon: CloudUpload,
    title: 'Secure cloud upload',
    description: 'Documents are encrypted in transit and at rest, end to end.',
  },
  {
    icon: Radar,
    title: 'Real-time tracking',
    description: 'Follow every stage, from review to dispatch, right from your dashboard.',
  },
  {
    icon: Headset,
    title: 'Dedicated support team',
    description: 'A real person to talk to whenever a question comes up.',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const HomeWhyChooseUsSection = () => {
  return (
    <section style={{ background: 'var(--surface)' }} className="py-8 lg:py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        {/* Left — framed image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-2 lg:order-1"
        >
          {/* Offset gold frame behind the image */}
          <div
            className="absolute -top-5 -left-5 w-full h-full rounded-2xl"
            style={{ border: '2px solid var(--secondary)', opacity: 0.4 }}
          />

          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ boxShadow: 'var(--shadow-lg)' }}
          >
            <img
              src="https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800&h=600&fit=crop&crop=center"
              alt="Apostille specialists reviewing and verifying client documents"
              className="w-full h-[420px] lg:h-[480px] object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg, rgba(11,18,32,0) 55%, rgba(11,18,32,0.55) 100%)' }}
            />
          </div>

          {/* Floating stat badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-8 left-6 right-6 sm:left-8 sm:right-auto sm:w-64 rounded-xl p-5 flex items-center gap-4"
            style={{ background: 'var(--dark)', boxShadow: 'var(--shadow-lg)' }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--gradient-gold)' }}
            >
              <Award size={20} strokeWidth={1.75} style={{ color: 'var(--dark)' }} />
            </div>
            <div>
              <p className="text-xl font-semibold leading-none mb-1" style={{ fontFamily: "'Fraunces', serif", color: '#F8FAFC' }}>
                12,000+
              </p>
              <p className="text-xs" style={{ color: 'var(--text-light)' }}>
                Documents legalised to date
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right — content */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={container}
          className="order-1 lg:order-2 pt-8 lg:pt-0"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-5">
            <span className="w-6 h-px" style={{ background: 'var(--secondary)' }} />
            <span
              className="text-xs font-semibold tracking-[0.14em] uppercase"
              style={{ color: 'var(--secondary-hover)' }}
            >
              Why choose us
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl lg:text-[2.75rem] leading-[1.15] font-semibold mb-5"
            style={{ fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}
          >
            Precision, backed by people who do this every day
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg leading-relaxed mb-10 max-w-xl"
            style={{ color: 'var(--text-secondary)' }}
          >
            Behind every certificate is a specialist who checks the details, an encrypted
            upload that keeps your files safe, and a tracker that tells you exactly where
            things stand.
          </motion.p>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div key={feature.title} variants={fadeUp} className="flex gap-4">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--background)', color: 'var(--primary)' }}
                  >
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3
                      className="text-sm font-semibold mb-1"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeWhyChooseUsSection;