import React, { useState } from 'react';
import { SiteContent, ProductItem, GalleryItem, QuoteBooking } from '../types';
import { defaultContent } from '../data/defaultContent';
import { 
  X, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Eye, 
  EyeOff,
  Sliders, 
  Image as ImageIcon, 
  MessageSquare, 
  Building, 
  ShieldCheck, 
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Globe,
  FileText,
  Lock,
  Unlock,
  KeyRound,
  LogOut,
  AlertCircle
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  content: SiteContent;
  onSaveContent: (newContent: SiteContent) => void;
  quoteBookings: QuoteBooking[];
  onUpdateQuoteBookings: (bookings: QuoteBooking[]) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  content,
  onSaveContent,
  quoteBookings,
  onUpdateQuoteBookings,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('curvalum_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<
    'brand' | 'hero' | 'about' | 'products' | 'gallery' | 'quotes' | 'raw_json'
  >('brand');
  const [formData, setFormData] = useState<SiteContent>(JSON.parse(JSON.stringify(content)));
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === '$Anjay@20') {
      setIsAuthenticated(true);
      sessionStorage.setItem('curvalum_admin_auth', 'true');
      setAuthError('');
      setPasswordInput('');
    } else {
      setAuthError('Invalid administrator password. Access denied.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('curvalum_admin_auth');
    setPasswordInput('');
    setAuthError('');
  };

  // If not authenticated, display password prompt
  if (!isAuthenticated) {
    return (
      <div
        id="admin-auth-modal"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      >
        <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center mx-auto shadow-sm">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Curvalum CMS Administration
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
              Please enter the administrator password to access the live content management dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <input
                  id="admin-password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (authError) setAuthError('');
                  }}
                  placeholder="Enter administrator password..."
                  className="w-full pl-4 pr-11 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-medium"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {authError && (
                <div className="flex items-center gap-1.5 text-xs text-rose-600 font-semibold mt-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-400">
              Curvalum Aluminium Windows & Doors • Secure Access
            </span>
          </div>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    onSaveContent(formData);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Reset all website content, products, and gallery to the official Curvalum brochure defaults?')) {
      setFormData(JSON.parse(JSON.stringify(defaultContent)));
      onSaveContent(defaultContent);
      setSaveSuccessMsg(true);
      setTimeout(() => setSaveSuccessMsg(false), 3000);
    }
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `curvalum-cms-export-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          setFormData(parsed);
          onSaveContent(parsed);
          alert('Site content successfully imported!');
        } catch (err) {
          alert('Invalid JSON file format.');
        }
      };
    }
  };

  const handleUpdateBookingStatus = (id: string, status: QuoteBooking['status']) => {
    const updated = quoteBookings.map((b) => (b.id === id ? { ...b, status } : b));
    onUpdateQuoteBookings(updated);
  };

  const handleDeleteBooking = (id: string) => {
    if (window.confirm('Delete this quote inquiry record?')) {
      const updated = quoteBookings.filter((b) => b.id !== id);
      onUpdateQuoteBookings(updated);
    }
  };

  return (
    <div
      id="admin-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl max-w-6xl w-full h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Admin Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg text-white">Curvalum CMS Admin Dashboard</h3>
                <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-bold text-[10px] uppercase">
                  Live Editor
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Edit branding, hero, products, specs, gallery & manage quote bookings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {saveSuccessMsg && (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-800">
                <Check className="w-4 h-4" />
                <span>Changes Saved Live!</span>
              </span>
            )}

            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-lg transition-colors shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Save & Publish</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs rounded-lg transition-colors border border-slate-700"
              title="Lock Admin Session (Sign Out)"
            >
              <LogOut className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Lock / Sign Out</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Close Admin"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 px-6 py-2 border-b border-slate-200 flex items-center justify-between overflow-x-auto gap-2 flex-shrink-0">
          <div className="flex items-center gap-1.5">
            {[
              { id: 'brand', label: 'Brand & Contact', icon: Building },
              { id: 'hero', label: 'Hero & Headlines', icon: Sparkles },
              { id: 'about', label: 'About & Values', icon: ShieldCheck },
              { id: 'products', label: 'Products & Specs', icon: Sliders },
              { id: 'gallery', label: 'Gallery Portfolio', icon: ImageIcon },
              { id: 'quotes', label: `Quotes (${quoteBookings.length})`, icon: MessageSquare },
              { id: 'raw_json', label: 'Backup & JSON', icon: FileText },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleResetToDefaults}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-md transition-colors font-semibold"
            title="Reset to Brochure Defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>

        {/* Scrollable CMS Form Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-50">
          
          {/* TAB 1: Brand & Contact */}
          {activeTab === 'brand' && (
            <div className="max-w-4xl space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                  Brand Identity & Taglines (Brochure)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Brand Name</label>
                    <input
                      type="text"
                      value={formData.brand.name}
                      onChange={(e) => setFormData({ ...formData, brand: { ...formData.brand, name: e.target.value } })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Cursive Signature Tagline</label>
                    <input
                      type="text"
                      value={formData.brand.cursiveTagline}
                      onChange={(e) => setFormData({ ...formData, brand: { ...formData.brand, cursiveTagline: e.target.value } })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Brochure Subheading Tagline</label>
                  <input
                    type="text"
                    value={formData.brand.subtagline}
                    onChange={(e) => setFormData({ ...formData, brand: { ...formData.brand, subtagline: e.target.value } })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                  />
                </div>
              </div>

              {/* Office Address & Phones */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                  Official Hyderabad Facility & Contact Lines
                </h4>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Office Address</label>
                  <textarea
                    rows={2}
                    value={formData.brand.officeAddress}
                    onChange={(e) => setFormData({ ...formData, brand: { ...formData.brand, officeAddress: e.target.value } })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone 1</label>
                    <input
                      type="text"
                      value={formData.brand.phones[0] || ''}
                      onChange={(e) => {
                        const newPhones = [...formData.brand.phones];
                        newPhones[0] = e.target.value;
                        setFormData({ ...formData, brand: { ...formData.brand, phones: newPhones } });
                      }}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone 2</label>
                    <input
                      type="text"
                      value={formData.brand.phones[1] || ''}
                      onChange={(e) => {
                        const newPhones = [...formData.brand.phones];
                        newPhones[1] = e.target.value;
                        setFormData({ ...formData, brand: { ...formData.brand, phones: newPhones } });
                      }}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.brand.email}
                      onChange={(e) => setFormData({ ...formData, brand: { ...formData.brand, email: e.target.value } })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Official Website</label>
                    <input
                      type="text"
                      value={formData.brand.websiteUrl}
                      onChange={(e) => setFormData({ ...formData, brand: { ...formData.brand, websiteUrl: e.target.value } })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Working Hours</label>
                    <input
                      type="text"
                      value={formData.brand.workingHours}
                      onChange={(e) => setFormData({ ...formData, brand: { ...formData.brand, workingHours: e.target.value } })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Hero Section */}
          {activeTab === 'hero' && (
            <div className="max-w-4xl space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                  Hero Section Text & CTAs
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Headline Start</label>
                    <input
                      type="text"
                      value={formData.hero.headlineStart}
                      onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, headlineStart: e.target.value } })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Highlight Word (Script)</label>
                    <input
                      type="text"
                      value={formData.hero.headlineHighlight}
                      onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, headlineHighlight: e.target.value } })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Hero Badge Text</label>
                    <input
                      type="text"
                      value={formData.hero.badge}
                      onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, badge: e.target.value } })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Hero Subheading</label>
                  <textarea
                    rows={3}
                    value={formData.hero.subheading}
                    onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, subheading: e.target.value } })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Hero Image URL</label>
                  <input
                    type="text"
                    value={formData.hero.heroImage}
                    onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, heroImage: e.target.value } })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Primary CTA Button</label>
                    <input
                      type="text"
                      value={formData.hero.primaryCta}
                      onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, primaryCta: e.target.value } })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Secondary CTA Button</label>
                    <input
                      type="text"
                      value={formData.hero.secondaryCta}
                      onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, secondaryCta: e.target.value } })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: About & Values */}
          {activeTab === 'about' && (
            <div className="max-w-4xl space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                  About Us Brochure Narrative
                </h4>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Main Heading</label>
                  <input
                    type="text"
                    value={formData.about.heading}
                    onChange={(e) => setFormData({ ...formData, about: { ...formData.about, heading: e.target.value } })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Introductory Paragraph</label>
                  <textarea
                    rows={3}
                    value={formData.about.introParagraph}
                    onChange={(e) => setFormData({ ...formData, about: { ...formData.about, introParagraph: e.target.value } })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Secondary Range Paragraph</label>
                  <textarea
                    rows={3}
                    value={formData.about.secondaryParagraph}
                    onChange={(e) => setFormData({ ...formData, about: { ...formData.about, secondaryParagraph: e.target.value } })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Engineering Focus Paragraph</label>
                  <textarea
                    rows={3}
                    value={formData.about.engineeringParagraph}
                    onChange={(e) => setFormData({ ...formData, about: { ...formData.about, engineeringParagraph: e.target.value } })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Our Vision</label>
                    <textarea
                      rows={3}
                      value={formData.about.visionText}
                      onChange={(e) => setFormData({ ...formData, about: { ...formData.about, visionText: e.target.value } })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Our Mission</label>
                    <textarea
                      rows={3}
                      value={formData.about.missionText}
                      onChange={(e) => setFormData({ ...formData, about: { ...formData.about, missionText: e.target.value } })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                    />
                  </div>
                </div>

                {/* About Section Architectural Image Option */}
                <div className="pt-4 border-t border-slate-200">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    About Section Architectural Image URL
                  </label>
                  <p className="text-[11px] text-slate-500 mb-2">
                    Set custom high-resolution architectural photography displayed beside the About Us company story.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <div className="flex-1 w-full space-y-2.5">
                      <input
                        type="text"
                        value={formData.about.aboutImage || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            about: { ...formData.about, aboutImage: e.target.value },
                          })
                        }
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 font-mono"
                      />

                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-600 block">
                          Architectural Presets:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                about: {
                                  ...formData.about,
                                  aboutImage:
                                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
                                },
                              })
                            }
                            className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs rounded border border-slate-200 transition-colors font-medium"
                          >
                            Modern Luxury Villa
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                about: {
                                  ...formData.about,
                                  aboutImage:
                                    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
                                },
                              })
                            }
                            className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs rounded border border-slate-200 transition-colors font-medium"
                          >
                            Floor-to-Ceiling Glazing
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                about: {
                                  ...formData.about,
                                  aboutImage:
                                    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
                                },
                              })
                            }
                            className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs rounded border border-slate-200 transition-colors font-medium"
                          >
                            Estate Architecture
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                about: {
                                  ...formData.about,
                                  aboutImage:
                                    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
                                },
                              })
                            }
                            className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs rounded border border-slate-200 transition-colors font-medium"
                          >
                            Contemporary Interior
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Live Image Preview Thumbnail */}
                    <div className="w-full sm:w-36 h-28 rounded-xl overflow-hidden border border-slate-200 bg-slate-900 flex-shrink-0 relative shadow-sm">
                      <img
                        src={
                          formData.about.aboutImage ||
                          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
                        }
                        alt="About Us Live Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
                        }}
                      />
                      <div className="absolute bottom-1 right-1 bg-slate-900/80 text-[10px] text-white px-1.5 py-0.5 rounded font-mono">
                        Preview
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Products & Specs */}
          {activeTab === 'products' && (
            <div className="max-w-5xl space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                  Aluminium System Catalog ({formData.products.length} Products)
                </h4>
                <button
                  onClick={() => {
                    const newProd: ProductItem = {
                      id: `custom-${Date.now()}`,
                      name: 'New Aluminium Series',
                      series: 'Custom Series',
                      category: 'sliding',
                      tagline: 'Custom Engineered Aluminium Solution',
                      description: 'High performance aluminium sliding system with weather tight seals.',
                      applications: ['Residential', 'Commercial'],
                      keyFeatures: ['Slim profile', 'Multi-point lock'],
                      specs: {
                        shutterDepth: '30MM',
                        lockingType: 'Multi Point Lock',
                        cornerDetails: '45 degree cut with connector',
                        glassRange: '5mm to 20mm',
                        twoTrackDepth: '80mm',
                        maxWindowHeight: '2800mm',
                        finishes: 'Powder / Anodized',
                        hardware: 'Standard Hardware',
                      },
                      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
                    };
                    setFormData({ ...formData, products: [...formData.products, newProd] });
                    setEditingProductId(newProd.id);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-cyan-700 text-white font-bold text-xs rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Product Series</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.products.map((prod, pIdx) => {
                  const isEditing = editingProductId === prod.id;
                  return (
                    <div
                      key={prod.id}
                      className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.image}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover bg-slate-100"
                          />
                          <div>
                            <h5 className="font-bold text-slate-900 text-sm">{prod.name}</h5>
                            <span className="text-xs text-slate-500 font-mono">
                              {prod.specs.shutterDepth} • {prod.category}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingProductId(isEditing ? null : prod.id)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors"
                          >
                            {isEditing ? 'Collapse' : 'Edit Specs'}
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete ${prod.name}?`)) {
                                setFormData({
                                  ...formData,
                                  products: formData.products.filter((p) => p.id !== prod.id),
                                });
                              }
                            }}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Expandable Edit Area */}
                      {isEditing && (
                        <div className="space-y-4 pt-2 animate-in fade-in duration-200">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">Product Name</label>
                              <input
                                type="text"
                                value={prod.name}
                                onChange={(e) => {
                                  const updated = [...formData.products];
                                  updated[pIdx].name = e.target.value;
                                  setFormData({ ...formData, products: updated });
                                }}
                                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">Category</label>
                              <select
                                value={prod.category}
                                onChange={(e) => {
                                  const updated = [...formData.products];
                                  updated[pIdx].category = e.target.value as any;
                                  setFormData({ ...formData, products: updated });
                                }}
                                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs"
                              >
                                <option value="sliding">Sliding System</option>
                                <option value="casement">Casement / Partition</option>
                                <option value="folding">Slide & Fold (Bi-Fold)</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">Shutter Depth</label>
                              <input
                                type="text"
                                value={prod.specs.shutterDepth}
                                onChange={(e) => {
                                  const updated = [...formData.products];
                                  updated[pIdx].specs.shutterDepth = e.target.value;
                                  setFormData({ ...formData, products: updated });
                                }}
                                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">Glass Range</label>
                              <input
                                type="text"
                                value={prod.specs.glassRange}
                                onChange={(e) => {
                                  const updated = [...formData.products];
                                  updated[pIdx].specs.glassRange = e.target.value;
                                  setFormData({ ...formData, products: updated });
                                }}
                                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">Max Height</label>
                              <input
                                type="text"
                                value={prod.specs.maxWindowHeight}
                                onChange={(e) => {
                                  const updated = [...formData.products];
                                  updated[pIdx].specs.maxWindowHeight = e.target.value;
                                  setFormData({ ...formData, products: updated });
                                }}
                                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">Locking Mechanism</label>
                              <input
                                type="text"
                                value={prod.specs.lockingType}
                                onChange={(e) => {
                                  const updated = [...formData.products];
                                  updated[pIdx].specs.lockingType = e.target.value;
                                  setFormData({ ...formData, products: updated });
                                }}
                                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Image URL</label>
                            <input
                              type="text"
                              value={prod.image}
                              onChange={(e) => {
                                const updated = [...formData.products];
                                updated[pIdx].image = e.target.value;
                                setFormData({ ...formData, products: updated });
                              }}
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Description</label>
                            <textarea
                              rows={2}
                              value={prod.description}
                              onChange={(e) => {
                                const updated = [...formData.products];
                                updated[pIdx].description = e.target.value;
                                setFormData({ ...formData, products: updated });
                              }}
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: Gallery Portfolio */}
          {activeTab === 'gallery' && (
            <div className="max-w-5xl space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                  Project Gallery Showcase ({formData.gallery.length} Images)
                </h4>
                <button
                  onClick={() => {
                    const newItem: GalleryItem = {
                      id: `gal-${Date.now()}`,
                      title: 'New Luxury Villa Project',
                      category: 'villas',
                      categoryLabel: 'Luxury Villa',
                      location: 'Hyderabad',
                      systemUsed: 'Curv Premium SL-33',
                      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
                      description: 'Architectural installation with panoramic views.',
                    };
                    setFormData({ ...formData, gallery: [newItem, ...formData.gallery] });
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-cyan-700 text-white font-bold text-xs rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Gallery Item</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formData.gallery.map((item, gIdx) => (
                  <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex gap-3">
                      <img
                        src={item.imageUrl}
                        alt=""
                        className="w-20 h-20 rounded-lg object-cover bg-slate-100 flex-shrink-0"
                      />
                      <div className="space-y-1 flex-1 min-w-0">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const updated = [...formData.gallery];
                            updated[gIdx].title = e.target.value;
                            setFormData({ ...formData, gallery: updated });
                          }}
                          className="w-full px-2 py-1 font-bold text-xs border border-slate-300 rounded"
                          placeholder="Project Title"
                        />
                        <input
                          type="text"
                          value={item.location}
                          onChange={(e) => {
                            const updated = [...formData.gallery];
                            updated[gIdx].location = e.target.value;
                            setFormData({ ...formData, gallery: updated });
                          }}
                          className="w-full px-2 py-1 text-xs border border-slate-300 rounded text-slate-600"
                          placeholder="Location (e.g. Jubilee Hills)"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={item.systemUsed}
                        onChange={(e) => {
                          const updated = [...formData.gallery];
                          updated[gIdx].systemUsed = e.target.value;
                          setFormData({ ...formData, gallery: updated });
                        }}
                        className="w-full px-2 py-1 text-xs border border-slate-300 rounded"
                        placeholder="System Used"
                      />
                      <select
                        value={item.category}
                        onChange={(e) => {
                          const updated = [...formData.gallery];
                          updated[gIdx].category = e.target.value as any;
                          setFormData({ ...formData, gallery: updated });
                        }}
                        className="w-full px-2 py-1 text-xs border border-slate-300 rounded"
                      >
                        <option value="villas">Villas</option>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="doors">Slide & Fold</option>
                        <option value="interiors">Interiors</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <input
                        type="text"
                        value={item.imageUrl}
                        onChange={(e) => {
                          const updated = [...formData.gallery];
                          updated[gIdx].imageUrl = e.target.value;
                          setFormData({ ...formData, gallery: updated });
                        }}
                        className="w-3/4 px-2 py-1 text-[11px] border border-slate-300 rounded text-slate-500"
                        placeholder="Image URL"
                      />
                      <button
                        onClick={() => {
                          setFormData({
                            ...formData,
                            gallery: formData.gallery.filter((g) => g.id !== item.id),
                          });
                        }}
                        className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: Quote Inquiries & Lead Management */}
          {activeTab === 'quotes' && (
            <div className="max-w-5xl space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                  Customer Quote Bookings ({quoteBookings.length} Submissions)
                </h4>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const csvHeader = 'Ref ID,Date,Name,Phone,Email,City,Project Type,System,Track,Status,Notes\n';
                      const csvRows = quoteBookings
                        .map(
                          (q) =>
                            `"${q.id}","${q.createdAt}","${q.fullName}","${q.phone}","${q.email}","${q.city}","${q.projectType}","${q.systemPreference}","${q.trackPreference}","${q.status}","${q.message.replace(/"/g, '""')}"`
                        )
                        .join('\n');
                      const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `curvalum-quote-leads-${Date.now()}.csv`;
                      a.click();
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-cyan-700 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV Leads</span>
                  </button>
                </div>
              </div>

              {quoteBookings.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 space-y-3">
                  <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
                  <h5 className="font-bold text-slate-700">No quote submissions yet</h5>
                  <p className="text-xs text-slate-500">
                    When visitors submit the Book Now or Contact form, their details will appear here instantly.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {quoteBookings.map((quote) => (
                    <div
                      key={quote.id}
                      className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-extrabold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                            {quote.id}
                          </span>
                          <span className="text-sm font-bold text-slate-900">
                            {quote.fullName}
                          </span>
                          <span className="text-xs text-slate-500">
                            • {new Date(quote.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Status dropdown */}
                        <div className="flex items-center gap-2">
                          <select
                            value={quote.status}
                            onChange={(e) => handleUpdateBookingStatus(quote.id, e.target.value as any)}
                            className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-300 bg-slate-50"
                          >
                            <option value="new">New Lead</option>
                            <option value="in-review">In Review / Estimating</option>
                            <option value="contacted">Contacted / Site Visited</option>
                            <option value="completed">Order Confirmed</option>
                          </select>

                          <button
                            onClick={() => handleDeleteBooking(quote.id)}
                            className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Lead Details Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="space-y-1">
                          <span className="text-slate-400 font-semibold block">Phone & WhatsApp:</span>
                          <a
                            href={`https://wa.me/${quote.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-indigo-600 hover:underline flex items-center gap-1"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>{quote.phone}</span>
                          </a>
                          {quote.email && <div className="text-slate-600">{quote.email}</div>}
                        </div>

                        <div className="space-y-1">
                          <span className="text-slate-400 font-semibold block">Project & Stage:</span>
                          <div className="font-bold text-slate-800">{quote.projectType} • {quote.city}</div>
                          <div className="text-slate-500">{quote.projectStage}</div>
                        </div>
                      </div>

                      {quote.message && (
                        <div className="bg-slate-50 p-3 rounded-lg text-xs text-slate-700 border border-slate-100">
                          <span className="font-bold text-slate-900 mr-1">Client Note:</span>
                          {quote.message}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: Raw JSON Backup / Import */}
          {activeTab === 'raw_json' && (
            <div className="max-w-4xl space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                  Site Content Backup & Configuration Export
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Download a full JSON snapshot of all your custom modifications or import a previously saved Curvalum configuration backup.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={handleExportJSON}
                    className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-cyan-700 text-white font-bold text-xs rounded-xl transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </button>

                  <label className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl cursor-pointer transition-colors border border-slate-300">
                    <Upload className="w-4 h-4" />
                    <span>Upload & Restore JSON</span>
                    <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
