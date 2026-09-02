import React, { useState } from 'react';
import { SiteContent } from '../types';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  Send, 
  MessageSquareShare, 
  CheckCircle2, 
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

interface ContactSectionProps {
  content: SiteContent;
  onOpenBookNow: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  content,
  onOpenBookNow,
}) => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const handleDirectInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;

    // Send via WhatsApp directly
    const text = `*Curvalum Quick Inquiry:*
• Name: ${inquiryName}
• Phone: ${inquiryPhone}
• Message: ${inquiryMsg || 'Interested in Aluminium Windows & Doors'}`;

    window.open(`https://wa.me/919849947164?text=${encodeURIComponent(text)}`, '_blank');
    setInquirySent(true);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold tracking-wider uppercase">
            <MapPin className="w-3.5 h-3.5 text-indigo-600" />
            <span>Connect with Curvalum</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Visit Our Hyderabad Facility or Call Us
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Direct access to aluminium fabrication consultants, profile sample kits, and architectural mockups.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Official Brochure Contact Info Cards */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Primary Office Address Card */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Corporate Office & Works
                  </h3>
                  <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                    {content.brand.officeAddress}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-indigo-700">
                    <span className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200">
                      City: {content.brand.city}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700">
                      PIN: {content.brand.pincode}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Phone Numbers Card */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="space-y-3 w-full">
                  <h3 className="text-lg font-bold text-slate-900">
                    Direct Sales & Site Consultation Lines
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {content.brand.phones.map((phone, idx) => (
                      <a
                        key={idx}
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 border border-slate-200 transition-colors group"
                      >
                        <Phone className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold text-slate-900">{phone}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Email & Digital Touchpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`mailto:${content.brand.email}`}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:border-indigo-400 transition-all flex items-center gap-3 group"
              >
                <div className="p-2.5 rounded-lg bg-slate-100 text-slate-800 group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs text-slate-500 font-semibold">Official Email</div>
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {content.brand.email}
                  </div>
                </div>
              </a>

              <a
                href={`https://${content.brand.websiteUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:border-indigo-400 transition-all flex items-center gap-3 group"
              >
                <div className="p-2.5 rounded-lg bg-slate-100 text-slate-800 group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-colors">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs text-slate-500 font-semibold">Official Portal</div>
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {content.brand.websiteUrl}
                  </div>
                </div>
              </a>
            </div>

            {/* Working Hours */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-indigo-400" />
                <div>
                  <div className="text-xs text-slate-400 font-semibold">Manufacturing & Showroom Hours</div>
                  <div className="text-xs font-bold text-white">{content.brand.workingHours}</div>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 text-[11px] font-bold rounded-md border border-emerald-500/30">
                Open for Visits
              </span>
            </div>

          </div>

          {/* Right Column: Quick WhatsApp / Express Inquiry Box */}
          <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Express Callback
              </span>
              <h3 className="text-2xl font-bold text-slate-900">
                Have a Quick Question?
              </h3>
              <p className="text-xs text-slate-600">
                Enter your number below to receive architectural catalogs, price guides, or a instant WhatsApp response.
              </p>
            </div>

            <form onSubmit={handleDirectInquiry} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Contact Number / WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98499 47164"
                  value={inquiryPhone}
                  onChange={(e) => setInquiryPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Brief Inquiry / Question
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Need price per sq ft for SL-33 sliding doors in Hyderabad"
                  value={inquiryMsg}
                  onChange={(e) => setInquiryMsg(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-colors shadow-lg shadow-emerald-600/10 flex items-center justify-center gap-2"
                >
                  <MessageSquareShare className="w-4 h-4" />
                  <span>Start Live WhatsApp Chat with Curvalum Team</span>
                </button>
              </div>

              {inquirySent && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp conversation window opened!</span>
                </div>
              )}
            </form>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                Hyderabad Manufacturing Unit
              </span>
              <span>Fast Track Delivery Available</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
