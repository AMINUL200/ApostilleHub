import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Send,
  ChevronRight,
  Clock,
  Award,
  Globe,
  FileCheck,
  Building2,
  PenTool,
  Languages,
  HelpCircle,
  PackageCheck,
  ShieldCheck,
  FileText,
  Users,
  Headphones,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: {
      title: 'Company',
      icon: Building2,
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
      ],
    },
    services: {
      title: 'Services',
      icon: Shield,
      links: [
        { name: 'Apostille Services', path: '/services/apostille' },
        { name: 'Embassy Legalisation', path: '/services/embassy-legalisation' },
        { name: 'Notary Services', path: '/services/notary' },
        { name: 'Translation Services', path: '/services/translation' },
        { name: 'Corporate Documents', path: '/services/corporate' },
        { name: 'Educational Documents', path: '/services/educational' },
      ],
    },
    support: {
      title: 'Support',
      icon: Headphones,
      links: [
        { name: 'Help Center', path: '/help' },
        { name: 'Track Order', path: '/track-order' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Terms & Conditions', path: '/terms' },
      ],
    },
  };

  const socialLinks = [
    { icon: Facebook, url: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Instagram, url: 'https://instagram.com', label: 'Instagram' },
    { icon: Youtube, url: 'https://youtube.com', label: 'YouTube' },
  ];

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'info@apostillehub.com', href: 'mailto:info@apostillehub.com' },
    { icon: Phone, label: 'Phone', value: '+44 (0) 20 1234 5678', href: 'tel:+442012345678' },
    { icon: MapPin, label: 'Address', value: '123 Legal Street, London, UK' },
  ];

  const trustBadges = [
    { icon: Award, label: '10,000+ Documents Processed' },
    { icon: Globe, label: '150+ Countries Supported' },
    { icon: Clock, label: '24/7 Support Available' },
    { icon: ShieldCheck, label: '100% Satisfaction Guarantee' },
  ];

  return (
    <footer className="relative" style={{ background: '#0B1220' }}>
      {/* Top Decorative Line */}
      <div className="h-1" style={{ background: 'linear-gradient(90deg, #0F4C81, #D4AF37, #0F4C81)' }} />

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #D4AF37 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />

        {/* Footer Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #0F4C81, #1E6BB8)',
                  boxShadow: '0 4px 15px rgba(15, 76, 129, 0.3)',
                }}
              >
                <Shield className="w-6 h-6 text-[#D4AF37]" strokeWidth={2.5} />
              </div>
              <div>
                <span className="text-xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                  <span style={{ color: '#0F4C81' }}>Apostille</span>
                  <span style={{ color: '#D4AF37' }}>Hub</span>
                </span>
                <p className="text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: '#64748B' }}>
                  Document Legalisation
                </p>
              </div>
            </Link>

            <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
              Professional apostille and document legalisation services for individuals and businesses worldwide.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3">
              {trustBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-xl"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" style={{ color: '#D4AF37' }} />
                    <span className="text-[10px] font-medium" style={{ color: '#E2E8F0' }}>
                      {badge.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#64748B' }}>
                Follow Us
              </p>
              <div className="flex gap-2">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: '#94A3B8',
                      }}
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-4 flex items-center gap-2"
              style={{ color: '#F8FAFC' }}
            >
              <Building2 className="w-4 h-4" style={{ color: '#D4AF37' }} />
              {footerLinks.company.title}
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.company.links.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm transition-all duration-300 flex items-center gap-2 group"
                    style={{ color: '#94A3B8' }}
                  >
                    <span className="w-1 h-1 rounded-full transition-all duration-300 group-hover:w-2 group-hover:bg-[#D4AF37]" style={{ background: '#D4AF37' }} />
                    <span className="group-hover:text-[#D4AF37] transition-colors">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-4 flex items-center gap-2"
              style={{ color: '#F8FAFC' }}
            >
              <Shield className="w-4 h-4" style={{ color: '#D4AF37' }} />
              {footerLinks.services.title}
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.services.links.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm transition-all duration-300 flex items-center gap-2 group"
                    style={{ color: '#94A3B8' }}
                  >
                    <span className="w-1 h-1 rounded-full transition-all duration-300 group-hover:w-2 group-hover:bg-[#D4AF37]" style={{ background: '#D4AF37' }} />
                    <span className="group-hover:text-[#D4AF37] transition-colors">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-4 flex items-center gap-2"
              style={{ color: '#F8FAFC' }}
            >
              <Headphones className="w-4 h-4" style={{ color: '#D4AF37' }} />
              {footerLinks.support.title}
            </h3>
            <ul className="space-y-2.5 mb-6">
              {footerLinks.support.links.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm transition-all duration-300 flex items-center gap-2 group"
                    style={{ color: '#94A3B8' }}
                  >
                    <span className="w-1 h-1 rounded-full transition-all duration-300 group-hover:w-2 group-hover:bg-[#D4AF37]" style={{ background: '#D4AF37' }} />
                    <span className="group-hover:text-[#D4AF37] transition-colors">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="space-y-3 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#D4AF37' }} />
                    <div>
                      <p className="text-xs font-medium" style={{ color: '#64748B' }}>{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm hover:text-[#D4AF37] transition-colors"
                          style={{ color: '#E2E8F0' }}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm" style={{ color: '#E2E8F0' }}>{item.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="relative mt-16 pt-12 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4
                className="text-lg font-semibold mb-2 flex items-center gap-2"
                style={{ fontFamily: "'Fraunces', serif", color: '#F8FAFC' }}
              >
                <Sparkles className="w-5 h-5" style={{ color: '#D4AF37' }} />
                Subscribe to Our Newsletter
              </h4>
              <p className="text-sm" style={{ color: '#94A3B8' }}>
                Get the latest updates on services, special offers, and document legalisation news.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#F8FAFC',
                }}
              />
              <button
                className="group px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                  color: '#0B1220',
                }}
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <p className="text-xs" style={{ color: '#64748B' }}>
            &copy; {currentYear} ApostilleHub. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Link
              to="/privacy-policy"
              className="text-xs hover:text-[#D4AF37] transition-colors"
              style={{ color: '#64748B' }}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs hover:text-[#D4AF37] transition-colors"
              style={{ color: '#64748B' }}
            >
              Terms & Conditions
            </Link>
            <Link
              to="/cookies"
              className="text-xs hover:text-[#D4AF37] transition-colors"
              style={{ color: '#64748B' }}
            >
              Cookie Policy
            </Link>
            <div className="flex items-center gap-2 text-xs" style={{ color: '#64748B' }}>
              <Globe className="w-3.5 h-3.5" />
              <span>United Kingdom</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;