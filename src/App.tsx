/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SiteContent, QuoteBooking } from './types';
import { defaultContent } from './data/defaultContent';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProductCatalog } from './components/ProductCatalog';
import { ProjectGallery } from './components/ProjectGallery';
import { WhyChooseUs } from './components/WhyChooseUs';
import { BookNowSection } from './components/BookNowSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { 
  Phone, 
  MessageSquareShare, 
  CalendarCheck, 
  ArrowUp, 
  ShieldCheck 
} from 'lucide-react';

const STORAGE_CONTENT_KEY = 'curvalum_site_content_v1';
const STORAGE_QUOTES_KEY = 'curvalum_quote_bookings_v1';

export default function App() {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CONTENT_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not parse local storage content', e);
    }
    return defaultContent;
  });

  const [quoteBookings, setQuoteBookings] = useState<QuoteBooking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_QUOTES_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not parse local storage quotes', e);
    }
    return [
      {
        id: 'CRV-894210',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        fullName: 'K. Ramesh Varma (Architect)',
        phone: '+91 98499 12345',
        email: 'ramesh.varma@gmail.com',
        city: 'Jubilee Hills, Hyderabad',
        projectType: 'Luxury Villa',
        systemPreference: 'Curv Premium SL – 33',
        trackPreference: '3 Track – 4 Shutter + 2 Mesh Shutter',
        approximateAreaSqFt: '2400 sq. ft.',
        projectStage: 'Structure Ready / Immediate Measurement',
        message: 'Need sample profile finish swatch and site measurement for 4 master balcony sliders.',
        status: 'contacted',
      },
      {
        id: 'CRV-894211',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        fullName: 'Dr. Srinivas Rao',
        phone: '+91 99887 76655',
        email: 'dr.srinivas@yahoo.com',
        city: 'Kokapet, Hyderabad',
        projectType: 'Luxury Villa',
        systemPreference: 'S Fold – 50 (Slide & Fold System)',
        trackPreference: 'Slide and Fold S-50',
        approximateAreaSqFt: '800 sq. ft.',
        projectStage: 'Architectural Drawing / Planning Stage',
        message: 'Looking for panoramic patio bi-fold opening to pool deck.',
        status: 'new',
      },
    ];
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<string>('');
  const [activeSection, setActiveSection] = useState('home');

  // Save content updates to localStorage
  const handleSaveContent = (newContent: SiteContent) => {
    setContent(newContent);
    try {
      localStorage.setItem(STORAGE_CONTENT_KEY, JSON.stringify(newContent));
    } catch (e) {
      console.error('Failed to persist content', e);
    }
  };

  // Save quotes updates to localStorage
  const handleUpdateQuoteBookings = (newBookings: QuoteBooking[]) => {
    setQuoteBookings(newBookings);
    try {
      localStorage.setItem(STORAGE_QUOTES_KEY, JSON.stringify(newBookings));
    } catch (e) {
      console.error('Failed to persist quotes', e);
    }
  };

  const handleBookingSubmitted = (newBooking: QuoteBooking) => {
    const updated = [newBooking, ...quoteBookings];
    handleUpdateQuoteBookings(updated);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProductForQuote = (productName: string) => {
    setSelectedProductForQuote(productName);
    scrollToSection('book-now');
  };

  // Scrollspy effect
  useEffect(() => {
    const sections = ['home', 'about', 'products', 'gallery', 'why-us', 'book-now', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-cyan-500 selection:text-white relative">
      
      {/* Top Sticky Header */}
      <Header
        content={content}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenBookNow={() => scrollToSection('book-now')}
        activeSection={activeSection}
      />

      {/* Main One-Page Content */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          content={content}
          onOpenBookNow={() => scrollToSection('book-now')}
          onExploreProducts={() => scrollToSection('products')}
        />

        {/* 2. About Us Section (with Vision, Mission, Values) */}
        <AboutSection
          content={content}
          onOpenBookNow={() => scrollToSection('book-now')}
        />

        {/* 3. Products Catalog & Specifications (Pages 4-11) */}
        <ProductCatalog
          content={content}
          onSelectProductForQuote={handleSelectProductForQuote}
        />

        {/* 4. Project Gallery (Lazy-Loaded) */}
        <ProjectGallery
          content={content}
          onOpenBookNow={() => scrollToSection('book-now')}
        />

        {/* 6. Why Choose Us / Engineering Pillars */}
        <WhyChooseUs
          content={content}
          onOpenBookNow={() => scrollToSection('book-now')}
        />

        {/* 7. Book Now / Site Consultation & Quote Request */}
        <BookNowSection
          content={content}
          selectedDefaultProduct={selectedProductForQuote}
          onBookingSubmitted={handleBookingSubmitted}
        />

        {/* 8. Contact Section (Office, Numbers, Express Inquiry) */}
        <ContactSection
          content={content}
          onOpenBookNow={() => scrollToSection('book-now')}
        />
      </main>

      {/* Modern Footer */}
      <Footer
        content={content}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenBookNow={() => scrollToSection('book-now')}
      />

      {/* Floating Quick Action Bar (Mobile & Desktop) */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        {/* WhatsApp Quick Link */}
        <a
          id="floating-whatsapp-btn"
          href="https://wa.me/919849947164?text=Hi%20Curvalum%2C%20I%20am%20interested%20in%20aluminium%20windows%20and%20doors%20installation."
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-xl hover:shadow-emerald-600/30 transition-all hover:scale-110 flex items-center justify-center group"
          title="Chat on WhatsApp"
        >
          <MessageSquareShare className="w-5 h-5" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold pl-0 group-hover:pl-2">
            WhatsApp
          </span>
        </a>

        {/* Direct Call Button */}
        <a
          id="floating-call-btn"
          href="tel:+919849947164"
          className="p-3.5 bg-slate-900 hover:bg-cyan-700 text-white rounded-full shadow-xl hover:shadow-slate-900/30 transition-all hover:scale-110 flex items-center justify-center group"
          title="Call Curvalum"
        >
          <Phone className="w-5 h-5 text-cyan-400 group-hover:text-white" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold pl-0 group-hover:pl-2">
            +91 98499 47164
          </span>
        </a>

        {/* Scroll To Top (Up Button) */}
        <button
          id="floating-scroll-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="p-3.5 bg-white/95 backdrop-blur-md text-slate-800 hover:text-indigo-600 hover:bg-slate-50 rounded-full shadow-xl border border-slate-200/90 hover:border-indigo-200 transition-all hover:scale-110 flex items-center justify-center group"
          title="Back to Top"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>

      {/* Backend CMS Admin Panel Modal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        content={content}
        onSaveContent={handleSaveContent}
        quoteBookings={quoteBookings}
        onUpdateQuoteBookings={handleUpdateQuoteBookings}
      />

    </div>
  );
}
