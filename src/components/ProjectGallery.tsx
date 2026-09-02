import React, { useState } from 'react';
import { SiteContent, GalleryItem } from '../types';
import { 
  Eye, 
  MapPin, 
  Sliders, 
  Sparkles, 
  X, 
  ArrowRight, 
  Layers, 
  Check, 
  Maximize2 
} from 'lucide-react';

interface ProjectGalleryProps {
  content: SiteContent;
  onOpenBookNow: () => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  content,
  onOpenBookNow,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'villas', label: 'Luxury Villas' },
    { id: 'residential', label: 'High-End Residential' },
    { id: 'commercial', label: 'Commercial & Partitions' },
    { id: 'doors', label: 'Slide & Fold Doors' },
    { id: 'interiors', label: 'Interior Spaces' },
  ];

  const filteredGallery = content.gallery.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section id="gallery" className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Installed Project Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Curvalum Architectural Gallery
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Explore landmark residences, luxury villas, and corporate buildings elevated with Curvalum precision aluminium systems.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid with Lazy Loading */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              id={`gallery-item-${item.id}`}
              onClick={() => setActiveLightboxItem(item)}
              className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-indigo-400 transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Image Container with Lazy Loading & Aspect Ratio */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white space-y-1 w-full">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
                      {item.categoryLabel}
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-200 truncate">
                        {item.systemUsed}
                      </span>
                      <Maximize2 className="w-4 h-4 text-white flex-shrink-0" />
                    </div>
                  </div>
                </div>

                {/* Top Category Badge */}
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-md text-[11px] font-bold">
                  {item.categoryLabel}
                </div>
              </div>

              {/* Bottom Card Meta */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                  <span className="truncate">{item.systemUsed}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeLightboxItem && (
          <div
            id="gallery-lightbox-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setActiveLightboxItem(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Full Image */}
                <div className="md:col-span-7 bg-slate-950 flex items-center justify-center max-h-[500px]">
                  <img
                    src={activeLightboxItem.imageUrl}
                    alt={activeLightboxItem.title}
                    className="w-full h-full object-cover max-h-[500px]"
                  />
                </div>

                {/* Project Details */}
                <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div>
                      <span className="px-2.5 py-1 bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-bold rounded-md">
                        {activeLightboxItem.categoryLabel}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 mt-2">
                        {activeLightboxItem.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{activeLightboxItem.location}</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2 text-xs">
                      <div className="font-bold text-slate-900">Installed System Architecture:</div>
                      <div className="text-indigo-800 font-semibold">{activeLightboxItem.systemUsed}</div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {activeLightboxItem.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => {
                        const title = activeLightboxItem.title;
                        setActiveLightboxItem(null);
                        onOpenBookNow();
                      }}
                      className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>Inquire About Similar Installation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
