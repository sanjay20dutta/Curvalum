import React from 'react';
import { SiteContent } from '../types';
import { CurvalumLogo } from './CurvalumLogo';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Linkedin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  ArrowUp,
  Settings,
  ShieldCheck,
  CalendarCheck
} from 'lucide-react';

interface FooterProps {
  content: SiteContent;
  onOpenAdmin: () => void;
  onOpenBookNow: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  content,
  onOpenAdmin,
  onOpenBookNow,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Products & Systems', href: '#products' },
    { label: 'Project Gallery', href: '#gallery' },
    { label: 'Why Curvalum', href: '#why-us' },
    { label: 'Contact Us', href: '#contact' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800/80">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <CurvalumLogo variant="white" size="lg" onClick={scrollToTop} />
            
            <div className="text-xs text-slate-400 leading-relaxed max-w-sm">
              <span className="text-white font-bold block mb-1">
                SLIDING INTO <span className="font-script text-indigo-400 text-lg">style</span>
              </span>
              Curvalum is a trusted manufacturer of premium aluminium window and door systems, delivering innovative solutions combining modern design, superior performance, and lasting durability.
            </div>

            {/* Social Media Links */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Official Channels (/curvalum)
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={content.brand.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-indigo-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={content.brand.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-indigo-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={content.brand.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-indigo-600 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={content.brand.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-indigo-600 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={content.brand.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-indigo-600 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-indigo-400 transition-colors block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Aluminium Systems Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Brochure Series
            </h4>
            <ul className="space-y-2 text-xs">
              {content.products.map((p) => (
                <li key={p.id}>
                  <a
                    href="#products"
                    className="text-slate-400 hover:text-indigo-400 transition-colors block py-0.5 flex items-center justify-between"
                  >
                    <span>{p.name}</span>
                    <span className="text-[10px] text-slate-600">{p.specs.shutterDepth}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Office Contact Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Hyderabad Facility
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span>{content.brand.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>{content.brand.phones.join(', ')}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>{content.brand.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>{content.brand.websiteUrl}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBookNow}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Request Project Estimate</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {content.brand.name}. All rights reserved.</span>
            <span>•</span>
            <span>Curve System Aluminium Windows and Doors</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Admin CMS Access */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors py-1 px-2.5 rounded bg-slate-900 border border-slate-800"
            >
              <Settings className="w-3.5 h-3.5 text-indigo-400" />
              <span>Admin CMS Panel</span>
            </button>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
