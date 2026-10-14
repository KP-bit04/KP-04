import React from 'react';
import { ArrowUp, BookOpen, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenManifesto: () => void;
  onOpenSubscribe: () => void;
  onSelectCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenManifesto,
  onOpenSubscribe,
  onSelectCategory
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-stone-200/90 bg-[#FAF7F2] text-stone-700 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
        
        {/* Top Tier */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          <div className="md:col-span-5 space-y-4">
            <span className="font-display text-2xl font-bold tracking-tight text-stone-900 block">
              CHRONOS &amp; FORM
            </span>
            <p className="font-reading text-sm text-stone-600 max-w-sm leading-relaxed">
              An independent, curatorial journal dedicated to architectural materiality, deep-time design, mechanical craft, and the quiet dignity of slow contemplation.
            </p>
            <div className="text-xs font-sans-ui text-stone-500 pt-1">
              Published quarterly in Geneva, Kyoto, and Edinburgh.
            </div>
          </div>

          <div className="md:col-span-3 space-y-3 font-sans-ui text-xs">
            <div className="font-semibold uppercase tracking-wider text-stone-900">
              Thematic Archives
            </div>
            <ul className="space-y-2 text-stone-600">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Architecture');
                    const el = document.getElementById('archive-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="cursor-pointer hover:text-stone-950 transition-colors"
                >
                  Architecture &amp; Vernacular Stone
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Cartography');
                    const el = document.getElementById('archive-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="cursor-pointer hover:text-stone-950 transition-colors"
                >
                  Cartography &amp; Hand Topography
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Horology');
                    const el = document.getElementById('archive-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="cursor-pointer hover:text-stone-950 transition-colors"
                >
                  Horology &amp; Mechanical Escapements
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Typography');
                    const el = document.getElementById('archive-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="cursor-pointer hover:text-stone-950 transition-colors"
                >
                  Typography &amp; Renaissance Canons
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Philosophy');
                    const el = document.getElementById('archive-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="cursor-pointer hover:text-stone-950 transition-colors"
                >
                  Phenomenology &amp; Quiet Solitude
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3 font-sans-ui text-xs">
            <div className="font-semibold uppercase tracking-wider text-stone-900">
              Curatorial Relations
            </div>
            <p className="font-reading text-xs text-stone-600 leading-relaxed">
              We welcome scholarly inquiries, archival contributions, and monograph submissions from architects, conservators, and master artisans.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={onOpenSubscribe}
                className="cursor-pointer px-3.5 py-1.5 bg-stone-900 text-stone-50 rounded text-xs font-medium hover:bg-stone-800 transition-colors"
              >
                Join Sunday Dispatch
              </button>
              <button
                onClick={onOpenManifesto}
                className="cursor-pointer px-3.5 py-1.5 border border-stone-300 rounded text-xs font-medium text-stone-800 hover:border-stone-900 transition-colors"
              >
                Read Manifesto
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Hairline & Legal Bar */}
        <div className="pt-6 border-t border-stone-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans-ui text-stone-500">
          <div>
            &copy; 2026 Chronos &amp; Form Editorial Collective. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Vol. XVIII / Autumn Compendium</span>
            <button
              onClick={scrollToTop}
              className="cursor-pointer inline-flex items-center gap-1.5 text-stone-700 hover:text-stone-950 transition-colors"
              title="Return to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
