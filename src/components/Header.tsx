import React, { useState, useEffect } from 'react';
import { CurvalumLogo } from './CurvalumLogo';
import { SiteContent } from '../types';
import { 
  Phone, 
  Menu, 
  X, 
  ArrowRight, 
  CalendarCheck, 
  MessageSquareShare
} from 'lucide-react';

interface HeaderProps {
  content: SiteContent;
  onOpenAdmin?: () => void;
  onOpenBookNow: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  content,
  onOpenBookNow,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About Us', href: '#about', id: 'about' },
    { label: 'Products & Systems', href: '#products', id: 'products' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Why Curvalum', href: '#why-us', id: 'why-us' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5 sm:py-3'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <CurvalumLogo 
              variant="dark"
              size="md"
              onClick={() => handleNavClick('#home')}
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  id={`nav-${link.id}`}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors relative whitespace-nowrap ${
                    isActive
                      ? 'text-indigo-600 font-bold bg-indigo-50'
                      : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-indigo-600 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Header Action Buttons - Number & Book Quote in same place across all views */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Direct Phone Call */}
            <a
              id="header-phone-btn"
              href={`tel:${content.brand.phones[0]?.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100/80 rounded-lg transition-colors border border-slate-200 shadow-sm"
              title="Call Sales Team"
            >
              <Phone className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              <span className="hidden sm:inline">{content.brand.phones[0] || '+91 98499 47164'}</span>
              <span className="inline sm:hidden text-[11px] font-bold">Call</span>
            </a>

            {/* Book Now / Free Quote Button */}
            <button
              id="header-book-now-btn"
              onClick={onOpenBookNow}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow transition-all duration-200 group whitespace-nowrap"
            >
              <CalendarCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-200 group-hover:text-white transition-colors" />
              <span>Book Quote</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform hidden sm:inline" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200 lg:hidden transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu (menu drops down below header) */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-4 duration-200"
        >
          <div className="py-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                id={`mobile-nav-${link.id}`}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`block px-3 py-2.5 text-base font-medium rounded-lg ${
                  activeSection === link.id
                    ? 'text-indigo-600 bg-indigo-50 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              <a
                id="mobile-drawer-call"
                href={`tel:${content.brand.phones[0]?.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-100 text-slate-800 font-semibold rounded-lg text-sm border border-slate-200"
              >
                <Phone className="w-4 h-4 text-indigo-600" />
                <span>Call Directly</span>
              </a>

              <a
                id="mobile-drawer-whatsapp"
                href={`https://wa.me/919849947164?text=${encodeURIComponent('Hi Curvalum Team, I am interested in aluminium window and door systems for my project.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-50 text-emerald-700 font-semibold rounded-lg text-sm border border-emerald-200"
              >
                <MessageSquareShare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
