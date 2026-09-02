import React from 'react';
import { SiteContent } from '../types';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Cpu, 
  Users, 
  Leaf, 
  Award, 
  Sparkles, 
  Target, 
  Compass, 
  Check, 
  Building2, 
  Wrench, 
  Layers
} from 'lucide-react';

interface AboutSectionProps {
  content: SiteContent;
  onOpenBookNow: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ content, onOpenBookNow }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-indigo-600" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-indigo-600" />;
      case 'Users': return <Users className="w-5 h-5 text-indigo-600" />;
      case 'Leaf': return <Leaf className="w-5 h-5 text-indigo-600" />;
      case 'Award': return <Award className="w-5 h-5 text-indigo-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-indigo-600" />;
      default: return <ShieldCheck className="w-5 h-5 text-indigo-600" />;
    }
  };

  return (
    <section id="about" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold tracking-wider uppercase">
            <Building2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>{content.about.sectionTag || 'About Curvalum'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {content.about.heading}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed pt-2">
            Combining architectural precision, state-of-the-art European hardware, and bespoke aluminium profiles engineered in Hyderabad for Indian climates.
          </p>
        </div>

        {/* 2-Column Grid: Narrative & Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Column: Authentic Brochure Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="prose prose-slate max-w-none space-y-4 text-slate-700 leading-relaxed">
              <p className="text-lg font-medium text-slate-900 leading-relaxed">
                {content.about.introParagraph}
              </p>
              <p>
                {content.about.secondaryParagraph}
              </p>
              <p className="bg-slate-50 p-4 rounded-xl border-l-4 border-indigo-600 text-slate-800 font-medium">
                {content.about.engineeringParagraph}
              </p>
            </div>

            {/* Engineering Highlights Quick List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50/80 border border-slate-100">
                <div className="p-1.5 rounded-md bg-indigo-100/80 text-indigo-800 mt-0.5">
                  <Check className="w-4 h-4 text-indigo-700" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Custom Architectural Profiling</h4>
                  <p className="text-xs text-slate-600">Tailored to exact structural and wind load requirements.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50/80 border border-slate-100">
                <div className="p-1.5 rounded-md bg-indigo-100/80 text-indigo-800 mt-0.5">
                  <Check className="w-4 h-4 text-indigo-700" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Precision Euro Groove System</h4>
                  <p className="text-xs text-slate-600">Seamless integration of multi-point security hardware.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50/80 border border-slate-100">
                <div className="p-1.5 rounded-md bg-indigo-100/80 text-indigo-800 mt-0.5">
                  <Check className="w-4 h-4 text-indigo-700" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">EPDM Quad Weather Resistance</h4>
                  <p className="text-xs text-slate-600">Prevents water seepage, dust ingress, and thermal leaks.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50/80 border border-slate-100">
                <div className="p-1.5 rounded-md bg-indigo-100/80 text-indigo-800 mt-0.5">
                  <Check className="w-4 h-4 text-indigo-700" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">10-Year Hardware Reliability</h4>
                  <p className="text-xs text-slate-600">Stainless steel 304 components for effortless gliding.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBookNow}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
              >
                Schedule Architectural Consultation
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Photography & Experience Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900">
              <img
                src={content.about.aboutImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'}
                alt="Curvalum Modern Living Architectural Aluminium Windows"
                className="w-full h-[460px] object-cover"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <div className="inline-block px-2.5 py-1 rounded bg-indigo-600 text-white font-extrabold text-xs uppercase tracking-wider">
                  Engineered in Hyderabad
                </div>
                <h3 className="text-xl font-bold">
                  Designed for Modern Living & Panoramic Horizons
                </h3>
                <p className="text-xs text-slate-300">
                  Precision engineered sliding, folding, and casement profiles built to inspire modern spaces.
                </p>
              </div>
            </div>

            {/* Experience Floating Badge */}
            <div className="absolute -top-4 -right-4 sm:-right-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center text-indigo-400 font-extrabold text-xl">
                10+
              </div>
              <div>
                <div className="text-xs font-extrabold text-slate-900">Years Guarantee</div>
                <div className="text-[11px] text-slate-500">Aluminium & Hardware</div>
              </div>
            </div>
          </div>

        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          
          {/* Vision Card */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Compass className="w-32 h-32 text-indigo-400" />
            </div>
            <div className="relative z-10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white">
                {content.about.visionTitle}
              </h3>
              <p className="text-slate-300 text-base leading-relaxed">
                {content.about.visionText}
              </p>
            </div>
          </div>

          {/* Mission Card */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Target className="w-32 h-32 text-indigo-400" />
            </div>
            <div className="relative z-10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white">
                {content.about.missionTitle}
              </h3>
              <p className="text-slate-200 text-base leading-relaxed">
                {content.about.missionText}
              </p>
            </div>
          </div>

        </div>

        {/* Core Values 6-Card Grid matching brochure */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Core Values
            </h3>
            <p className="text-sm text-slate-600">
              The principles that guide every profile extrusion, corner assembly, and installation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.about.values.map((val, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-white group-hover:bg-indigo-50 border border-slate-200 group-hover:border-indigo-200 flex items-center justify-center mb-4 transition-colors">
                  {getIcon(val.iconName)}
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2 group-hover:text-indigo-800 transition-colors">
                  {val.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
