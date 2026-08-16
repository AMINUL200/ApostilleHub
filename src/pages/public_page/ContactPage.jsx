import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  X,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

const officeInfo = [
  { icon: MapPin, label: 'Head office', value: '24 Chancery Lane, London, WC2A 1AA, United Kingdom' },
  { icon: Phone, label: 'Phone', value: '+44 20 7946 0958' },
  { icon: Mail, label: 'Email', value: 'support@apostilleplatform.com' },
  { icon: Clock, label: 'Working hours', value: 'Mon\u2013Fri, 9:00 AM\u20136:00 PM GMT' },
];

const services = [
  'General enquiry',
  'Apostille services',
  'Embassy legalisation',
  'Notary services',
  'Translation services',
  'Order support',
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const inputStyle = {
  background: 'var(--background)',
  border: '1px solid var(--border)',
  color: 'var(--text-primary)',
};

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: services[0], message: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    // Replace with a real API call
    setTimeout(() => setStatus('success'), 900);
  };

  return (
    <div>
      {/* Page header */}
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
          Contact
        </p>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-14 pb-16 lg:pt-20 lg:pb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1.5 text-sm mb-10"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span className="hover:underline cursor-pointer">Home</span>
            <ChevronRight size={14} strokeWidth={2} style={{ color: 'var(--text-light)' }} />
            <span style={{ color: 'var(--primary)' }} className="font-medium">
              Contact
            </span>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={container} className="max-w-2xl">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-5">
              <span className="w-6 h-px" style={{ background: 'var(--secondary)' }} />
              <span className="text-xs font-semibold tracking-[0.14em] uppercase" style={{ color: 'var(--secondary-hover)' }}>
                Get in touch
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-4xl lg:text-[2.75rem] leading-[1.15] font-semibold mb-4"
              style={{ fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}
            >
              We're here to help with your documents
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Questions about an order, pricing, or which service you need? Reach us however
              suits you best.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Form + office info + map */}
      <section style={{ background: 'var(--background)' }} className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-10">
          {/* Contact form */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
            className="rounded-3xl p-8 lg:p-10"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center text-center py-14"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                    style={{ background: 'var(--gradient-gold)' }}
                  >
                    <CheckCircle2 size={28} strokeWidth={1.75} style={{ color: 'var(--dark)' }} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}>
                    Message sent
                  </h3>
                  <p className="text-sm leading-relaxed max-w-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                    Thanks for reaching out \u2014 our team will get back to you within one working day.
                  </p>
                  <button
                    onClick={() => {
                      setForm({ name: '', email: '', phone: '', service: services[0], message: '' });
                      setStatus('idle');
                    }}
                    className="btn-outline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <motion.h2
                    variants={fadeUp}
                    className="text-2xl font-semibold mb-1.5"
                    style={{ fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}
                  >
                    Send us a message
                  </motion.h2>
                  <motion.p variants={fadeUp} className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
                    Fill in the form and we'll respond as soon as we can.
                  </motion.p>

                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <motion.div variants={fadeUp}>
                      <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-secondary)' }}>
                        Full name
                      </label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Doe"
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-[color:var(--primary)]"
                        style={inputStyle}
                      />
                    </motion.div>
                    <motion.div variants={fadeUp}>
                      <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-secondary)' }}>
                        Email
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@email.com"
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-[color:var(--primary)]"
                        style={inputStyle}
                      />
                    </motion.div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <motion.div variants={fadeUp}>
                      <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-secondary)' }}>
                        Phone (optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+44 7000 000000"
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-[color:var(--primary)]"
                        style={inputStyle}
                      />
                    </motion.div>
                    <motion.div variants={fadeUp}>
                      <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-secondary)' }}>
                        Subject
                      </label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-[color:var(--primary)]"
                        style={inputStyle}
                      >
                        {services.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </motion.div>
                  </div>

                  <motion.div variants={fadeUp} className="mb-7">
                    <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-secondary)' }}>
                      Message
                    </label>
                    <textarea
                      required
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us a little about what you need..."
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none transition-colors duration-200 focus:border-[color:var(--primary)]"
                      style={inputStyle}
                    />
                  </motion.div>

                  <motion.button
                    variants={fadeUp}
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-gold w-full sm:w-auto disabled:opacity-60"
                  >
                    {status === 'submitting' ? 'Sending...' : (
                      <>
                        Send message
                        <Send size={16} strokeWidth={2} />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Office info + map */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
            className="flex flex-col gap-6"
          >
            <motion.div
              variants={fadeUp}
              className="rounded-3xl p-7"
              style={{ background: 'var(--dark)', boxShadow: 'var(--shadow-md)' }}
            >
              <h3 className="text-lg font-semibold mb-5" style={{ fontFamily: "'Fraunces', serif", color: '#F8FAFC' }}>
                Office information
              </h3>
              <div className="flex flex-col gap-5">
                {officeInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-3.5">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(212,175,55,0.12)', color: 'var(--secondary)' }}
                      >
                        <Icon size={16} strokeWidth={1.75} />
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-wide mb-0.5" style={{ color: 'var(--text-light)' }}>
                          {item.label}
                        </p>
                        <p className="text-sm" style={{ color: '#F8FAFC' }}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="rounded-3xl overflow-hidden flex-1"
              style={{ border: '1px solid var(--border)', minHeight: 280, boxShadow: 'var(--shadow-sm)' }}
            >
              <iframe
                title="Office location map"
                src="https://www.google.com/maps?q=24+Chancery+Lane,+London,+WC2A+1AA&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 280 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <ContactWidgets />
    </div>
  );
};

/* Floating Live Chat + WhatsApp widgets */
const ContactWidgets = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi there \uD83D\uDC4B How can we help with your documents today?' },
  ]);
  const [draft, setDraft] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isChatOpen]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setMessages((m) => [...m, { from: 'user', text: draft.trim() }]);
    setDraft('');
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { from: 'bot', text: 'Thanks for the message \u2014 a member of our support team will reply shortly.' },
      ]);
    }, 1000);
  };

  const whatsappNumber = '442079460958';
  const whatsappMessage = encodeURIComponent('Hi, I have a question about apostille services.');

  return (
    <>
      {/* Floating buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="w-[320px] sm:w-[350px] rounded-2xl overflow-hidden flex flex-col"
              style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)', height: 420 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4" style={{ background: 'var(--dark)' }}>
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: '#10B981' }} />
                  <p className="text-sm font-semibold" style={{ color: '#F8FAFC' }}>
                    Live support
                  </p>
                </div>
                <button onClick={() => setIsChatOpen(false)} aria-label="Close chat" style={{ color: 'var(--text-light)' }}>
                  <X size={18} strokeWidth={2} />
                </button>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ background: 'var(--background)' }}>
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
                    style={
                      m.from === 'bot'
                        ? { alignSelf: 'flex-start', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }
                        : { alignSelf: 'flex-end', background: 'var(--primary)', color: '#fff' }
                    }
                  >
                    {m.text}
                  </div>
                ))}
              </div>

              {/* Input */}
              <form onSubmit={sendMessage} className="flex items-center gap-2 p-3" style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 rounded-full px-4 py-2.5 text-sm outline-none"
                  style={{ background: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                />
                <button
                  type="submit"
                  aria-label="Send"
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--gradient-gold)', color: 'var(--dark)' }}
                >
                  <Send size={15} strokeWidth={2} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WhatsApp button */}
        <motion.a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          aria-label="Chat on WhatsApp"
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: '#25D366', boxShadow: '0 10px 25px rgba(37,211,102,0.4)' }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
            <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.45 1.27 4.9L2 22l5.25-1.38a9.96 9.96 0 0 0 4.79 1.22h.01c5.52 0 10-4.48 10-10s-4.48-10-10.01-10zm0 18.2h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.03-.2-.31a8.18 8.18 0 0 1-1.25-4.35c0-4.52 3.68-8.2 8.22-8.2 2.2 0 4.26.86 5.82 2.4a8.15 8.15 0 0 1 2.41 5.81c0 4.52-3.69 8.19-8.23 8.19zm4.5-6.14c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.24-.64.81-.78.97-.14.17-.29.19-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.24-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.5-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.24-.87.85-.87 2.06s.89 2.39 1.01 2.56c.13.16 1.75 2.68 4.25 3.75.59.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.11-.22-.17-.47-.29z" />
          </svg>
        </motion.a>

        {/* Live chat toggle button */}
        <motion.button
          onClick={() => setIsChatOpen((o) => !o)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          aria-label="Toggle live chat"
          className="w-14 h-14 rounded-full flex items-center justify-center relative"
          style={{ background: 'var(--gradient-gold)', boxShadow: '0 10px 25px rgba(212,175,55,0.4)' }}
        >
          <AnimatePresence mode="wait">
            {isChatOpen ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={22} strokeWidth={2} style={{ color: 'var(--dark)' }} />
              </motion.span>
            ) : (
              <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <MessageCircle size={22} strokeWidth={2} style={{ color: 'var(--dark)' }} />
              </motion.span>
            )}
          </AnimatePresence>
          {!isChatOpen && (
            <motion.span
              animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full"
              style={{ background: 'var(--secondary)' }}
            />
          )}
        </motion.button>
      </div>
    </>
  );
};

export default ContactPage;