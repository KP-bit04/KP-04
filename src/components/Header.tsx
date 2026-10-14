import React, { useState } from 'react';
import { Bookmark, Search, Menu, X } from 'lucide-react';

interface HeaderProps {
  onSelectArticle: (id: string | null) => void;
  onOpenSearch: () => void;
  onOpenSaved: () => void;
  onOpenManifesto: () => void;
  onOpenSubscribe: () => void;
  savedCount: number;
  currentArticleId: string | null;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectArticle,
  onOpenSearch,
  onOpenSaved,
  onOpenManifesto,
  onOpenSubscribe,
  savedCount,
  currentArticleId
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            onSelectArticle(null);
            setMobileMenuOpen(false);
          }}
          className="text-left group cursor-pointer shrink-0"
        >
          <span className="font-display text-2xl lg:text-3xl font-bold tracking-tight text-stone-900 group-hover:text-stone-700 transition-colors whitespace-nowrap">
            CHRONOS &amp; FORM
          </span>
        </button>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-sans-ui font-medium text-stone-700">
          <button
            onClick={() => onSelectArticle(null)}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors hover:text-stone-950 ${
              !currentArticleId ? 'text-stone-950 border-b border-stone-900 pb-0.5' : 'text-stone-600'
            }`}
          >
            Essays
          </button>
          <button
            onClick={() => {
              onSelectArticle(null);
              const el = document.getElementById('archive-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="cursor-pointer whitespace-nowrap shrink-0 text-stone-600 hover:text-stone-950 transition-colors"
          >
            Archive
          </button>
          <button
            onClick={onOpenManifesto}
            className="cursor-pointer whitespace-nowrap shrink-0 text-stone-600 hover:text-stone-950 transition-colors"
          >
            Manifesto
          </button>
          <button
            onClick={onOpenSearch}
            className="cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 text-stone-600 hover:text-stone-950 transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSaved}
            className="relative cursor-pointer flex items-center gap-2 px-3 py-2 text-xs font-sans-ui font-medium text-stone-700 hover:text-stone-950 hover:bg-stone-100/70 rounded-md transition-colors whitespace-nowrap"
            title="Saved Reading List"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reading Room</span>
            {savedCount > 0 && (
              <span className="tabular-nums font-mono text-[11px] text-stone-900 font-semibold px-1.5 py-0.2 bg-stone-200 rounded">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenSubscribe}
            className="cursor-pointer px-4 py-2 text-xs font-sans-ui font-semibold text-stone-50 bg-stone-900 rounded-md hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0"
          >
            Dispatch
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden cursor-pointer p-2 text-stone-700 hover:text-stone-950"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#FAF7F2] px-6 py-4 space-y-3 font-sans-ui text-sm">
          <button
            onClick={() => {
              onSelectArticle(null);
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-1.5 text-stone-800 hover:text-stone-950 font-medium"
          >
            All Essays
          </button>
          <button
            onClick={() => {
              onSelectArticle(null);
              setMobileMenuOpen(false);
              setTimeout(() => {
                const el = document.getElementById('archive-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="block w-full text-left py-1.5 text-stone-800 hover:text-stone-950 font-medium"
          >
            Archive Index
          </button>
          <button
            onClick={() => {
              onOpenManifesto();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-1.5 text-stone-800 hover:text-stone-950 font-medium"
          >
            Editorial Manifesto
          </button>
          <button
            onClick={() => {
              onOpenSearch();
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 w-full text-left py-1.5 text-stone-800 hover:text-stone-950 font-medium"
          >
            <Search className="w-4 h-4" />
            <span>Search Articles</span>
          </button>
        </div>
      )}
    </header>
  );
};
