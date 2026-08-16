import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, SearchCheck, Stamp, ClipboardCheck, Truck, ChevronDown } from 'lucide-react';

const steps = [
  {
    icon: UploadCloud,
    title: 'Document submission',
    description: 'Upload your documents securely through our encrypted portal.',
  },
  {
    icon: SearchCheck,
    title: 'Verification',
    description: 'Our team checks every document for accuracy and completeness.',
  },
  {
    icon: Stamp,
    title: 'Apostille processing',
    description: 'A certified officer processes and stamps your documents.',
  },
  {
    icon: ClipboardCheck,
    title: 'Quality review',
    description: 'A final check confirms everything meets destination requirements.',
  },
  {
    icon: Truck,
    title: 'Dispatch & delivery',
    description: 'Documents are securely dispatched and tracked to your door.',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const node = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const lineGrowV = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 } },
};

const chevron = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

const StepCard = ({ step, align }) => {
  const Icon = step.icon;
  return (
    <div className={`rounded-2xl p-6 ${align === 'right' ? 'text-left' : 'lg:text-right'}`} style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
      <div className={`flex items-center gap-3 mb-2.5 ${align === 'left' ? 'lg:flex-row-reverse' : ''}`}>
        <div
          className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'var(--background)', color: 'var(--primary)' }}
        >
          <Icon size={18} strokeWidth={1.75} />
        </div>
        <h3 className="text-lg font-semibold" style={{ fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}>
          {step.title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {step.description}
      </p>
    </div>
  );
};

const ProcessTimeline = () => {
  return (
    <section style={{ background: 'var(--background)' }} className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
          className="max-w-2xl mx-auto text-center mb-20"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-5 justify-center">
            <span className="w-6 h-px" style={{ background: 'var(--secondary)' }} />
            <span className="text-xs font-semibold tracking-[0.14em] uppercase" style={{ color: 'var(--secondary-hover)' }}>
              Our process
            </span>
            <span className="w-6 h-px" style={{ background: 'var(--secondary)' }} />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl lg:text-[2.75rem] leading-[1.15] font-semibold mb-4"
            style={{ fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}
          >
            From upload to delivery
          </motion.h2>

          <motion.p variants={fadeUp} className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Every document follows the same five-stage path, checked at each point along the way.
          </motion.p>
        </motion.div>

        {/* Desktop zigzag timeline */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
          className="hidden lg:block relative"
        >
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2" style={{ width: 2, background: 'var(--border)' }} />
          <motion.div
            variants={lineGrowV}
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
            style={{ width: 2, background: 'var(--gradient-gold)', transformOrigin: 'top' }}
          />

          <div className="relative flex flex-col">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              const Icon = step.icon;
              return (
                <React.Fragment key={step.title}>
                  <motion.div variants={fadeUp} className="grid grid-cols-[1fr_auto_1fr] items-center gap-8 py-2">
                    <div>{isLeft && <StepCard step={step} align="left" />}</div>

                    <motion.div
                      variants={node}
                      className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: 'var(--surface)', border: '2px solid var(--primary)', boxShadow: 'var(--shadow-md)' }}
                    >
                      <Icon size={24} strokeWidth={1.75} style={{ color: 'var(--primary)' }} />
                      <span
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold"
                        style={{ background: 'var(--gradient-gold)', color: 'var(--dark)' }}
                      >
                        {i + 1}
                      </span>
                    </motion.div>

                    <div>{!isLeft && <StepCard step={step} align="right" />}</div>
                  </motion.div>

                  {i < steps.length - 1 && (
                    <motion.div variants={chevron} className="grid grid-cols-[1fr_auto_1fr]">
                      <div />
                      <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex justify-center py-1"
                      >
                        <ChevronDown size={18} strokeWidth={2} style={{ color: 'var(--secondary)' }} />
                      </motion.div>
                      <div />
                    </motion.div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </motion.div>

        {/* Mobile / tablet stacked timeline */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
          className="lg:hidden relative pl-6"
        >
          <div className="absolute left-[23px] top-2 bottom-2" style={{ width: 2, background: 'var(--border)' }} />
          <motion.div
            variants={lineGrowV}
            className="absolute left-[23px] top-2 bottom-2"
            style={{ width: 2, background: 'var(--gradient-gold)', transformOrigin: 'top' }}
          />

          <div className="relative flex flex-col gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={step.title}>
                  <motion.div variants={fadeUp} className="relative flex gap-5">
                    <motion.div
                      variants={node}
                      className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center -ml-6"
                      style={{ background: 'var(--surface)', border: '2px solid var(--primary)', boxShadow: 'var(--shadow-sm)' }}
                    >
                      <Icon size={18} strokeWidth={1.75} style={{ color: 'var(--primary)' }} />
                      <span
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                        style={{ background: 'var(--gradient-gold)', color: 'var(--dark)' }}
                      >
                        {i + 1}
                      </span>
                    </motion.div>

                    <div className="pt-1.5 flex-1">
                      <h3 className="text-base font-semibold mb-1.5" style={{ fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}>
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {step.description}
                      </p>
                    </div>
                  </motion.div>

                  {i < steps.length - 1 && (
                    <motion.div
                      variants={chevron}
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative z-10 -ml-6 w-12 flex justify-center"
                    >
                      <ChevronDown size={16} strokeWidth={2} style={{ color: 'var(--secondary)' }} />
                    </motion.div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessTimeline;