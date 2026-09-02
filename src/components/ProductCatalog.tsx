import React, { useState } from 'react';
import { SiteContent, ProductItem } from '../types';
import { 
  Sliders, 
  Layers, 
  Check, 
  Sparkles, 
  Info, 
  ArrowRight, 
  Maximize2, 
  ShieldCheck, 
  Wrench, 
  Grid,
  Lock,
  Eye,
  Minimize2
} from 'lucide-react';

interface ProductCatalogProps {
  content: SiteContent;
  onSelectProductForQuote: (productName: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  content,
  onSelectProductForQuote,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'sliding' | 'casement' | 'folding'>('all');
  const [activeProductModal, setActiveProductModal] = useState<ProductItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Systems' },
    { id: 'sliding', label: 'Sliding Systems (SL-25, SL-29, SL-33, Aerotix)' },
    { id: 'casement', label: 'Casement & Partitions (CMT-40, CMT-50)' },
    { id: 'folding', label: 'Slide & Fold (S Fold-50)' },
  ];

  const filteredProducts = content.products.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="products" className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold tracking-wider uppercase">
            <Sliders className="w-3.5 h-3.5 text-indigo-600" />
            <span>Aluminium Systems & Specifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Engineered Architectural Solutions
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Direct from the official Curvalum technical catalog. Select any system below to inspect exact shutter depths, glass ranges, track dimensions, and locking mechanisms.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`filter-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              id={`product-card-${product.id}`}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-indigo-400 transition-all duration-300 flex flex-col group"
            >
              {/* Product Card Image Banner */}
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                
                {/* Badge if available */}
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-indigo-600 text-white px-2.5 py-1 rounded-lg text-xs font-black shadow-md uppercase tracking-wider">
                    {product.badge}
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="bg-slate-900/85 backdrop-blur-md text-slate-100 text-xs px-2.5 py-1 rounded-md font-mono font-bold">
                    Depth: {product.specs.shutterDepth}
                  </span>
                  <button
                    onClick={() => setActiveProductModal(product)}
                    className="p-1.5 rounded-md bg-white/90 text-slate-900 hover:bg-white transition-colors"
                    title="View Full Technical Blueprint"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Product Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                      {product.series}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 capitalize">
                      {product.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Key Technical Matrix */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 font-medium">Glass Capacity:</span>
                    <span className="text-slate-900 font-bold">{product.specs.glassRange}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 font-medium">Max Height:</span>
                    <span className="text-slate-900 font-bold">{product.specs.maxWindowHeight}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500 font-medium">Locking System:</span>
                    <span className="text-slate-900 font-bold text-right truncate max-w-[150px]">
                      {product.specs.lockingType}
                    </span>
                  </div>
                </div>

                {/* Applications Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {product.applications.map((app, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold"
                    >
                      {app}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setActiveProductModal(product)}
                    className="py-2.5 px-3 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg text-center transition-colors"
                  >
                    Tech Specs
                  </button>
                  <button
                    onClick={() => onSelectProductForQuote(product.name)}
                    className="py-2.5 px-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-center transition-colors flex items-center justify-center gap-1 group/btn shadow-sm"
                  >
                    <span>Get Quote</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Blueprint Modal */}
        {activeProductModal && (
          <div
            id="product-spec-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
          >
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative">
              
              {/* Close button */}
              <button
                onClick={() => setActiveProductModal(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                <Minimize2 className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    Official Brochure Specification
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                    {activeProductModal.name}
                  </h3>
                  <p className="text-sm text-indigo-800 font-semibold mt-1">
                    {activeProductModal.tagline}
                  </p>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeProductModal.description}
                </p>

                {/* Full Engineering Specs Table */}
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-slate-900 text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-between">
                    <span>Technical Parameter</span>
                    <span>Specification Value</span>
                  </div>
                  <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                    <div className="grid grid-cols-2 p-3 bg-slate-50 font-medium">
                      <span className="text-slate-600">Shutter Depth</span>
                      <span className="text-slate-900 font-bold">{activeProductModal.specs.shutterDepth}</span>
                    </div>
                    <div className="grid grid-cols-2 p-3 bg-white font-medium">
                      <span className="text-slate-600">Locking Type</span>
                      <span className="text-slate-900 font-bold">{activeProductModal.specs.lockingType}</span>
                    </div>
                    <div className="grid grid-cols-2 p-3 bg-slate-50 font-medium">
                      <span className="text-slate-600">Corner Joinery Details</span>
                      <span className="text-slate-900 font-bold">{activeProductModal.specs.cornerDetails}</span>
                    </div>
                    {activeProductModal.specs.sealingOverlap && (
                      <div className="grid grid-cols-2 p-3 bg-white font-medium">
                        <span className="text-slate-600">Sealing Overlap</span>
                        <span className="text-slate-900 font-bold">{activeProductModal.specs.sealingOverlap}</span>
                      </div>
                    )}
                    <div className="grid grid-cols-2 p-3 bg-slate-50 font-medium">
                      <span className="text-slate-600">Glass Range</span>
                      <span className="text-slate-900 font-bold">{activeProductModal.specs.glassRange}</span>
                    </div>
                    {activeProductModal.specs.sightline && (
                      <div className="grid grid-cols-2 p-3 bg-white font-medium">
                        <span className="text-slate-600">Sightline with Shutter</span>
                        <span className="text-slate-900 font-bold">{activeProductModal.specs.sightline}</span>
                      </div>
                    )}
                    <div className="grid grid-cols-2 p-3 bg-slate-50 font-medium">
                      <span className="text-slate-600">2 Track Frame Depth</span>
                      <span className="text-slate-900 font-bold">{activeProductModal.specs.twoTrackDepth}</span>
                    </div>
                    {activeProductModal.specs.threeTrackDepth && (
                      <div className="grid grid-cols-2 p-3 bg-white font-medium">
                        <span className="text-slate-600">3 Track Frame Depth</span>
                        <span className="text-slate-900 font-bold">{activeProductModal.specs.threeTrackDepth}</span>
                      </div>
                    )}
                    <div className="grid grid-cols-2 p-3 bg-slate-50 font-medium">
                      <span className="text-slate-600">Maximum Window Height</span>
                      <span className="text-slate-900 font-bold">{activeProductModal.specs.maxWindowHeight}</span>
                    </div>
                    <div className="grid grid-cols-2 p-3 bg-white font-medium">
                      <span className="text-slate-600">Available Finishes</span>
                      <span className="text-slate-900 font-bold">{activeProductModal.specs.finishes}</span>
                    </div>
                    <div className="grid grid-cols-2 p-3 bg-slate-50 font-medium">
                      <span className="text-slate-600">Hardware & Woolpile</span>
                      <span className="text-slate-900 font-bold">{activeProductModal.specs.hardware}</span>
                    </div>
                  </div>
                </div>

                {/* Key Benefits List */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Key Architectural Advantages
                  </h4>
                  <ul className="space-y-1.5">
                    {activeProductModal.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Modal CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setActiveProductModal(null)}
                    className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Close Blueprint
                  </button>
                  <button
                    onClick={() => {
                      const name = activeProductModal.name;
                      setActiveProductModal(null);
                      onSelectProductForQuote(name);
                    }}
                    className="px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
                  >
                    Request Quote for {activeProductModal.name}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
