import React from 'react';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Check,
  Package,
  Zap,
  Rocket,
  Mail,
  Truck,
  Plane,
  Globe2,
  ShieldCheck,
  Receipt,
  FileText,
  Building2,
  ArrowRight,
} from 'lucide-react';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const SectionHeader = ({ eyebrow, title, subtitle, dark }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.3 }}
    variants={container}
    className="max-w-2xl mx-auto text-center mb-14"
  >
    <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-5 justify-center">
      <span className="w-6 h-px" style={{ background: 'var(--secondary)' }} />
      <span
        className="text-xs font-semibold tracking-[0.14em] uppercase"
        style={{ color: dark ? 'var(--secondary)' : 'var(--secondary-hover)' }}
      >
        {eyebrow}
      </span>
      <span className="w-6 h-px" style={{ background: 'var(--secondary)' }} />
    </motion.div>
    <motion.h2
      variants={fadeUp}
      className="text-4xl lg:text-[2.5rem] leading-[1.15] font-semibold mb-4"
      style={{ fontFamily: "'Fraunces', serif", color: dark ? '#F8FAFC' : 'var(--text-primary)' }}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p variants={fadeUp} className="text-lg leading-relaxed" style={{ color: dark ? 'var(--text-light)' : 'var(--text-secondary)' }}>
        {subtitle}
      </motion.p>
    )}
  </motion.div>
);

/* 1. Header */
const PricingHero = () => (
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
      Pricing
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
        <span style={{ color: 'var(--primary)' }} className="font-medium">Pricing</span>
      </motion.div>

      <motion.div initial="hidden" animate="show" variants={container} className="max-w-2xl">
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-5">
          <span className="w-6 h-px" style={{ background: 'var(--secondary)' }} />
          <span className="text-xs font-semibold tracking-[0.14em] uppercase" style={{ color: 'var(--secondary-hover)' }}>
            Pricing
          </span>
        </motion.div>
        <motion.h1
          variants={fadeUp}
          className="text-4xl lg:text-[2.75rem] leading-[1.15] font-semibold mb-4"
          style={{ fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}
        >
          Transparent pricing, no surprises
        </motion.h1>
        <motion.p variants={fadeUp} className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Every price is confirmed before you pay \u2014 processing, delivery, and any express fees
          shown upfront, with no hidden charges added later.
        </motion.p>
      </motion.div>
    </div>
  </section>
);

/* 2. Transparent pricing tiers */
const tiers = [
  {
    icon: Package,
    name: 'Standard',
    price: '39',
    turnaround: '3\u20135 working days',
    features: ['Document verification', 'Apostille certification', 'Order tracking', 'Email updates'],
    highlighted: false,
  },
  {
    icon: Zap,
    name: 'Express',
    price: '69',
    turnaround: '24\u201348 hours',
    features: ['Everything in Standard', 'Priority queue placement', 'SMS + email updates', 'Dedicated case reference'],
    highlighted: true,
  },
  {
    icon: Rocket,
    name: 'Priority',
    price: '129',
    turnaround: 'Same working day',
    features: ['Everything in Express', 'Direct officer contact', 'Same-day dispatch', 'Phone support line'],
    highlighted: false,
  },
];

const PricingTiers = () => (
  <section style={{ background: 'var(--background)' }} className="py-20 lg:py-28">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <SectionHeader
        eyebrow="Transparent pricing"
        title="Pick the turnaround that fits"
        subtitle="Prices shown are from-rates for a single standard document. Your exact price is confirmed at checkout before payment."
      />

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {tiers.map((tier) => {
          const Icon = tier.icon;
          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="relative rounded-3xl p-8 flex flex-col"
              style={
                tier.highlighted
                  ? { background: 'var(--dark)', boxShadow: 'var(--shadow-lg)' }
                  : { background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }
              }
            >
              {tier.highlighted && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide"
                  style={{ background: 'var(--gradient-gold)', color: 'var(--dark)' }}
                >
                  Most popular
                </span>
              )}

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={tier.highlighted ? { background: 'var(--gradient-gold)' } : { background: 'var(--background)', color: 'var(--primary)' }}
              >
                <Icon size={22} strokeWidth={1.75} style={tier.highlighted ? { color: 'var(--dark)' } : undefined} />
              </div>

              <h3
                className="text-xl font-semibold mb-1"
                style={{ fontFamily: "'Fraunces', serif", color: tier.highlighted ? '#F8FAFC' : 'var(--text-primary)' }}
              >
                {tier.name}
              </h3>
              <p className="text-sm mb-5" style={{ color: tier.highlighted ? 'var(--text-light)' : 'var(--text-secondary)' }}>
                {tier.turnaround}
              </p>

              <div className="flex items-baseline gap-1 mb-7">
                <span className="text-sm" style={{ color: tier.highlighted ? 'var(--text-light)' : 'var(--text-secondary)' }}>
                  from
                </span>
                <span
                  className="text-4xl font-semibold"
                  style={{ fontFamily: "'Fraunces', serif", color: tier.highlighted ? '#F8FAFC' : 'var(--text-primary)' }}
                >
                  \u00a3{tier.price}
                </span>
                <span className="text-sm" style={{ color: tier.highlighted ? 'var(--text-light)' : 'var(--text-secondary)' }}>
                  /document
                </span>
              </div>

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: tier.highlighted ? 'var(--text-light)' : 'var(--text-secondary)' }}>
                    <Check size={16} strokeWidth={2.5} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--secondary)' }} />
                    {f}
                  </li>
                ))}
              </ul>

              <button className={tier.highlighted ? 'btn-gold w-full' : 'btn-outline w-full'}>
                Choose {tier.name}
              </button>
            </motion.div>
          );
        })}
      </div>

      <p className="text-center text-xs mt-8" style={{ color: 'var(--text-light)' }}>
        Prices exclude VAT and delivery. See VAT information below for full details.
      </p>
    </div>
  </section>
);

/* 3. Delivery options */
const deliveryOptions = [
  { icon: Mail, name: 'Standard post', price: 'Included', time: '5\u20137 working days' },
  { icon: Truck, name: 'Tracked courier', price: '\u00a39.99', time: '2\u20133 working days' },
  { icon: Plane, name: 'International express', price: '\u00a324.99', time: '1\u20132 working days' },
];

const DeliveryOptions = () => (
  <section style={{ background: 'var(--surface)' }} className="py-20 lg:py-28">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <SectionHeader
        eyebrow="Delivery options"
        title="Get your documents back your way"
        subtitle="Every order includes tracking. Choose the delivery speed that matches your deadline."
      />

      <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {deliveryOptions.map((option) => {
          const Icon = option.icon;
          return (
            <motion.div
              key={option.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-7 text-center"
              style={{ background: 'var(--background)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5"
                style={{ background: 'var(--surface)', color: 'var(--primary)' }}
              >
                <Icon size={22} strokeWidth={1.75} />
              </div>
              <h3 className="text-base font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                {option.name}
              </h3>
              <p className="text-2xl font-semibold mb-1" style={{ fontFamily: "'Fraunces', serif", color: 'var(--primary)' }}>
                {option.price}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {option.time}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

/* 4. Express services banner */
const ExpressServices = () => (
  <section className="relative overflow-hidden" style={{ background: 'var(--dark)' }}>
    <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1440 400">
      <defs>
        <pattern id="expressGuilloche" width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M0,60 Q30,0 60,60 T120,60" fill="none" stroke="#D4AF37" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1440" height="400" fill="url(#expressGuilloche)" />
    </svg>

    <div className="relative max-w-6xl mx-auto px-6 lg:px-12 py-20 lg:py-24">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
        className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center"
      >
        <div>
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-5">
            <Zap size={16} strokeWidth={2} style={{ color: 'var(--secondary)' }} />
            <span className="text-xs font-semibold tracking-[0.14em] uppercase" style={{ color: 'var(--secondary)' }}>
              Express services
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-3xl lg:text-4xl leading-[1.15] font-semibold mb-4"
            style={{ fontFamily: "'Fraunces', serif", color: '#F8FAFC' }}
          >
            Deadline coming up? Skip the queue.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-base leading-relaxed max-w-lg" style={{ color: 'var(--text-light)' }}>
            Express and Priority orders are placed at the front of the verification queue,
            reviewed by a dedicated officer, and dispatched the moment they're ready \u2014 no
            waiting behind standard orders.
          </motion.p>
        </div>

        <motion.div variants={fadeUp} className="flex flex-col gap-3">
          {['Available on every service', 'Real-time status updates', 'Priority phone support'].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-xl px-5 py-3.5" style={{ background: 'rgba(248,250,252,0.05)', border: '1px solid rgba(248,250,252,0.1)' }}>
              <Check size={16} strokeWidth={2.5} style={{ color: 'var(--secondary)' }} className="flex-shrink-0" />
              <span className="text-sm" style={{ color: '#F8FAFC' }}>{item}</span>
            </div>
          ))}
          <button className="btn-gold mt-2 justify-center">
            Choose express at checkout
            <ArrowRight size={16} strokeWidth={2} />
          </button>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* 5. International shipping */
const shippingZones = [
  { zone: 'United Kingdom', time: '1\u20132 working days', cost: 'from \u00a34.99' },
  { zone: 'Europe', time: '3\u20135 working days', cost: 'from \u00a312.99' },
  { zone: 'North America', time: '4\u20136 working days', cost: 'from \u00a319.99' },
  { zone: 'Asia-Pacific', time: '5\u20138 working days', cost: 'from \u00a324.99' },
  { zone: 'Rest of world', time: '6\u201310 working days', cost: 'from \u00a329.99' },
];

const InternationalShipping = () => (
  <section style={{ background: 'var(--background)' }} className="py-20 lg:py-28">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <SectionHeader
        eyebrow="International shipping"
        title="Delivered and tracked in 150+ countries"
        subtitle="Every international order ships with tracked, insured courier delivery and customs paperwork handled for you."
      />

      <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
        <div className="grid grid-cols-3 px-6 py-4 text-xs font-semibold uppercase tracking-wide" style={{ background: 'var(--dark)', color: 'var(--text-light)' }}>
          <span>Zone</span>
          <span>Estimated time</span>
          <span className="text-right">Cost</span>
        </div>
        {shippingZones.map((z, i) => (
          <motion.div
            key={z.zone}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="grid grid-cols-3 px-6 py-4 text-sm"
            style={{
              background: i % 2 === 0 ? 'var(--surface)' : 'var(--background)',
              color: 'var(--text-primary)',
              borderBottom: i < shippingZones.length - 1 ? '1px solid var(--border)' : 'none',
            }}
          >
            <span className="font-medium">{z.zone}</span>
            <span style={{ color: 'var(--text-secondary)' }}>{z.time}</span>
            <span className="text-right font-medium" style={{ color: 'var(--primary)' }}>{z.cost}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-10">
        {[
          { icon: Globe2, text: '150+ countries covered' },
          { icon: ShieldCheck, text: 'Fully insured shipments' },
          { icon: Truck, text: 'Live courier tracking' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.text} className="flex items-center gap-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <Icon size={17} strokeWidth={1.75} style={{ color: 'var(--primary)' }} />
              {item.text}
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

/* 6. VAT information */
const vatInfo = [
  {
    icon: Receipt,
    title: 'UK orders',
    description: 'VAT is charged at the standard UK rate (20%) and is included in the price shown at checkout \u2014 nothing is added afterward.',
  },
  {
    icon: Building2,
    title: 'Business & international clients',
    description: 'VAT-registered business clients outside the UK may qualify for reverse-charge treatment. Add your VAT number at checkout and it will be applied automatically.',
  },
  {
    icon: FileText,
    title: 'Invoices',
    description: 'A VAT invoice is generated automatically for every order and is available to download from your account at any time.',
  },
];

const VATInformation = () => (
  <section style={{ background: 'var(--surface)' }} className="py-20 lg:py-28">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <SectionHeader
        eyebrow="VAT information"
        title="How VAT applies to your order"
      />

      <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {vatInfo.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-7"
              style={{ background: 'var(--background)', border: '1px solid var(--border)' }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: 'var(--surface)', color: 'var(--primary)' }}
              >
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

const PricingPage = () => {
  return (
    <div>
      <PricingHero />
      <PricingTiers />
      <DeliveryOptions />
      <ExpressServices />
      <InternationalShipping />
      <VATInformation />
    </div>
  );
};

export default PricingPage;