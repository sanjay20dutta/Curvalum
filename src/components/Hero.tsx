import React from 'react';
import { SiteContent } from '../types';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  CalendarCheck, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  Sliders
} from 'lucide-react';

interface HeroProps {
  content: SiteContent;
  onOpenBookNow: () => void;
  onExploreProducts: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  content,
  onOpenBookNow,
  onExploreProducts,
}) => {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-24 pb-16 flex items-center overflow-hidden bg-gradient-to-b from-slate-100/90 via-white to-slate-50 border-b border-slate-200"
    >
      {/* Subtle Architectural Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#0f172a 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Ambient glowing highlights */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-slate-300/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Brand message, CTAs */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-slate-100 text-xs font-semibold shadow-sm tracking-wide"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span className="uppercase tracking-wider text-[11px] font-bold">{content.hero.badge || 'Premium Aluminium Architectural Systems'}</span>
              <span className="w-1 h-1 rounded-full bg-indigo-400" />
              <span className="text-indigo-300 font-bold uppercase tracking-wider text-[11px]">Hyderabad</span>
            </motion.div>

            {/* Signature Headline matching brochure */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
                {content.hero.headlineStart}{' '}
                <span className="font-script text-indigo-600 italic relative inline-block text-5xl sm:text-6xl md:text-7xl lg:text-8xl px-2">
                  {content.hero.headlineHighlight}
                  <svg
                    className="absolute -bottom-2 left-2 right-2 w-[90%] h-3 text-indigo-600"
                    viewBox="0 0 100 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 9 C 30 2, 70 2, 98 8"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
              
              <p className="text-xs uppercase font-bold tracking-[0.2em] text-slate-500 pt-2">
                {content.brand.subtagline || 'Curve System Aluminium windows and doors'}
              </p>
            </motion.div>

            {/* Subtitle / Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-700 max-w-2xl leading-relaxed font-normal"
            >
              {content.hero.subheading}
            </motion.p>

            {/* Key Quality Assurances */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                <span>EPDM Quad Sealing</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                <span>Euro Groove Multi-Lock</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                <span>Whisper SS304 Rollers</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                id="hero-book-consultation-btn"
                onClick={onOpenBookNow}
                className="inline-flex items-center justify-center gap-3 px-7 py-3.5 text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-200 group"
              >
                <CalendarCheck className="w-5 h-5 text-indigo-200 group-hover:text-white transition-colors" />
                <span>{content.hero.primaryCta || 'Book a Free Site Consultation'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-explore-products-btn"
                onClick={onExploreProducts}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-sm hover:border-slate-400 transition-all duration-200"
              >
                <Sliders className="w-4 h-4 text-slate-600" />
                <span>{content.hero.secondaryCta || 'Explore Systems & Specs'}</span>
              </button>
            </motion.div>

            {/* Quick Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200/90"
            >
              {content.hero.stats.map((stat, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-slate-800">{stat.label}</div>
                  {stat.subtext && (
                    <div className="text-[11px] text-slate-500">{stat.subtext}</div>
                  )}
                </div>
              ))}
            </motion.div>

          </div>

          {/* Right Column: Architectural Visual Card & Interactive System Switcher */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative bg-white rounded-2xl p-4 shadow-xl border border-slate-200/90 overflow-hidden"
            >
              {/* Image Frame */}
              <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden group">
                <img
                  src={content.hero.heroImage}
                  alt="Curvalum Aluminium Sliding System Architecture"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                {/* Floating Architectural Badge */}
                <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Curvalum Engineering Lab</span>
                </div>

                {/* Bottom Overlay Pill */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3.5 rounded-lg shadow-lg border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Curvalum Architectural Systems
                    </div>
                    <div className="text-[11px] text-indigo-700 font-semibold">
                      Engineered Aluminium Windows & Doors
                    </div>
                  </div>
                  <button
                    onClick={onExploreProducts}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-slate-900 text-white hover:bg-indigo-600 transition-colors text-xs font-semibold"
                    title="View technical systems"
                  >
                    <span>Explore Systems</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Instant Quote Callout */}
              <div className="mt-3 bg-slate-900 text-white p-3.5 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold">Custom Sizes & Site Measurements</div>
                  <div className="text-[11px] text-slate-300">Hyderabad & Telangana Projects</div>
                </div>
                <button
                  onClick={onOpenBookNow}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition-colors whitespace-nowrap shadow-sm"
                >
                  Get Estimate
                </button>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
