import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  Shield,
  Rocket,
  Zap,
  Crown,
  Globe,
  FileCheck,
  Users,
  Headphones,
  ArrowRight,
  Sparkles,
  Calendar,
  Briefcase,
  GraduationCap,
  Building2,
  Languages,
  Star,
  Info,
  ChevronRight
} from 'lucide-react';

const pricingPlans = [
  {
    id: 'standard',
    name: 'Standard Processing',
    icon: Clock,
    badge: 'Most Popular',
    description: 'Perfect for non-urgent document legalisation needs.',
    speed: '5-7 Business Days',
    price: {
      monthly: 99,
      yearly: 990,
    },
    features: [
      { text: 'Document verification', included: true },
      { text: 'Apostille certification', included: true },
      { text: 'Secure document storage', included: true },
      { text: 'Order tracking', included: true },
      { text: 'Email notifications', included: true },
      { text: 'Priority support', included: false },
      { text: 'Express courier delivery', included: false },
      { text: 'Document translation', included: false },
    ],
    gradient: 'from-blue-600 to-indigo-600',
    bgGradient: 'from-blue-50 to-indigo-50',
    color: '#0F4C81',
    popular: true,
  },
  {
    id: 'express',
    name: 'Express Processing',
    icon: Rocket,
    badge: 'Fast Track',
    description: 'Accelerated processing for time-sensitive documents.',
    speed: '2-3 Business Days',
    price: {
      monthly: 199,
      yearly: 1990,
    },
    features: [
      { text: 'Document verification', included: true },
      { text: 'Apostille certification', included: true },
      { text: 'Secure document storage', included: true },
      { text: 'Order tracking', included: true },
      { text: 'Email notifications', included: true },
      { text: 'Priority support', included: true },
      { text: 'Express courier delivery', included: true },
      { text: 'Document translation', included: false },
    ],
    gradient: 'from-amber-400 to-yellow-500',
    bgGradient: 'from-amber-50 to-yellow-50',
    color: '#D4AF37',
    popular: false,
  },
  {
    id: 'same-day',
    name: 'Same Day Priority',
    icon: Zap,
    badge: 'Emergency',
    description: 'Urgent document legalisation for critical deadlines.',
    speed: 'Same Day (24hrs)',
    price: {
      monthly: 399,
      yearly: 3990,
    },
    features: [
      { text: 'Document verification', included: true },
      { text: 'Apostille certification', included: true },
      { text: 'Secure document storage', included: true },
      { text: 'Order tracking', included: true },
      { text: 'Email notifications', included: true },
      { text: 'Priority support', included: true },
      { text: 'Express courier delivery', included: true },
      { text: 'Document translation', included: true },
    ],
    gradient: 'from-purple-500 to-pink-600',
    bgGradient: 'from-purple-50 to-pink-50',
    color: '#8B5CF6',
    popular: false,
  },
];

const documentTypes = [
  { icon: Briefcase, label: 'Corporate', count: 45 },
  { icon: GraduationCap, label: 'Educational', count: 38 },
  { icon: Building2, label: 'Commercial', count: 32 },
  { icon: Languages, label: 'Translation', count: 25 },
  { icon: Shield, label: 'Notary', count: 28 },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const HomePricingSection = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const [hoveredPlan, setHoveredPlan] = useState(null);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: '#F8FAFC' }}>
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0F4C81]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#0F4C81]/5 to-[#D4AF37]/5 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #0F4C81 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
          className="max-w-3xl mx-auto text-center mb-16 lg:mb-20"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
              <Sparkles className="w-4 h-4" style={{ color: '#D4AF37' }} />
              <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: '#D4AF37' }}>
                Pricing Plans
              </span>
            </div>
            <div className="h-px w-8" style={{ background: 'linear-gradient(270deg, transparent, #D4AF37)' }} />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 tracking-tight"
            style={{ fontFamily: "'Fraunces', serif", color: '#0F172A' }}
          >
            Simple, Transparent{' '}
            <span className="relative inline-block">
              <span className="relative z-10" style={{ color: '#0F4C81' }}>Pricing</span>
              <span className="absolute bottom-1 left-0 w-full h-3 -z-10" style={{ background: 'rgba(212, 175, 55, 0.2)' }} />
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-lg lg:text-xl leading-relaxed" style={{ color: '#64748B' }}>
            Choose the processing speed that fits your timeline. No hidden fees,
            guaranteed pricing, and expert service every step of the way.
          </motion.p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mb-12"
        >
          <div
            className="relative inline-flex p-1 rounded-2xl"
            style={{ background: 'rgba(15, 76, 129, 0.05)', border: '1px solid rgba(15, 76, 129, 0.1)' }}
          >
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'text-white'
                  : 'text-gray-600 hover:text-[#0F4C81]'
              }`}
              style={{
                background: billingCycle === 'monthly'
                  ? 'linear-gradient(135deg, #0F4C81, #1E6BB8)'
                  : 'transparent',
                boxShadow: billingCycle === 'monthly'
                  ? '0 4px 15px rgba(15, 76, 129, 0.3)'
                  : 'none',
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                billingCycle === 'yearly'
                  ? 'text-white'
                  : 'text-gray-600 hover:text-[#0F4C81]'
              }`}
              style={{
                background: billingCycle === 'yearly'
                  ? 'linear-gradient(135deg, #0F4C81, #1E6BB8)'
                  : 'transparent',
                boxShadow: billingCycle === 'yearly'
                  ? '0 4px 15px rgba(15, 76, 129, 0.3)'
                  : 'none',
              }}
            >
              Yearly
              <span className="ml-1.5 text-[10px] font-bold" style={{ color: billingCycle === 'yearly' ? '#D4AF37' : '#D4AF37' }}>
                Save 15%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
          className="grid md:grid-cols-3 gap-8"
        >
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;
            const isHovered = hoveredPlan === plan.id;
            const isSelected = selectedPlan === plan.id;
            const isPopular = plan.popular;

            return (
              <motion.div
                key={plan.id}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
                className="relative group"
              >
                <div
                  className={`relative h-full rounded-3xl p-8 transition-all duration-500 ${
                    isSelected || isHovered
                      ? 'shadow-2xl'
                      : 'shadow-lg'
                  }`}
                  style={{
                    background: 'white',
                    border: `2px solid ${isSelected || isHovered ? plan.color : 'rgba(226, 232, 240, 0.5)'}`,
                    boxShadow: isSelected || isHovered
                      ? `0 20px 60px ${plan.color}20`
                      : '0 4px 20px rgba(0,0,0,0.04)',
                    transform: isPopular ? 'scale(1.02)' : 'scale(1)',
                  }}
                >
                  {/* Popular Badge */}
                  {isPopular && (
                    <div
                      className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full text-xs font-bold text-[#0B1220]"
                      style={{
                        background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                        boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
                      }}
                    >
                      ⭐ Most Popular
                    </div>
                  )}

                  {/* Top Glow */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, ${plan.color}, ${plan.color}60)`,
                      opacity: isSelected || isHovered ? 1 : 0.3,
                    }}
                  />

                  {/* Plan Icon */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500"
                    style={{
                      background: `${plan.color}15`,
                      border: `1px solid ${plan.color}20`,
                    }}
                  >
                    <Icon className="w-8 h-8" style={{ color: plan.color }} />
                  </div>

                  {/* Plan Name */}
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ fontFamily: "'Fraunces', serif", color: '#0F172A' }}
                  >
                    {plan.name}
                  </h3>

                  {/* Speed Badge */}
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4"
                    style={{
                      background: `${plan.color}10`,
                      color: plan.color,
                      border: `1px solid ${plan.color}15`,
                    }}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{plan.speed}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed mb-6" style={{ color: '#64748B' }}>
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-4xl font-bold" style={{ color: '#0F172A' }}>
                      £{billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                    </span>
                    <span className="text-sm" style={{ color: '#64748B' }}>
                      /{billingCycle === 'monthly' ? 'document' : 'year'}
                    </span>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                        ) : (
                          <div className="w-5 h-5 flex-shrink-0 mt-0.5 rounded-full border-2" style={{ borderColor: '#E2E8F0' }} />
                        )}
                        <span
                          className={`text-sm ${
                            feature.included ? 'text-gray-700' : 'text-gray-400'
                          }`}
                        >
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    className="w-full py-3.5 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: isSelected || isHovered
                        ? `linear-gradient(135deg, ${plan.color}, ${plan.color}dd)`
                        : `${plan.color}10`,
                      color: isSelected || isHovered ? 'white' : plan.color,
                      border: isSelected || isHovered ? 'none' : `1px solid ${plan.color}20`,
                      boxShadow: isSelected || isHovered
                        ? `0 4px 20px ${plan.color}30`
                        : 'none',
                    }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isSelected || isHovered ? (
                        <>
                          <span>Get Started</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      ) : (
                        'Select Plan'
                      )}
                    </span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Document Types & Volume Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20"
        >
          <div
            className="rounded-3xl p-10 lg:p-14"
            style={{
              background: 'white',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            }}
          >
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Content */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl" style={{ background: 'rgba(15, 76, 129, 0.1)' }}>
                    <FileCheck className="w-5 h-5" style={{ color: '#0F4C81' }} />
                  </div>
                  <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#0F4C81' }}>
                    Document Types
                  </span>
                </div>
                <h3
                  className="text-2xl lg:text-3xl font-bold mb-3"
                  style={{ fontFamily: "'Fraunces', serif", color: '#0F172A' }}
                >
                  Volume Pricing Available
                </h3>
                <p className="text-base leading-relaxed mb-6" style={{ color: '#64748B' }}>
                  Get special rates for multiple documents, corporate accounts,
                  and bulk submissions.
                </p>
                <button
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-3"
                  style={{ color: '#0F4C81' }}
                >
                  <span>View Volume Pricing</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Right - Document Type Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {documentTypes.map((type, index) => {
                  const Icon = type.icon;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="p-4 rounded-2xl text-center transition-all duration-300 cursor-default"
                      style={{
                        background: 'rgba(248, 250, 252, 0.5)',
                        border: '1px solid rgba(226, 232, 240, 0.5)',
                      }}
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background: 'rgba(15, 76, 129, 0.08)' }}>
                        <Icon className="w-5 h-5" style={{ color: '#0F4C81' }} />
                      </div>
                      <p className="text-sm font-semibold text-gray-700">{type.label}</p>
                      <p className="text-xs" style={{ color: '#94A3B8' }}>{type.count}%</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Teaser & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <p className="text-sm" style={{ color: '#64748B' }}>
            Have questions about our pricing?{' '}
            <button className="font-semibold transition-colors hover:text-[#0F4C81]" style={{ color: '#D4AF37' }}>
              View our FAQ
            </button>
            {' '}or{' '}
            <button className="font-semibold transition-colors hover:text-[#0F4C81]" style={{ color: '#D4AF37' }}>
              Contact Support
            </button>
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-sm" style={{ color: '#64748B' }}>
              <Shield className="w-4 h-4" style={{ color: '#D4AF37' }} />
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: '#64748B' }}>
              <Headphones className="w-4 h-4" style={{ color: '#D4AF37' }} />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: '#64748B' }}>
              <Clock className="w-4 h-4" style={{ color: '#D4AF37' }} />
              <span>Money-back Guarantee</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomePricingSection;