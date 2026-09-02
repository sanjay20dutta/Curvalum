import React, { useState } from 'react';
import { SiteContent, QuoteBooking } from '../types';
import { 
  CalendarCheck, 
  Send, 
  CheckCircle, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  MessageSquareShare, 
  Sparkles, 
  Layers, 
  Clock 
} from 'lucide-react';

interface BookNowSectionProps {
  content: SiteContent;
  selectedDefaultProduct?: string;
  onBookingSubmitted: (booking: QuoteBooking) => void;
}

export const BookNowSection: React.FC<BookNowSectionProps> = ({
  content,
  onBookingSubmitted,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Hyderabad');
  const [projectType, setProjectType] = useState('Luxury Villa');
  const [projectStage, setProjectStage] = useState('Structure Ready / Immediate Measurement');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<QuoteBooking | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setIsSubmitting(true);

    const newBooking: QuoteBooking = {
      id: `CRV-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      fullName,
      phone,
      email,
      city,
      projectType,
      projectStage,
      message,
      status: 'new',
    };

    setTimeout(() => {
      onBookingSubmitted(newBooking);
      setSubmittedBooking(newBooking);
      setIsSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setSubmittedBooking(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  const generateWhatsAppUrl = (booking: QuoteBooking) => {
    const text = `*New Curvalum Quote Request* [Ref: ${booking.id}]
• *Name:* ${booking.fullName}
• *Phone:* ${booking.phone}
• *Location:* ${booking.city}
• *Project Type:* ${booking.projectType}
• *Construction Stage:* ${booking.projectStage}
${booking.message ? `• *Note:* ${booking.message}` : ''}`;

    return `https://wa.me/919849947164?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="book-now" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold tracking-wider uppercase">
            <CalendarCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span>Direct Site Consultation & Estimation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Book a Free Site Consultation & Quote
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Get precision site measurements, 3D architectural profile recommendations, and factory-direct estimates from our technical team in Hyderabad.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {submittedBooking ? (
            <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white shadow-2xl border border-slate-800 text-center space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono font-bold">
                  Reference ID: {submittedBooking.id}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Consultation Request Received!
                </h3>
                <p className="text-slate-300 text-sm max-w-lg mx-auto">
                  Thank you, <span className="text-white font-bold">{submittedBooking.fullName}</span>. Our senior technical consultant will contact you at <span className="text-indigo-400 font-bold">{submittedBooking.phone}</span> within 2 hours.
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="bg-slate-800/80 p-6 rounded-2xl text-left max-w-lg mx-auto space-y-2.5 text-xs text-slate-300 border border-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-700">
                  <span className="text-slate-400">Project Type:</span>
                  <span className="font-bold text-white">{submittedBooking.projectType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-700">
                  <span className="text-slate-400">Construction Stage:</span>
                  <span className="font-bold text-white">{submittedBooking.projectStage}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-bold text-white">{submittedBooking.city}</span>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={generateWhatsAppUrl(submittedBooking)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors text-sm shadow-lg"
                >
                  <MessageSquareShare className="w-4 h-4" />
                  <span>Send to Curvalum WhatsApp Now</span>
                </a>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition-colors text-sm border border-slate-700"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Contact Info Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      id="quote-fullname"
                      type="text"
                      required
                      placeholder="e.g. Sanjay Dutta / Architect Reddy"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      id="quote-phone"
                      type="tel"
                      required
                      placeholder="e.g. +91 98499 47164"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Email Address
                    </label>
                    <input
                      id="quote-email"
                      type="email"
                      placeholder="e.g. yourname@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Site Location / City
                    </label>
                    <input
                      id="quote-city"
                      type="text"
                      placeholder="e.g. Jubilee Hills, Hyderabad / Gachibowli"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    />
                  </div>
                </div>

                {/* Project Specs Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-200">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Project Type
                    </label>
                    <select
                      id="quote-project-type"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600"
                    >
                      <option value="Luxury Villa">Luxury Villa</option>
                      <option value="Apartment / Penthouse">Apartment / Penthouse</option>
                      <option value="Commercial Office / Building">Commercial Office / Building</option>
                      <option value="Hotel & Resort">Hotel & Resort</option>
                      <option value="Hostel / Educational">Hostel / Educational</option>
                      <option value="Renovation & Replacement">Renovation & Replacement</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Current Construction Stage
                    </label>
                    <select
                      id="quote-stage"
                      value={projectStage}
                      onChange={(e) => setProjectStage(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600"
                    >
                      <option value="Structure Ready / Immediate Measurement">Structure Ready / Immediate Measurement</option>
                      <option value="Brickwork / Plastering in Progress">Brickwork / Plastering in Progress</option>
                      <option value="Architectural Drawing / Planning Stage">Architectural Drawing / Planning Stage</option>
                      <option value="Replacing Old Existing Windows">Replacing Old Existing Windows</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Project Requirements / Window Sizes / Notes
                  </label>
                  <textarea
                    id="quote-message"
                    rows={3}
                    placeholder="Tell us about number of openings, double glazing (DGU) needs, powder coating color preferences (Black, Charcoal Grey, Wood-finish), or specific requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                  />
                </div>

                <div className="pt-2">
                  <button
                    id="quote-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 group disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Submitting Request...</span>
                    ) : (
                      <>
                        <Send className="w-5 h-5 text-indigo-200 group-hover:text-white transition-colors" />
                        <span>Submit Consultation & Quote Request</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-6 text-xs text-slate-500 pt-2 text-center">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-indigo-600" />
                    Zero Commitment Estimate
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    Fast 2-Hour Response
                  </span>
                </div>

              </form>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
