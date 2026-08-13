import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UploadCloud, 
  ListChecks, 
  CreditCard, 
  ShieldCheck, 
  PackageCheck,
  Play,
  Clock,
  CheckCircle2,
  ArrowRight,
  Youtube,
  Users,
  ThumbsUp,
  FileCheck,
  Globe,
  Shield,
  Star
} from 'lucide-react';

const steps = [
  {
    icon: UploadCloud,
    title: 'Upload documents',
    description: 'Securely upload scans of the documents you need apostilled or legalised.',
    color: '#0F4C81',
  },
  {
    icon: ListChecks,
    title: 'Select service',
    description: 'Choose the service, destination country and processing speed you need.',
    color: '#D4AF37',
  },
  {
    icon: CreditCard,
    title: 'Make payment',
    description: 'Pay securely by card or bank transfer — pricing is confirmed up front.',
    color: '#10B981',
  },
  {
    icon: ShieldCheck,
    title: 'Processing & verification',
    description: 'A verified officer reviews, stamps and apostilles your documents.',
    color: '#8B5CF6',
  },
  {
    icon: PackageCheck,
    title: 'Receive documents',
    description: 'Your legalised documents are dispatched and tracked to your door.',
    color: '#F43F5E',
  },
];

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'International Business Owner',
    content: 'The apostille process was seamless. I received my documents in just 5 days!',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Student',
    content: 'Got my degree apostilled for my Master\'s application abroad. Excellent service!',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 3,
    name: 'Emma Williams',
    role: 'Corporate Legal Team',
    content: 'We\'ve processed over 200 documents with them. Reliable and professional every time.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=3',
  },
];

// Video data
const videoData = {
  title: 'How to Use Our Apostille Service',
  description: 'Watch this step-by-step guide on how to upload your documents, track your order, and receive your apostilled documents.',
  duration: '3:45',
  views: '12.5K',
  thumbnail: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&h=450&fit=crop',
  videoId: 'dQw4w9WgXcQ', // Replace with your actual YouTube video ID
};

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

const lineGrow = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 } },
};

const lineGrowVertical = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 } },
};

const HomeHowItWorksSection = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section style={{ background: '#F8FAFC' }} className="py-8 lg:py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
          className="max-w-2xl mb-20 lg:mb-24"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-5">
            <span className="w-6 h-px" style={{ background: '#D4AF37' }} />
            <span
              className="text-xs font-semibold tracking-[0.14em] uppercase"
              style={{ color: '#C29B20' }}
            >
              How it works
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl lg:text-[2.75rem] leading-[1.15] font-semibold mb-4"
            style={{ fontFamily: "'Fraunces', serif", color: '#0F172A' }}
          >
            A simple 5-step process
          </motion.h2>

          <motion.p variants={fadeUp} className="text-lg leading-relaxed" style={{ color: '#64748B' }}>
            From upload to delivery, every document follows the same verified path — tracked
            at each stage so you always know where things stand.
          </motion.p>
        </motion.div>

        {/* Steps Timeline */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
          className="hidden md:block relative"
        >
          {/* Track */}
          <div
            className="absolute left-0 right-0 top-7"
            style={{ height: 2, background: '#E2E8F0' }}
          />
          {/* Animated progress line */}
          <motion.div
            variants={lineGrow}
            className="absolute left-0 right-0 top-7"
            style={{ height: 2, background: 'linear-gradient(90deg, #D4AF37, #F4D03F)', transformOrigin: 'left' }}
          />

          <div className="relative grid grid-cols-5 gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.title} variants={fadeUp} className="flex flex-col items-start">
                  <motion.div
                    variants={node}
                    className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center mb-6"
                    style={{
                      background: '#FFFFFF',
                      border: `2px solid ${step.color}`,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                    }}
                  >
                    <Icon size={22} strokeWidth={1.75} style={{ color: step.color }} />
                    <span
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-[#0B1220]"
                      style={{ background: 'linear-gradient(135deg, #D4AF37, #F4D03F)' }}
                    >
                      {i + 1}
                    </span>
                  </motion.div>

                  <h3
                    className="text-base font-semibold mb-2 pr-2"
                    style={{ fontFamily: "'Fraunces', serif", color: '#0F172A' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed pr-2" style={{ color: '#64748B' }}>
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Mobile vertical timeline */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
          className="md:hidden relative pl-7"
        >
          {/* Track */}
          <div
            className="absolute left-[26px] top-2 bottom-2"
            style={{ width: 2, background: '#E2E8F0' }}
          />
          {/* Animated progress line */}
          <motion.div
            variants={lineGrowVertical}
            className="absolute left-[26px] top-2 bottom-2"
            style={{ width: 2, background: 'linear-gradient(180deg, #D4AF37, #F4D03F)', transformOrigin: 'top' }}
          />

          <div className="relative space-y-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.title} variants={fadeUp} className="relative flex gap-5">
                  <motion.div
                    variants={node}
                    className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center -ml-7"
                    style={{
                      background: '#FFFFFF',
                      border: `2px solid ${step.color}`,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                    }}
                  >
                    <Icon size={20} strokeWidth={1.75} style={{ color: step.color }} />
                    <span
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-[#0B1220]"
                      style={{ background: 'linear-gradient(135deg, #D4AF37, #F4D03F)' }}
                    >
                      {i + 1}
                    </span>
                  </motion.div>

                  <div className="pt-3">
                    <h3
                      className="text-base font-semibold mb-1.5"
                      style={{ fontFamily: "'Fraunces', serif", color: '#0F172A' }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 lg:mt-32"
        >
          <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            {/* Background Gradient */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0F4C81] rounded-full blur-3xl" />
            </div>

            <div className="relative grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
              {/* Left Content */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl" style={{ background: 'rgba(212, 175, 55, 0.1)' }}>
                    <Youtube className="w-6 h-6" style={{ color: '#D4AF37' }} />
                  </div>
                  <span className="text-xs font-semibold tracking-[0.14em] uppercase" style={{ color: '#D4AF37' }}>
                    Video Guide
                  </span>
                </div>

                <h3
                  className="text-2xl lg:text-3xl font-bold leading-tight"
                  style={{ fontFamily: "'Fraunces', serif", color: '#0F172A' }}
                >
                  {videoData.title}
                </h3>

                <p className="text-base leading-relaxed" style={{ color: '#64748B' }}>
                  {videoData.description}
                </p>

                {/* Video Stats */}
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#64748B' }}>
                    <Clock className="w-4 h-4" />
                    <span>Duration: {videoData.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#64748B' }}>
                    <Users className="w-4 h-4" />
                    <span>{videoData.views} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                    color: '#0B1220',
                    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
                  }}
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Watch Video Guide</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Key Points */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#0F172A' }}>
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span>Step-by-step tutorial</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#0F172A' }}>
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span>Tips & best practices</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#0F172A' }}>
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span>Common mistakes to avoid</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#0F172A' }}>
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span>Track your order</span>
                  </div>
                </div>
              </div>

              {/* Right - Video Thumbnail */}
              <div 
                className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg"
                onClick={() => setIsVideoModalOpen(true)}
                style={{
                  backgroundImage: `url(${videoData.thumbnail})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '300px',
                }}
              >
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Pulsing Ring */}
                    <div className="absolute inset-0 rounded-full animate-ping" style={{ background: 'rgba(212, 175, 55, 0.3)' }} />
                    <div 
                      className="relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: 'rgba(212, 175, 55, 0.9)',
                        boxShadow: '0 0 40px rgba(212, 175, 55, 0.4)',
                      }}
                    >
                      <Play className="w-8 h-8 text-[#0B1220] ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Video Duration Badge */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg backdrop-blur-sm bg-black/50 text-white text-sm font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {videoData.duration}
                </div>

                {/* YouTube Badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg backdrop-blur-sm bg-black/50 text-white text-xs font-medium flex items-center gap-1.5">
                  <Youtube className="w-4 h-4 text-red-500" />
                  YouTube
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Video Modal */}
        {isVideoModalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <div 
              className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors flex items-center justify-center"
              >
                <span className="text-2xl">×</span>
              </button>

              {/* Video Embed */}
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoData.videoId}?autoplay=1&rel=0`}
                  title={videoData.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Info */}
              <div className="p-6 bg-white">
                <h4 className="text-lg font-semibold text-[#0F172A]">{videoData.title}</h4>
                <p className="text-sm text-[#64748B] mt-1">{videoData.description}</p>
              </div>
            </div>
          </div>
        )}

       
      </div>
    </section>
  );
};

export default HomeHowItWorksSection;