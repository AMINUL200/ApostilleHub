import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Shield,
  Clock,
  Globe,
  UploadCloud,
  PackageCheck,
  CreditCard,
  Sparkles,
  Search,
  MessageCircle,
  FileCheck,
  Building2,
  GraduationCap,
  Users,
  Headphones,
  Award,
  CheckCircle2
} from 'lucide-react';

const faqs = [
  {
    id: 1,
    category: 'General',
    icon: HelpCircle,
    question: 'What is an Apostille?',
    answer: 'An Apostille is a certificate issued by a designated authority that authenticates the origin of a public document for use in another country. It certifies the authenticity of the signature, seal, or stamp on the document, making it valid for legal purposes in all countries that are part of the Hague Apostille Convention.',
    features: ['International recognition', 'Legal validity', 'Standardized format'],
  },
  {
    id: 2,
    category: 'Timeline',
    icon: Clock,
    question: 'How long does processing take?',
    answer: 'Processing times vary based on the service you choose. Standard processing typically takes 5-7 business days, Express processing takes 2-3 business days, and Same Day Priority services can be completed within 24 hours. Delivery times depend on your location and chosen shipping method.',
    features: ['Standard: 5-7 days', 'Express: 2-3 days', 'Same Day: 24 hours'],
  },
  {
    id: 3,
    category: 'Global Coverage',
    icon: Globe,
    question: 'Which countries accept Apostille?',
    answer: 'Over 120 countries are part of the Hague Apostille Convention, including the United Kingdom, United States, Canada, Australia, Germany, France, Spain, Italy, Japan, and many more. For non-Hague countries, we provide embassy legalisation services to ensure your documents are recognised worldwide.',
    features: ['120+ countries', 'Hague Convention', 'Embassy legalisation'],
  },
  {
    id: 4,
    category: 'Document Upload',
    icon: UploadCloud,
    question: 'Can I upload documents online?',
    answer: 'Yes! Our secure online portal allows you to upload documents directly from your computer or mobile device. Simply create an account, select your service, and upload high-quality scans of your documents. Our system supports multiple file formats including PDF, JPG, PNG, and more.',
    features: ['Secure upload', 'All file formats', 'Mobile friendly'],
  },
  {
    id: 5,
    category: 'Order Tracking',
    icon: PackageCheck,
    question: 'How can I track my order?',
    answer: 'Every order comes with a unique tracking number. You can log into your customer portal at any time to see real-time updates on your document\'s status. We also send email notifications at key milestones including document receipt, verification, processing, completion, and dispatch.',
    features: ['Real-time tracking', 'Email alerts', 'Status updates'],
  },
  {
    id: 6,
    category: 'Payments',
    icon: CreditCard,
    question: 'What payment methods do you accept?',
    answer: 'We accept a variety of payment methods including all major credit/debit cards (Visa, Mastercard, American Express), PayPal, bank transfers, and WorldPay. All payments are processed through secure, encrypted gateways to ensure your financial information is protected.',
    features: ['Credit/Debit cards', 'PayPal', 'Bank transfers', 'WorldPay'],
  },
  {
    id: 7,
    category: 'Document Types',
    icon: FileCheck,
    question: 'What documents can be apostilled?',
    answer: 'We apostille a wide range of documents including birth certificates, marriage certificates, death certificates, educational diplomas, degrees, transcripts, power of attorney, company incorporation documents, court orders, and many more. If you\'re unsure about your document, contact our team for guidance.',
    features: ['Personal documents', 'Educational certificates', 'Corporate papers'],
  },
  {
    id: 8,
    category: 'Corporate',
    icon: Building2,
    question: 'Do you offer corporate accounts?',
    answer: 'Yes! We provide dedicated corporate accounts for businesses with regular document legalisation needs. Benefits include volume pricing, dedicated account managers, priority processing, consolidated invoicing, and custom reporting. Contact our sales team to set up your corporate account today.',
    features: ['Volume discounts', 'Dedicated manager', 'Custom invoicing'],
  },
];

// Category filter options
const categories = ['All', 'General', 'Timeline', 'Global Coverage', 'Document Upload', 'Order Tracking', 'Payments', 'Document Types', 'Corporate'];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const HomeFAQSection = () => {
  const [activeId, setActiveId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter FAQs based on category and search
  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  // Helper function to render icon
  const getCategoryIcon = (category) => {
    const icons = {
      'General': HelpCircle,
      'Timeline': Clock,
      'Global Coverage': Globe,
      'Document Upload': UploadCloud,
      'Order Tracking': PackageCheck,
      'Payments': CreditCard,
      'Document Types': FileCheck,
      'Corporate': Building2,
    };
    return icons[category] || HelpCircle;
  };

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: '#F8FAFC' }}>
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0F4C81]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#0F4C81]/5 to-[#D4AF37]/5 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #0F4C81 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
              <HelpCircle className="w-4 h-4" style={{ color: '#D4AF37' }} />
              <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: '#D4AF37' }}>
                FAQ
              </span>
            </div>
            <div className="h-px w-8" style={{ background: 'linear-gradient(270deg, transparent, #D4AF37)' }} />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 tracking-tight"
            style={{ fontFamily: "'Fraunces', serif", color: '#0F172A' }}
          >
            Frequently Asked{' '}
            <span className="relative inline-block">
              <span className="relative z-10" style={{ color: '#0F4C81' }}>Questions</span>
              <span className="absolute bottom-1 left-0 w-full h-3 -z-10" style={{ background: 'rgba(212, 175, 55, 0.2)' }} />
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-lg lg:text-xl leading-relaxed" style={{ color: '#64748B' }}>
            Find answers to the most common questions about our apostille and document legalisation services.
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm focus:outline-none focus:ring-2 transition-all duration-300"
              style={{
                background: 'white',
                border: '1px solid #E2E8F0',
                color: '#0F172A',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              }}
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'text-white'
                  : 'text-gray-600 hover:text-[#0F4C81]'
              }`}
              style={{
                background: activeCategory === category
                  ? 'linear-gradient(135deg, #0F4C81, #1E6BB8)'
                  : 'white',
                border: activeCategory === category
                  ? 'none'
                  : '1px solid #E2E8F0',
                boxShadow: activeCategory === category
                  ? '0 4px 15px rgba(15, 76, 129, 0.3)'
                  : 'none',
              }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
          className="space-y-4"
        >
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No results found. Try a different search term.</p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const Icon = faq.icon;
              const isActive = activeId === faq.id;

              return (
                <motion.div
                  key={faq.id}
                  variants={fadeUp}
                  className="group"
                >
                  <div
                    className="rounded-2xl transition-all duration-300 cursor-pointer"
                    style={{
                      background: 'white',
                      border: `1px solid ${isActive ? '#D4AF37' : '#E2E8F0'}`,
                      boxShadow: isActive
                        ? '0 8px 30px rgba(212, 175, 55, 0.12)'
                        : '0 4px 20px rgba(0,0,0,0.04)',
                    }}
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    {/* Question */}
                    <div className="flex items-center gap-4 p-6">
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                        style={{
                          background: isActive ? 'rgba(212, 175, 55, 0.1)' : 'rgba(15, 76, 129, 0.05)',
                          border: `1px solid ${isActive ? 'rgba(212, 175, 55, 0.2)' : 'rgba(15, 76, 129, 0.1)'}`,
                        }}
                      >
                        <Icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-[#D4AF37]' : 'text-[#0F4C81]'}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className="text-xs font-medium px-2 py-0.5 rounded-full"
                            style={{
                              background: 'rgba(15, 76, 129, 0.05)',
                              color: '#0F4C81',
                            }}
                          >
                            {faq.category}
                          </span>
                        </div>
                        <h3
                          className={`text-lg font-semibold transition-colors duration-300 ${
                            isActive ? 'text-[#0F4C81]' : 'text-gray-800'
                          }`}
                        >
                          {faq.question}
                        </h3>
                      </div>
                      
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isActive ? 'rotate-180' : ''
                        }`}
                        style={{
                          background: isActive ? 'rgba(212, 175, 55, 0.1)' : 'rgba(15, 76, 129, 0.05)',
                        }}
                      >
                        <ChevronDown
                          className={`w-5 h-5 transition-all duration-300 ${
                            isActive ? 'text-[#D4AF37]' : 'text-gray-400'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Answer */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2 border-t" style={{ borderColor: '#F1F5F9' }}>
                            <p className="text-base leading-relaxed mb-4" style={{ color: '#64748B' }}>
                              {faq.answer}
                            </p>
                            
                            {/* Features/Tags */}
                            {faq.features && (
                              <div className="flex flex-wrap gap-2">
                                {faq.features.map((feature, index) => (
                                  <span
                                    key={index}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                                    style={{
                                      background: 'rgba(15, 76, 129, 0.05)',
                                      color: '#0F4C81',
                                      border: '1px solid rgba(15, 76, 129, 0.08)',
                                    }}
                                  >
                                    <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Related Articles (optional) */}
                            <div className="mt-4 pt-4 border-t" style={{ borderColor: '#F1F5F9' }}>
                              <div className="flex items-center gap-2 text-sm">
                                <span style={{ color: '#94A3B8' }}>Was this helpful?</span>
                                <button className="px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-50 transition-colors" style={{ color: '#0F4C81' }}>
                                  Yes
                                </button>
                                <button className="px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-50 transition-colors" style={{ color: '#94A3B8' }}>
                                  No
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>

        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div
            className="relative rounded-3xl p-10 lg:p-12 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #0F4C81, #0B3D68)',
              boxShadow: '0 20px 60px rgba(15, 76, 129, 0.25)',
            }}
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-2xl" />

            <div className="relative">
              <div className="flex justify-center gap-3 mb-4">
                <Headphones className="w-8 h-8 text-[#D4AF37]" />
                <MessageCircle className="w-8 h-8 text-[#D4AF37]" />
              </div>

              <h3
                className="text-2xl lg:text-3xl font-bold text-white mb-3"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Still Have Questions?
              </h3>
              
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                Our support team is here to help you with any additional questions about our services.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  className="group px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                    color: '#0B1220',
                    boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)',
                  }}
                >
                  <span className="flex items-center gap-2">
                    Contact Support
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
                
                
              </div>

              {/* Quick Contact Info */}
              <div className="flex flex-wrap justify-center gap-6 mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Award className="w-4 h-4 text-[#D4AF37]" />
                  <span>100% Satisfaction Guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Users className="w-4 h-4 text-[#D4AF37]" />
                  <span>10,000+ Happy Clients</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeFAQSection;