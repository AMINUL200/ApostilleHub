import React from 'react';
import { motion } from 'framer-motion';
import {
  Baby,
  HeartHandshake,
  GraduationCap,
  ShieldCheck,
  Building2,
  FileSignature,
  BookUser,
  ScrollText,
  ArrowRight,
} from 'lucide-react';

const documents = [
  { icon: Baby, title: 'Birth certificate' },
  { icon: HeartHandshake, title: 'Marriage certificate' },
  { icon: GraduationCap, title: 'Degree certificate' },
  { icon: ShieldCheck, title: 'Police clearance' },
  { icon: Building2, title: 'Business certificate' },
  { icon: FileSignature, title: 'Power of attorney' },
  { icon: BookUser, title: 'Passport copy' },
  { icon: ScrollText, title: 'Academic transcript' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const HomePopularDocuments = () => {
  return (
    <section style={{ background: 'var(--background)' }} className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14"
        >
          <div className="max-w-xl">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-5">
              <span className="w-6 h-px" style={{ background: 'var(--secondary)' }} />
              <span
                className="text-xs font-semibold tracking-[0.14em] uppercase"
                style={{ color: 'var(--secondary-hover)' }}
              >
                Popular documents
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-4xl lg:text-[2.75rem] leading-[1.15] font-semibold mb-4"
              style={{ fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}
            >
              Popular documents we process
            </motion.h2>

            <motion.p variants={fadeUp} className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              From personal records to corporate paperwork, these are the documents we
              apostille and legalise most often.
            </motion.p>
          </div>

          <motion.a
            variants={fadeUp}
            href="#"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold flex-shrink-0 transition-all duration-300 hover:gap-2.5"
            style={{ color: 'var(--primary)' }}
          >
            View all document types
            <ArrowRight size={16} strokeWidth={2} />
          </motion.a>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {documents.map((doc) => {
            const Icon = doc.icon;
            return (
              <motion.div
                key={doc.title}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group relative rounded-xl p-6 pt-7 cursor-pointer overflow-hidden"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {/* Folded paper corner */}
                <div
                  className="absolute top-0 right-0"
                  style={{
                    width: 0,
                    height: 0,
                    borderStyle: 'solid',
                    borderWidth: '0 26px 26px 0',
                    borderColor: 'transparent var(--background) transparent transparent',
                  }}
                />
                <div
                  className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    width: 0,
                    height: 0,
                    borderStyle: 'solid',
                    borderWidth: '0 26px 26px 0',
                    borderColor: 'transparent rgba(212,175,55,0.18) transparent transparent',
                  }}
                />

                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                  style={{ background: 'var(--background)', color: 'var(--primary)' }}
                >
                  <Icon size={22} strokeWidth={1.75} />
                </div>

                <h3
                  className="text-[15px] font-semibold leading-snug"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {doc.title}
                </h3>

                {/* Reveals on hover, echoes a document footer rule */}
                <div
                  className="mt-4 pt-4 flex items-center gap-1.5 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ borderTop: '1px dashed var(--border)', color: 'var(--secondary-hover)' }}
                >
                  Get started
                  <ArrowRight size={13} strokeWidth={2} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.a
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          href="#"
          className="sm:hidden mt-10 inline-flex items-center gap-1.5 text-sm font-semibold"
          style={{ color: 'var(--primary)' }}
        >
          View all document types
          <ArrowRight size={16} strokeWidth={2} />
        </motion.a>
      </div>
    </section>
  );
};

export default HomePopularDocuments;