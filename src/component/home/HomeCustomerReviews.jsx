import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Users,
  ThumbsUp,
  Award,
  Clock,
  Sparkles,
  MapPin,
  Calendar,
  Heart,
  MessageCircle,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'International Business Owner',
    country: 'United Kingdom',
    flag: '🇬🇧',
    rating: 5,
    date: 'December 2024',
    review: 'The apostille process was incredibly smooth and fast. I received my documents in just 5 working days. Their team kept me updated at every step. Highly recommended for anyone needing document legalisation.',
    avatar: 'https://i.pravatar.cc/150?img=1',
    verified: true,
    service: 'Apostille Services',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Master\'s Student',
    country: 'China',
    flag: '🇨🇳',
    rating: 5,
    date: 'November 2024',
    review: 'Applied for my degree apostille for my Master\'s application abroad. The online portal made it so easy to upload documents and track progress. Excellent service from start to finish!',
    avatar: 'https://i.pravatar.cc/150?img=2',
    verified: true,
    service: 'Educational Documents',
  },
  {
    id: 3,
    name: 'Emma Williams',
    role: 'Corporate Legal Team',
    country: 'United States',
    flag: '🇺🇸',
    rating: 5,
    date: 'October 2024',
    review: 'We\'ve processed over 200 corporate documents with them. Their reliability and professionalism is unmatched. They handle complex legalisation requirements with ease.',
    avatar: 'https://i.pravatar.cc/150?img=3',
    verified: true,
    service: 'Corporate Documents',
  },
  {
    id: 4,
    name: 'David Okafor',
    role: 'Immigration Consultant',
    country: 'Nigeria',
    flag: '🇳🇬',
    rating: 4,
    date: 'September 2024',
    review: 'Excellent service for document legalisation. Their expertise in embassy legalisation saved us weeks of delays. The customer support team is very responsive and helpful.',
    avatar: 'https://i.pravatar.cc/150?img=4',
    verified: true,
    service: 'Embassy Legalisation',
  },
  {
    id: 5,
    name: 'Maria Garcia',
    role: 'Fashion Designer',
    country: 'Spain',
    flag: '🇪🇸',
    rating: 5,
    date: 'August 2024',
    review: 'I needed my certificates notarized and apostilled for an international exhibition. They handled everything perfectly. The express service was worth every penny!',
    avatar: 'https://i.pravatar.cc/150?img=5',
    verified: true,
    service: 'Notary Services',
  },
  {
    id: 6,
    name: 'James O\'Brien',
    role: 'Legal Consultant',
    country: 'Ireland',
    flag: '🇮🇪',
    rating: 5,
    date: 'July 2024',
    review: 'Trustworthy and efficient. They\'ve become our go-to partner for all document legalisation needs. Their transparent pricing and clear communication set them apart.',
    avatar: 'https://i.pravatar.cc/150?img=6',
    verified: true,
    service: 'Legal Documents',
  },
  {
    id: 7,
    name: 'Aisha Patel',
    role: 'Medical Professional',
    country: 'India',
    flag: '🇮🇳',
    rating: 5,
    date: 'June 2024',
    review: 'My medical degree apostille was processed flawlessly. The team guided me through the entire process and made it stress-free. Highly professional service.',
    avatar: 'https://i.pravatar.cc/150?img=7',
    verified: true,
    service: 'Educational Documents',
  },
  {
    id: 8,
    name: 'Thomas Müller',
    role: 'Business Owner',
    country: 'Germany',
    flag: '🇩🇪',
    rating: 5,
    date: 'May 2024',
    review: 'Outstanding service! They apostilled my business documents for international expansion. The whole process was transparent and efficient. Will definitely use again.',
    avatar: 'https://i.pravatar.cc/150?img=8',
    verified: true,
    service: 'Corporate Documents',
  },
];

// Stats data
const stats = [
  { icon: Users, label: 'Happy Clients', value: '10,000+' },
  { icon: Star, label: 'Average Rating', value: '4.9/5' },
  { icon: ThumbsUp, label: 'Success Rate', value: '99%' },
  { icon: Award, label: 'Trustpilot', value: 'Excellent' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const HomeCustomerReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [cardsPerView, setCardsPerView] = useState(3);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Calculate cards per view based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => 
          prev + cardsPerView >= reviews.length ? 0 : prev + 1
        );
      }, 5000);
    } else {
      clearInterval(autoPlayRef.current);
    }

    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlaying, cardsPerView]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => 
      prev - 1 < 0 ? Math.max(0, reviews.length - cardsPerView) : prev - 1
    );
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => 
      prev + cardsPerView >= reviews.length ? 0 : prev + 1
    );
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + cardsPerView);
  // Add wrap-around for infinite loop
  const getVisibleReviews = () => {
    const start = currentIndex % reviews.length;
    const end = start + cardsPerView;
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(reviews[i % reviews.length]);
    }
    return result;
  };

  const currentVisibleReviews = getVisibleReviews();

  // Render stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-300'}`}
        fill={i < rating ? '#D4AF37' : 'none'}
      />
    ));
  };

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: '#0B1220' }}>
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0F4C81]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#D4AF37]/5 to-[#0F4C81]/5 rounded-full blur-3xl" />
        
        {/* Stars Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(2px 2px at 20px 30px, #D4AF37, transparent), radial-gradient(2px 2px at 40px 70px, #D4AF37, transparent), radial-gradient(2px 2px at 50px 160px, #D4AF37, transparent), radial-gradient(2px 2px at 90px 40px, #D4AF37, transparent)',
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
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
              <MessageCircle className="w-4 h-4" style={{ color: '#D4AF37' }} />
              <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: '#D4AF37' }}>
                Client Testimonials
              </span>
            </div>
            <div className="h-px w-8" style={{ background: 'linear-gradient(270deg, transparent, #D4AF37)' }} />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 tracking-tight"
            style={{ fontFamily: "'Fraunces', serif", color: '#F8FAFC' }}
          >
            What Our{' '}
            <span className="relative inline-block">
              <span className="relative z-10" style={{ color: '#D4AF37' }}>Clients Say</span>
              <span className="absolute bottom-1 left-0 w-full h-3 -z-10" style={{ background: 'rgba(212, 175, 55, 0.2)' }} />
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-lg lg:text-xl leading-relaxed" style={{ color: '#94A3B8' }}>
            Real stories from real clients who trusted us with their document legalisation needs.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl text-center"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <Icon className="w-6 h-6 mx-auto mb-2" style={{ color: '#D4AF37' }} />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm" style={{ color: '#94A3B8' }}>{stat.label}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Carousel Container */}
          <div
            ref={carouselRef}
            className="overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <motion.div
              className="flex gap-6 transition-all duration-700 ease-in-out"
              animate={{
                transform: `translateX(-${(currentIndex % reviews.length) * (100 / cardsPerView)}%)`,
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {reviews.concat(reviews).map((review, index) => (
                <div
                  key={`${review.id}-${index}`}
                  className="flex-shrink-0"
                  style={{ width: `${100 / cardsPerView}%` }}
                >
                  <div
                    className="h-full p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    {/* Quote Icon */}
                    <Quote className="w-8 h-8 mb-4" style={{ color: 'rgba(212, 175, 55, 0.3)' }} />

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {renderStars(review.rating)}
                    </div>

                    {/* Review Text */}
                    <p className="text-sm leading-relaxed mb-6" style={{ color: '#E2E8F0' }}>
                      "{review.review}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                      <div className="relative">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {review.verified && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#10B981' }}>
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-sm truncate">
                          {review.name}
                        </p>
                        <div className="flex items-center gap-2 text-xs" style={{ color: '#94A3B8' }}>
                          <span>{review.flag}</span>
                          <span>{review.country}</span>
                          <span className="w-1 h-1 rounded-full" style={{ background: '#94A3B8' }} />
                          <span>{review.service}</span>
                        </div>
                      </div>
                    </div>

                    {/* Service Tag */}
                    <div
                      className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
                      style={{
                        background: 'rgba(212, 175, 55, 0.1)',
                        color: '#D4AF37',
                        border: '1px solid rgba(212, 175, 55, 0.15)',
                      }}
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{review.service}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
            }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
            }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.slice(0, Math.ceil(reviews.length / cardsPerView)).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(index);
                setTimeout(() => setIsAutoPlaying(true), 3000);
              }}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: currentIndex === index ? '32px' : '8px',
                background: currentIndex === index 
                  ? 'linear-gradient(90deg, #D4AF37, #F4D03F)'
                  : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>

        {/* Trustpilot CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div
            className="inline-flex items-center gap-6 px-8 py-4 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>
              <span className="text-white font-bold">4.9/5</span>
            </div>
            <div className="w-px h-8" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <div className="flex items-center gap-2 text-sm" style={{ color: '#94A3B8' }}>
              <span>Based on</span>
              <span className="text-white font-semibold">1,247</span>
              <span>reviews on</span>
              <span className="font-semibold" style={{ color: '#D4AF37' }}>Trustpilot</span>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                color: '#0B1220',
              }}
            >
              <span>Read All Reviews</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeCustomerReviews;