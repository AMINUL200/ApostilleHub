import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Headset, ArrowRight } from 'lucide-react';

const faqs = [
  {
    question: 'What is an apostille, and when do I need one?',
    answer:
      'An apostille is a certificate that verifies a document\u2019s origin for use in another country that\u2019s part of the Hague Convention. You typically need one for documents like birth certificates, degrees, or business papers being used abroad.',
  },
  {
    question: 'How long does apostille processing take?',
    answer:
      'Standard processing usually takes 3\u20135 working days. Express and priority options are available if you need your documents back faster \u2014 turnaround times are confirmed before you pay.',
  },
  {
    question: 'Which countries accept apostilled documents?',
    answer:
      'Any country that\u2019s a member of the 1961 Hague Apostille Convention will accept an apostille. For non-member countries, documents usually need full embassy legalisation instead \u2014 we\u2019ll tell you which applies when you select a destination.',
  },
  {
    question: 'Can I apostille a photocopy of my document?',
    answer:
      'It depends on the document type. Some documents can be apostilled from a certified copy, while others \u2014 like birth or marriage certificates \u2014 usually need the original or a notarised copy. We\u2019ll flag this during document review.',
  },
  {
    question: 'What\u2019s the difference between apostille and legalisation?',
    answer:
      'An apostille is a single-stamp certification recognised by Hague Convention countries. Legalisation is a longer process \u2014 usually involving notarisation and embassy authentication \u2014 required for countries outside the Convention.',
  },
  {
    question: 'How do I track my order once it\u2019s submitted?',
    answer:
      'Every order gets a live status tracker in your account, updated as your documents move through review, processing, and dispatch \u2014 the same stages shown on your order confirmation.',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const AccordionItem = ({ faq, isOpen, onToggle }) => (
  <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
    >
      <span
        className="text-[15px] font-semibold"
        style={{ fontFamily: "'Fraunces', serif", color: isOpen ? 'var(--primary)' : 'var(--text-primary)' }}
      >
        {faq.question}
      </span>
      <span
        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300"
        style={{
          background: isOpen ? 'var(--primary)' : 'var(--background)',
          color: isOpen ? '#fff' : 'var(--primary)',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
        }}
      >
        <Plus size={16} strokeWidth={2.5} />
      </span>
    </button>

    <div
      className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
    >
      <div className="overflow-hidden">
        <p className="px-6 pb-6 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {faq.answer}
        </p>
      </div>
    </div>
  </div>
);

const BlogFAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section style={{ background: 'var(--surface)' }} className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-14 lg:gap-16">
          {/* Left — sticky intro + CTA */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-5">
              <span className="w-6 h-px" style={{ background: 'var(--secondary)' }} />
              <span className="text-xs font-semibold tracking-[0.14em] uppercase" style={{ color: 'var(--secondary-hover)' }}>
                FAQ
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-4xl lg:text-[2.75rem] leading-[1.15] font-semibold mb-5"
              style={{ fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}
            >
              Common questions from our readers
            </motion.h2>

            <motion.p variants={fadeUp} className="text-lg leading-relaxed mb-10 max-w-md" style={{ color: 'var(--text-secondary)' }}>
              The questions we see most often across our apostille and legalisation guides —
              answered in plain language.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="rounded-2xl p-6 flex items-start gap-4"
              style={{ background: 'var(--dark)' }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--gradient-gold)' }}
              >
                <Headset size={18} strokeWidth={1.75} style={{ color: 'var(--dark)' }} />
              </div>
              <div>
                <p className="text-sm font-semibold mb-1" style={{ color: '#F8FAFC' }}>
                  Still have questions?
                </p>
                <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-light)' }}>
                  Our support team can walk you through your specific case.
                </p>
                <button
                  className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-300 hover:gap-2.5"
                  style={{ color: 'var(--secondary)' }}
                >
                  Contact support
                  <ArrowRight size={13} strokeWidth={2} />
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — accordion */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={container}
            className="space-y-4"
          >
            {faqs.map((faq, i) => (
              <motion.div key={faq.question} variants={fadeUp}>
                <AccordionItem
                  faq={faq}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlogFAQSection;