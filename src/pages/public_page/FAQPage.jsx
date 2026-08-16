import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Search,
  Plus,
  HelpCircle,
  CreditCard,
  Truck,
  FileCheck2,
  ShieldCheck,
  Headset,
  ArrowRight,
} from 'lucide-react';

const faqs = [
  { category: 'General', question: 'What is an apostille?', answer: 'An apostille is a certificate that verifies a document\u2019s origin for use in another Hague Convention country \u2014 confirming the signature, seal, or stamp on it is genuine.' },
  { category: 'General', question: 'Do I need to visit an office in person?', answer: 'No. Every order is handled entirely online \u2014 you upload your documents, and we return the apostilled originals by post or courier.' },
  { category: 'General', question: 'Which countries do you support?', answer: 'We process apostille and legalisation requests for over 150 countries, covering both Hague Convention members and non-member destinations that require embassy legalisation.' },
  { category: 'Pricing & Payment', question: 'How much does apostille cost?', answer: 'Pricing starts from \u00a339 per document for standard processing, with express and priority options available. Your exact total is shown before you pay.' },
  { category: 'Pricing & Payment', question: 'Is VAT included in the price?', answer: 'Yes, for UK orders VAT is included in the price shown at checkout. VAT-registered business clients outside the UK may qualify for reverse-charge treatment.' },
  { category: 'Pricing & Payment', question: 'What payment methods do you accept?', answer: 'We accept all major debit and credit cards, PayPal, and bank transfer for business accounts.' },
  { category: 'Pricing & Payment', question: 'Can I get a refund if I cancel my order?', answer: 'Orders can be cancelled for a full refund before document review begins. Once processing has started, a partial refund may apply \u2014 our support team can confirm your specific case.' },
  { category: 'Processing & Delivery', question: 'How long does processing take?', answer: 'Standard processing takes 3\u20135 working days. Express (24\u201348 hours) and Priority (same working day) options are available at checkout.' },
  { category: 'Processing & Delivery', question: 'Can I upgrade to express after placing an order?', answer: 'Yes, as long as document review hasn\u2019t already started. Contact support with your order number and we\u2019ll upgrade it where possible.' },
  { category: 'Processing & Delivery', question: 'How do I track my order?', answer: 'Every order includes a live status tracker in your account, updated as your documents move through review, processing, and dispatch.' },
  { category: 'Processing & Delivery', question: 'What if my documents are rejected during review?', answer: 'We\u2019ll contact you immediately with the reason and next steps \u2014 most issues can be resolved without restarting the order.' },
  { category: 'Documents & Eligibility', question: 'Which documents can be apostilled?', answer: 'Common examples include birth and marriage certificates, degrees and transcripts, police clearances, business certificates, and powers of attorney.' },
  { category: 'Documents & Eligibility', question: 'Can I submit a photocopy instead of the original?', answer: 'It depends on the document type. Some can be apostilled from a certified copy, while others \u2014 like birth or marriage certificates \u2014 usually require the original.' },
  { category: 'Documents & Eligibility', question: 'What if my document is not in English?', answer: 'We offer certified translation as an add-on service, and can apostille the translated document alongside the original where required.' },
  { category: 'Account & Security', question: 'Is my data secure?', answer: 'All uploads are encrypted with 256-bit encryption, both in transit and at rest, and access to your documents is limited to your assigned case officer.' },
  { category: 'Account & Security', question: 'Do I need to create an account to place an order?', answer: 'Yes \u2014 an account lets you track your order, message support, and download invoices and completed documents securely.' },
  { category: 'Account & Security', question: 'How do I download my invoice?', answer: 'VAT invoices are generated automatically for every order and can be downloaded from the Orders section of your account at any time.' },
];

const categoryMeta = [
  { name: 'All', icon: HelpCircle },
  { name: 'General', icon: HelpCircle },
  { name: 'Pricing & Payment', icon: CreditCard },
  { name: 'Processing & Delivery', icon: Truck },
  { name: 'Documents & Eligibility', icon: FileCheck2 },
  { name: 'Account & Security', icon: ShieldCheck },
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
    <button onClick={onToggle} className="w-full flex items-center justify-between gap-4 text-left px-6 py-5">
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

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [openIds, setOpenIds] = useState(() => new Set());

  const toggleOpen = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((f) => {
      const matchesCategory = activeCategory === 'All' || f.category === activeCategory;
      const matchesQuery = !q || f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const groupedByCategory = useMemo(() => {
    if (activeCategory !== 'All') return [{ category: activeCategory, items: filtered }];
    const order = categoryMeta.slice(1).map((c) => c.name);
    return order
      .map((cat) => ({ category: cat, items: filtered.filter((f) => f.category === cat) }))
      .filter((g) => g.items.length > 0);
  }, [filtered, activeCategory]);

  const countFor = (name) => (name === 'All' ? faqs.length : faqs.filter((f) => f.category === name).length);

  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden" style={{ background: 'var(--background)' }}>
        <p
          aria-hidden="true"
          className="absolute select-none pointer-events-none whitespace-nowrap font-semibold"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 'clamp(6rem, 16vw, 14rem)',
            color: 'var(--primary)',
            opacity: 0.045,
            top: '-4%',
            left: '-2%',
            lineHeight: 1,
          }}
        >
          FAQ
        </p>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-14 pb-16 lg:pt-20 lg:pb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1.5 text-sm mb-10"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span className="hover:underline cursor-pointer">Home</span>
            <ChevronRight size={14} strokeWidth={2} style={{ color: 'var(--text-light)' }} />
            <span style={{ color: 'var(--primary)' }} className="font-medium">FAQ</span>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={container} className="max-w-2xl mx-auto text-center">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-5 justify-center">
              <span className="w-6 h-px" style={{ background: 'var(--secondary)' }} />
              <span className="text-xs font-semibold tracking-[0.14em] uppercase" style={{ color: 'var(--secondary-hover)' }}>
                FAQ
              </span>
              <span className="w-6 h-px" style={{ background: 'var(--secondary)' }} />
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-4xl lg:text-[2.75rem] leading-[1.15] font-semibold mb-4"
              style={{ fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}
            >
              Frequently asked questions
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg leading-relaxed mb-9" style={{ color: 'var(--text-secondary)' }}>
              Answers to the questions we hear most, organised by topic.
            </motion.p>

            <motion.div variants={fadeUp} className="relative max-w-md mx-auto">
              <div
                className="flex items-center gap-3 rounded-full pl-5 pr-2 py-2"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <Search size={17} strokeWidth={2} style={{ color: 'var(--text-light)' }} className="flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search questions..."
                  className="flex-1 bg-transparent border-none outline-none text-sm py-2"
                  style={{ color: 'var(--text-primary)' }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Filters + accordion */}
      <section style={{ background: 'var(--background)' }} className="pb-20 lg:pb-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-4">
            {categoryMeta.map((cat) => {
              const isActive = activeCategory === cat.name;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                  style={
                    isActive
                      ? { background: 'var(--primary)', color: '#fff', boxShadow: 'var(--shadow-sm)' }
                      : { background: 'var(--surface)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }
                  }
                >
                  <Icon size={14} strokeWidth={2} />
                  {cat.name}
                  <span
                    className="text-[11px] px-1.5 py-0.5 rounded-full"
                    style={
                      isActive
                        ? { background: 'rgba(255,255,255,0.2)' }
                        : { background: 'var(--background)', color: 'var(--text-light)' }
                    }
                  >
                    {countFor(cat.name)}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-center text-sm mb-10" style={{ color: 'var(--text-light)' }}>
            {filtered.length} question{filtered.length !== 1 ? 's' : ''} found
          </p>

          {/* Grouped accordion */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + query}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
              variants={container}
              className="flex flex-col gap-10"
            >
              {groupedByCategory.map((group) => (
                <div key={group.category}>
                  {activeCategory === 'All' && (
                    <motion.h2
                      variants={fadeUp}
                      className="text-sm font-semibold uppercase tracking-wide mb-4"
                      style={{ color: 'var(--secondary-hover)' }}
                    >
                      {group.category}
                    </motion.h2>
                  )}
                  <div className="flex flex-col gap-4">
                    {group.items.map((faq) => {
                      const id = `${faq.category}-${faq.question}`;
                      return (
                        <motion.div key={id} variants={fadeUp}>
                          <AccordionItem faq={faq} isOpen={openIds.has(id)} onToggle={() => toggleOpen(id)} />
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <motion.div variants={fadeUp} className="text-center py-16">
                  <p className="text-lg font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                    No questions found
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Try a different search term or category.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Contact CTA */}
      <section style={{ background: 'var(--dark)' }} className="py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: 'var(--gradient-gold)' }}
          >
            <Headset size={22} strokeWidth={1.75} style={{ color: 'var(--dark)' }} />
          </div>
          <h3 className="text-2xl font-semibold mb-2" style={{ fontFamily: "'Fraunces', serif", color: '#F8FAFC' }}>
            Still have a question?
          </h3>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-light)' }}>
            Our support team can help with anything specific to your order.
          </p>
          <button className="btn-gold mx-auto">
            Contact support
            <ArrowRight size={16} strokeWidth={2} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;