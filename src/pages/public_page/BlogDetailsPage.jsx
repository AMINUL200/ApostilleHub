import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Bookmark,
  Heart,
  MessageCircle,
  ChevronRight,
  ArrowRight,
  Eye,
  ThumbsUp,
  Award,
  FileCheck2,
  Stamp,
  Plane,
  BadgeCheck,
  GraduationCap,
  Landmark
} from 'lucide-react';

// Sample blog post data (same as in BlogListSection)
const blogPosts = [
  {
    id: 1,
    title: 'What is an apostille, and when do you actually need one?',
    slug: 'what-is-an-apostille-and-when-do-you-actually-need-one',
    excerpt: 'A plain-English guide to the Hague Convention stamp and the documents it covers.',
    category: 'Apostille',
    date: 'Aug 12, 2026',
    readTime: '5 min read',
    author: 'Sarah Johnson',
    authorRole: 'Senior Apostille Specialist',
    authorAvatar: 'https://i.pravatar.cc/150?img=1',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&h=600&fit=crop&crop=center',
    content: `
      <p>An apostille is a certificate issued by a designated authority that authenticates the origin of a public document for use in another country. It certifies the authenticity of the signature, seal, or stamp on the document, making it valid for legal purposes in all countries that are part of the Hague Apostille Convention.</p>
      
      <h2>When do you actually need an apostille?</h2>
      
      <p>You need an apostille when you need to use a public document in a country that is a member of the Hague Apostille Convention. Common scenarios include:</p>
      
      <ul>
        <li><strong>Moving abroad:</strong> Birth certificates, marriage certificates, and police clearance certificates often need apostilles for immigration purposes.</li>
        <li><strong>Studying overseas:</strong> Educational documents like diplomas, degrees, and transcripts require apostilles for university admissions.</li>
        <li><strong>International business:</strong> Corporate documents, power of attorney, and commercial invoices may need apostilles for cross-border transactions.</li>
        <li><strong>Legal proceedings:</strong> Court documents and legal affidavits may require apostilles for international legal matters.</li>
      </ul>
      
      <h2>How does the apostille process work?</h2>
      
      <p>The apostille process typically involves several steps:</p>
      
      <ol>
        <li><strong>Document verification:</strong> The document must first be verified by the appropriate authority in the country where it was issued.</li>
        <li><strong>Notarisation:</strong> In some cases, the document may need to be notarised before an apostille can be issued.</li>
        <li><strong>Apostille issuance:</strong> The designated authority (such as the FCDO in the UK) issues the apostille certificate.</li>
        <li><strong>Delivery:</strong> The apostilled document is returned to you or sent directly to the destination country.</li>
      </ol>
      
      <h2>Which documents can receive an apostille?</h2>
      
      <p>Almost any public document can receive an apostille, including:</p>
      
      <ul>
        <li>Birth, marriage, and death certificates</li>
        <li>Educational diplomas, degrees, and transcripts</li>
        <li>Court orders and legal documents</li>
        <li>Notarised documents and affidavits</li>
        <li>Corporate documents and commercial invoices</li>
        <li>Power of attorney documents</li>
      </ul>
      
      <h2>Countries that accept apostilles</h2>
      
      <p>Over 120 countries are part of the Hague Apostille Convention, including all EU member states, the United States, Canada, Australia, New Zealand, Japan, South Korea, and many more. For countries not in the convention, a different legalisation process called "embassy legalisation" is required.</p>
      
      <h2>How long does the apostille process take?</h2>
      
      <p>The processing time for an apostille can vary depending on the country and the type of document. Standard processing typically takes 5-7 business days, while express services can complete the process in 2-3 business days. Emergency services may be available for urgent requests.</p>
      
      <h2>Common mistakes to avoid</h2>
      
      <ul>
        <li><strong>Incorrect document preparation:</strong> Ensure all documents are properly signed, dated, and notarised before submission.</li>
        <li><strong>Wrong authority:</strong> Submit your documents to the correct authority for the apostille process.</li>
        <li><strong>Missing translations:</strong> Some countries require documents to be translated before an apostille can be issued.</li>
        <li><strong>Expired documents:</strong> Some documents have validity periods and must be apostilled within a certain timeframe.</li>
      </ul>
      
      <p>By understanding the apostille process and preparing your documents correctly, you can ensure a smooth and efficient experience. Our team of experts is here to help you every step of the way.</p>
    `,
    tags: ['Apostille', 'Document Legalisation', 'Hague Convention'],
    relatedPosts: [2, 3, 7],
  },
  {
    id: 2,
    title: 'Apostille vs legalisation: understanding the difference',
    slug: 'apostille-vs-legalisation-understanding-the-difference',
    excerpt: 'Not every country recognises an apostille — here\'s how to tell which process applies.',
    category: 'Legalisation',
    date: 'Aug 8, 2026',
    readTime: '6 min read',
    author: 'Michael Chen',
    authorRole: 'Legalisation Expert',
    authorAvatar: 'https://i.pravatar.cc/150?img=2',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop&crop=center',
    content: '<p>Content for blog post 2...</p>',
    tags: ['Legalisation', 'Apostille', 'Document Processing'],
    relatedPosts: [1, 4, 8],
  },
  {
    id: 3,
    title: 'Moving abroad? The documents immigration officers ask for first',
    slug: 'moving-abroad-the-documents-immigration-officers-ask-for-first',
    excerpt: 'A checklist of the paperwork most commonly requested at the start of a visa application.',
    category: 'Immigration',
    date: 'Aug 4, 2026',
    readTime: '7 min read',
    author: 'Emma Williams',
    authorRole: 'Immigration Consultant',
    authorAvatar: 'https://i.pravatar.cc/150?img=3',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=600&fit=crop&crop=center',
    content: '<p>Content for blog post 3...</p>',
    tags: ['Immigration', 'Visa', 'Document Checklist'],
    relatedPosts: [1, 5, 9],
  },
  {
    id: 4,
    title: 'UK visa processing times, updated for 2026',
    slug: 'uk-visa-processing-times-updated-for-2026',
    excerpt: 'Current turnaround times across the most common UK visa categories.',
    category: 'Visa Processing',
    date: 'Jul 30, 2026',
    readTime: '4 min read',
    author: 'David Okafor',
    authorRole: 'Visa Specialist',
    authorAvatar: 'https://i.pravatar.cc/150?img=4',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=600&fit=crop&crop=center',
    content: '<p>Content for blog post 4...</p>',
    tags: ['UK Visa', 'Processing Times', 'Immigration'],
    relatedPosts: [2, 6, 10],
  },
  {
    id: 5,
    title: 'Getting your degree recognised overseas',
    slug: 'getting-your-degree-recognised-overseas',
    excerpt: 'Why universities and employers abroad ask for apostilled academic transcripts.',
    category: 'Education Documents',
    date: 'Jul 26, 2026',
    readTime: '5 min read',
    author: 'Maria Garcia',
    authorRole: 'Education Consultant',
    authorAvatar: 'https://i.pravatar.cc/150?img=5',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=1200&h=600&fit=crop&crop=center',
    content: '<p>Content for blog post 5...</p>',
    tags: ['Education', 'Degree', 'International Recognition'],
    relatedPosts: [3, 7, 11],
  },
  {
    id: 6,
    title: 'FCDO legalisation office: what changed this year',
    slug: 'fcdo-legalisation-office-what-changed-this-year',
    excerpt: 'A summary of recent UK government updates affecting document legalisation.',
    category: 'UK Updates',
    date: 'Jul 22, 2026',
    readTime: '6 min read',
    author: 'James O\'Brien',
    authorRole: 'Legal Policy Analyst',
    authorAvatar: 'https://i.pravatar.cc/150?img=6',
    image: 'https://images.unsplash.com/photo-1526129318478-62ed8076c274?w=1200&h=600&fit=crop&crop=center',
    content: '<p>Content for blog post 6...</p>',
    tags: ['FCDO', 'UK Government', 'Legalisation'],
    relatedPosts: [2, 8, 12],
  },
  {
    id: 7,
    title: 'Marriage certificates: apostille requirements by country',
    slug: 'marriage-certificates-apostille-requirements-by-country',
    excerpt: 'A country-by-country look at how marriage certificates need to be legalised.',
    category: 'Apostille',
    date: 'Jul 18, 2026',
    readTime: '8 min read',
    author: 'Sarah Johnson',
    authorRole: 'Senior Apostille Specialist',
    authorAvatar: 'https://i.pravatar.cc/150?img=1',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&h=600&fit=crop&crop=center',
    content: '<p>Content for blog post 7...</p>',
    tags: ['Marriage Certificate', 'Apostille', 'International'],
    relatedPosts: [1, 5, 13],
  },
  {
    id: 8,
    title: 'Corporate documents and the apostille process explained',
    slug: 'corporate-documents-and-the-apostille-process-explained',
    excerpt: 'What businesses need to know before expanding or signing contracts abroad.',
    category: 'Legalisation',
    date: 'Jul 14, 2026',
    readTime: '6 min read',
    author: 'Michael Chen',
    authorRole: 'Legalisation Expert',
    authorAvatar: 'https://i.pravatar.cc/150?img=2',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop&crop=center',
    content: '<p>Content for blog post 8...</p>',
    tags: ['Corporate', 'Business', 'Apostille'],
    relatedPosts: [2, 6, 9],
  },
];

// Category icons mapping
const categoryIcons = {
  Apostille: Stamp,
  Legalisation: FileCheck2,
  Immigration: Plane,
  'Visa Processing': BadgeCheck,
  'Education Documents': GraduationCap,
  'UK Updates': Landmark,
};

// Category colors
const categoryColors = {
  Apostille: '#0F4C81',
  Legalisation: '#1E3A5F',
  Immigration: '#1E6BB8',
  'Visa Processing': '#0B1220',
  'Education Documents': '#0B3D68',
  'UK Updates': '#0F4C81',
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const BlogDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Find the current post by slug
    const currentPost = blogPosts.find(p => p.slug === slug);
    if (currentPost) {
      setPost(currentPost);
      
      // Get related posts
      const related = blogPosts.filter(p => 
        currentPost.relatedPosts.includes(p.id) && p.id !== currentPost.id
      );
      setRelatedPosts(related);
    } else {
      // If post not found, redirect to blog list
      navigate('/blog');
    }
  }, [slug, navigate]);

  // Get category icon
  const getCategoryIcon = (category) => {
    const Icon = categoryIcons[category];
    return Icon || Tag;
  };

  // Get category color
  const getCategoryColor = (category) => {
    return categoryColors[category] || '#0F4C81';
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p style={{ color: 'var(--text-secondary)' }}>Loading article...</p>
        </div>
      </div>
    );
  }

  const CategoryIcon = getCategoryIcon(post.category);
  const categoryColor = getCategoryColor(post.category);

  return (
    <section className="py-12 lg:py-16" style={{ background: 'var(--background)' }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-sm font-medium mb-8 transition-colors hover:text-[#D4AF37]"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={16} strokeWidth={2} />
          Back to Blog
        </motion.button>

        {/* Blog Header */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mb-8"
        >
          {/* Category Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide mb-4"
            style={{
              background: `${categoryColor}15`,
              color: categoryColor,
              border: `1px solid ${categoryColor}20`,
            }}
          >
            <CategoryIcon size={14} strokeWidth={2} />
            {post.category}
          </div>

          {/* Title */}
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4"
            style={{ fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}
          >
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <div className="flex items-center gap-2">
              <img
                src={post.authorAvatar}
                alt={post.author}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                {post.author}
              </span>
            </div>
            <span className="w-px h-4" style={{ background: 'var(--border)' }} />
            <div className="flex items-center gap-1.5">
              <Calendar size={14} strokeWidth={2} />
              <span>{post.date}</span>
            </div>
            <span className="w-px h-4" style={{ background: 'var(--border)' }} />
            <div className="flex items-center gap-1.5">
              <Clock size={14} strokeWidth={2} />
              <span>{post.readTime}</span>
            </div>
            <span className="w-px h-4" style={{ background: 'var(--border)' }} />
            <div className="flex items-center gap-1.5">
              <Eye size={14} strokeWidth={2} />
              <span>2.5K views</span>
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden mb-10 shadow-xl"
          style={{ aspectRatio: '16/9' }}
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </motion.div>

        {/* Blog Content */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="prose prose-lg max-w-none mb-12"
          style={{
            color: 'var(--text-secondary)',
          }}
        >
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="blog-content"
            style={{
              fontFamily: 'Inter, sans-serif',
            }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: 'var(--surface)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Author & Share Section */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="p-6 rounded-2xl mb-12"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
          }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={post.authorAvatar}
                alt={post.author}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {post.author}
                </p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {post.authorRole}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="p-2 rounded-xl transition-all duration-300 hover:scale-110"
                style={{
                  background: isLiked ? 'rgba(239, 68, 68, 0.1)' : 'var(--background)',
                  color: isLiked ? '#EF4444' : 'var(--text-secondary)',
                }}
              >
                <Heart size={18} fill={isLiked ? '#EF4444' : 'none'} />
              </button>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="p-2 rounded-xl transition-all duration-300 hover:scale-110"
                style={{
                  background: isBookmarked ? 'rgba(212, 175, 55, 0.1)' : 'var(--background)',
                  color: isBookmarked ? '#D4AF37' : 'var(--text-secondary)',
                }}
              >
                <Bookmark size={18} fill={isBookmarked ? '#D4AF37' : 'none'} />
              </button>
              <span className="w-px h-6" style={{ background: 'var(--border)' }} />
              <button className="p-2 rounded-xl hover:bg-[#1877F2]/10 transition-colors" style={{ color: '#1877F2' }}>
                <Facebook size={18} />
              </button>
              <button className="p-2 rounded-xl hover:bg-[#000000]/10 transition-colors" style={{ color: '#000000' }}>
                <Twitter size={18} />
              </button>
              <button className="p-2 rounded-xl hover:bg-[#0A66C2]/10 transition-colors" style={{ color: '#0A66C2' }}>
                <Linkedin size={18} />
              </button>
              <button className="p-2 rounded-xl hover:bg-[#EA4335]/10 transition-colors" style={{ color: '#EA4335' }}>
                <Mail size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <h2
                className="text-2xl font-bold"
                style={{ fontFamily: "'Fraunces', serif", color: 'var(--text-primary)' }}
              >
                Related Articles
              </h2>
              <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => {
                const RelatedIcon = getCategoryIcon(relatedPost.category);
                const relatedColor = getCategoryColor(relatedPost.category);
                
                return (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div
                      className="relative h-40 overflow-hidden"
                      style={{ background: `${relatedColor}20` }}
                    >
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <span
                        className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide"
                        style={{
                          background: 'rgba(212,175,55,0.9)',
                          color: 'var(--dark)',
                        }}
                      >
                        {relatedPost.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3
                        className="text-sm font-semibold leading-snug line-clamp-2 mb-2"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-light)' }}>
                        <span>{relatedPost.date}</span>
                        <span className="w-px h-3" style={{ background: 'var(--border)' }} />
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-12 p-8 rounded-2xl text-center"
          style={{
            background: 'linear-gradient(135deg, #0F4C81, #0B3D68)',
          }}
        >
          <h3
            className="text-2xl font-bold text-white mb-2"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Need Help with Your Documents?
          </h3>
          <p className="text-white/80 mb-6">
            Our experts are ready to assist you with apostille and legalisation services.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                color: '#0B1220',
              }}
            >
              Start Your Order
            </button>
            <button
              className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:bg-white/10"
              style={{
                border: '2px solid rgba(255,255,255,0.3)',
              }}
            >
              Contact Support
            </button>
          </div>
        </motion.div>
      </div>

      {/* Custom Styles for Blog Content */}
      <style jsx>{`
        .blog-content h2 {
          font-family: "'Fraunces', serif";
          font-size: 1.8rem;
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          color: var(--text-primary);
        }
        .blog-content h3 {
          font-family: "'Fraunces', serif";
          font-size: 1.4rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }
        .blog-content p {
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 1.25rem;
          color: var(--text-secondary);
        }
        .blog-content ul, .blog-content ol {
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
          color: var(--text-secondary);
        }
        .blog-content li {
          margin-bottom: 0.5rem;
          line-height: 1.6;
        }
        .blog-content strong {
          color: var(--text-primary);
          font-weight: 600;
        }
        .blog-content blockquote {
          padding: 1rem 1.5rem;
          margin: 1.5rem 0;
          border-left: 4px solid #D4AF37;
          background: rgba(212, 175, 55, 0.05);
          border-radius: 0.5rem;
          font-style: italic;
          color: var(--text-secondary);
        }
      `}</style>
    </section>
  );
};

export default BlogDetailsPage;