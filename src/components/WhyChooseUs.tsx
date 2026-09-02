import React from 'react';
import { SiteContent } from '../types';
import { 
  VolumeX, 
  Lock, 
  Sliders, 
  Eye, 
  SunDim, 
  Palette, 
  ShieldCheck, 
  CheckCircle2, 
  Award,
  Sparkles
} from 'lucide-react';

interface WhyChooseUsProps {
  content: SiteContent;
  onOpenBookNow: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ content, onOpenBookNow }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'VolumeX': return <VolumeX className="w-6 h-6 text-indigo-400" />;
      case 'Lock': return <Lock className="w-6 h-6 text-indigo-400" />;
      case 'Sliders': return <Sliders className="w-6 h-6 text-indigo-400" />;
      case 'Eye': return <Eye className="w-6 h-6 text-indigo-400" />;
      case 'SunDim': return <SunDim className="w-6 h-6 text-indigo-400" />;
      case 'Palette': return <Palette className="w-6 h-6 text-indigo-400" />;
      default: return <ShieldCheck className="w-6 h-6 text-indigo-400" />;
    }
  };

  return (
    <section id="why-us" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background architectural glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-0 w-96 h-96 bg-slate-800/40 rounded-full blur-2xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-950 border border-indigo-700/50 text-indigo-300 text-xs font-bold tracking-wider uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>{content.whyChooseUs.sectionTag || 'Engineering Excellence'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {content.whyChooseUs.heading}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {content.whyChooseUs.subheading}
          </p>
        </div>

        {/* 6 Core Engineering Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {content.whyChooseUs.features.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-2xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500/60 shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 group-hover:border-indigo-400 flex items-center justify-center transition-colors">
                  {getIcon(item.icon)}
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-700/60 flex items-center gap-1.5 text-xs text-indigo-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Certified Tested Benchmark</span>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Trust Banner */}
        <div className="bg-gradient-to-r from-indigo-950/90 via-slate-800 to-slate-900 rounded-2xl p-8 border border-indigo-700/30 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Full-Stack Manufacture & Installation in Hyderabad</span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              Ready to Upgrade Your Architectural Project?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
              Get an accurate quote calculated with exact profile weights, DGU glass acoustic ratings, and certified installation technicians.
            </p>
          </div>

          <button
            onClick={onOpenBookNow}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 whitespace-nowrap"
          >
            Request Official Project Quote
          </button>
        </div>

      </div>
    </section>
  );
};
