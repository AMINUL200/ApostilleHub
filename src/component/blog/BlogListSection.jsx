import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stamp, FileCheck2, Plane, BadgeCheck, GraduationCap, Landmark, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  { name: 'All', icon: null },
  { name: 'Apostille', icon: Stamp },
  { name: 'Legalisation', icon: FileCheck2 },
  { name: 'Immigration', icon: Plane },
  { name: 'Visa Processing', icon: BadgeCheck },
  { name: 'Education Documents', icon: GraduationCap },
  { name: 'UK Updates', icon: Landmark },
];

// Category-specific images
const categoryImages = {
  Apostille: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&h=400&fit=crop&crop=center',
  Legalisation: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop&crop=center',
  Immigration: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop&crop=center',
  'Visa Processing': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop&crop=center',
  'Education Documents': 'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=600&h=400&fit=crop&crop=center',
  'UK Updates': 'https://images.unsplash.com/photo-1526129318478-62ed8076c274?w=600&h=400&fit=crop&crop=center',
};

// Fallback gradient if image fails to load
const gradients = {
  Apostille: 'linear-gradient(135deg, #0F4C81 0%, #1E6BB8 100%)',
  Legalisation: 'linear-gradient(135deg, #0B1220 0%, #1E3A5F 100%)',
  Immigration: 'linear-gradient(135deg, #1E6BB8 0%, #0F4C81 100%)',
  'Visa Processing': 'linear-gradient(135deg, #0F4C81 0%, #0B1220 100%)',
  'Education Documents': 'linear-gradient(135deg, #0B3D68 0%, #0F4C81 100%)',
  'UK Updates': 'linear-gradient(135deg, #0B1220 0%, #0F4C81 100%)',
};

const rawPosts = [
  { 
    title: 'What is an apostille, and when do you actually need one?', 
    excerpt: 'A plain-English guide to the Hague Convention stamp and the documents it covers.', 
    category: 'Apostille', 
    date: 'Aug 12, 2026', 
    readTime: '5 min read' 
  },
  { 
    title: 'Apostille vs legalisation: understanding the difference', 
    excerpt: 'Not every country recognises an apostille — here\'s how to tell which process applies.', 
    category: 'Legalisation', 
    date: 'Aug 8, 2026', 
    readTime: '6 min read' 
  },
  { 
    title: 'Moving abroad? The documents immigration officers ask for first', 
    excerpt: 'A checklist of the paperwork most commonly requested at the start of a visa application.', 
    category: 'Immigration', 
    date: 'Aug 4, 2026', 
    readTime: '7 min read' 
  },
  { 
    title: 'UK visa processing times, updated for 2026', 
    excerpt: 'Current turnaround times across the most common UK visa categories.', 
    category: 'Visa Processing', 
    date: 'Jul 30, 2026', 
    readTime: '4 min read' 
  },
  { 
    title: 'Getting your degree recognised overseas', 
    excerpt: 'Why universities and employers abroad ask for apostilled academic transcripts.', 
    category: 'Education Documents', 
    date: 'Jul 26, 2026', 
    readTime: '5 min read' 
  },
  { 
    title: 'FCDO legalisation office: what changed this year', 
    excerpt: 'A summary of recent UK government updates affecting document legalisation.', 
    category: 'UK Updates', 
    date: 'Jul 22, 2026', 
    readTime: '6 min read' 
  },
  { 
    title: 'Marriage certificates: apostille requirements by country', 
    excerpt: 'A country-by-country look at how marriage certificates need to be legalised.', 
    category: 'Apostille', 
    date: 'Jul 18, 2026', 
    readTime: '8 min read' 
  },
  { 
    title: 'Corporate documents and the apostille process explained', 
    excerpt: 'What businesses need to know before expanding or signing contracts abroad.', 
    category: 'Legalisation', 
    date: 'Jul 14, 2026', 
    readTime: '6 min read' 
  },
  { 
    title: 'Sponsoring a family member: the document trail explained', 
    excerpt: 'The paperwork chain behind most family visa and immigration sponsorships.', 
    category: 'Immigration', 
    date: 'Jul 10, 2026', 
    readTime: '7 min read' 
  },
  { 
    title: 'Student visa documents: what gets rejected most often', 
    excerpt: 'Common mistakes we see in student visa applications, and how to avoid them.', 
    category: 'Visa Processing', 
    date: 'Jul 6, 2026', 
    readTime: '5 min read' 
  },
  { 
    title: 'Academic transcripts vs degree certificates: which do you need?', 
    excerpt: 'Institutions abroad often ask for one specifically — here\'s how to tell which.', 
    category: 'Education Documents', 
    date: 'Jul 2, 2026', 
    readTime: '4 min read' 
  },
  { 
    title: 'New online apostille application pilot: what to expect', 
    excerpt: 'A look at the UK government\'s pilot for faster online apostille applications.', 
    category: 'UK Updates', 
    date: 'Jun 28, 2026', 
    readTime: '5 min read' 
  },
  { 
    title: 'Power of attorney documents for use abroad', 
    excerpt: 'What makes a power of attorney valid once it crosses a border.', 
    category: 'Apostille', 
    date: 'Jun 24, 2026', 
    readTime: '6 min read' 
  },
];

const POSTS_PER_PAGE = 6;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const BlogListSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState({});

  const filteredPosts = useMemo(
    () => (activeCategory === 'All' ? rawPosts : rawPosts.filter((p) => p.category === activeCategory)),
    [activeCategory]
  );

  const totalPages = Math.max(Math.ceil(filteredPosts.length / POSTS_PER_PAGE), 1);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const goToPage = (page) => {
    setCurrentPage(page);
    document.getElementById('blog-list-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    if (currentPage <= 3) return [1, 2, 3, 4, '...', totalPages];
    if (currentPage >= totalPages - 2) return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const handleImageError = (postTitle) => {
    setImagesLoaded(prev => ({ ...prev, [postTitle]: false }));
  };

  const handleImageLoad = (postTitle) => {
    setImagesLoaded(prev => ({ ...prev, [postTitle]: true }));
  };

  return (
    <section id="blog-list-top" style={{ background: 'var(--background)' }} className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2.5 mb-4">
          {categories.map((cat) => {
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
                {Icon && <Icon size={14} strokeWidth={2} />}
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Result count */}
        <p className="text-sm mb-10" style={{ color: 'var(--text-light)' }}>
          Showing {paginatedPosts.length === 0 ? 0 : (currentPage - 1) * POSTS_PER_PAGE + 1}
          {'\u2013'}
          {Math.min(currentPage * POSTS_PER_PAGE, filteredPosts.length)} of {filteredPosts.length} articles
        </p>

        {/* Post grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + currentPage}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            variants={container}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          >
            {paginatedPosts.map((post) => {
              const Icon = categories.find((c) => c.name === post.category)?.icon;
              const imageUrl = categoryImages[post.category];
              const imageLoaded = imagesLoaded[post.title] !== false;

              return (
                <motion.article
                  key={post.title}
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                  className="group rounded-2xl overflow-hidden cursor-pointer flex flex-col"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
                >
                  {/* Image Container */}
                  <div
                    className="relative h-48 flex items-center justify-center flex-shrink-0 overflow-hidden"
                    style={{ background: gradients[post.category] }}
                  >
                    {/* Blog Image */}
                    <img
                      src={imageUrl}
                      alt={post.title}
                      className={`w-full h-full object-cover transition-opacity duration-500 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => handleImageLoad(post.title)}
                      onError={() => handleImageError(post.title)}
                      loading="lazy"
                    />
                    
                    {/* Loading Skeleton */}
                    {!imageLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}

                    {/* Category Badge - Always on top of image */}
                    <span
                      className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide z-10"
                      style={{ background: 'rgba(212,175,55,0.9)', color: 'var(--dark)' }}
                    >
                      {post.category}
                    </span>

                    {/* Gradient Overlay on Image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3
                      className="text-base font-semibold leading-snug mb-2.5 line-clamp-2"
                      style={{ fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-5 flex-1 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                      <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-light)' }}>
                        <Clock size={13} strokeWidth={2} />
                        {post.readTime}
                      </div>
                      <span
                        className="inline-flex items-center gap-1 text-xs font-semibold transition-all duration-300 group-hover:gap-2"
                        style={{ color: 'var(--primary)' }}
                      >
                        Read more
                        <ArrowRight size={13} strokeWidth={2} />
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}

            {paginatedPosts.length === 0 && (
              <div className="col-span-full text-center py-16">
                <p className="text-lg font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                  No articles found
                </p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Try a different category.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => goToPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--primary)' }}
            >
              <ChevronLeft size={17} strokeWidth={2} />
            </button>

            {getPageNumbers().map((page, i) =>
              page === '...' ? (
                <span key={`ellipsis-${i}`} className="w-10 text-center text-sm" style={{ color: 'var(--text-light)' }}>
                  {'\u2026'}
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-200"
                  style={
                    page === currentPage
                      ? { background: 'var(--gradient-gold)', color: 'var(--dark)' }
                      : { background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }
                  }
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--primary)' }}
            >
              <ChevronRight size={17} strokeWidth={2} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogListSection;