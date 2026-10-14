import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, ArrowRight, BookOpen } from 'lucide-react';
import { ARTICLES, Article } from '../data/articles';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (id: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle
}) => {
  const [query, setQuery] = useState('');

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return ARTICLES;
    const q = query.toLowerCase();

    return ARTICLES.filter((article) => {
      const inTitle = article.title.toLowerCase().includes(q);
      const inDeck = article.deck.toLowerCase().includes(q);
      const inCategory = article.category.toLowerCase().includes(q);
      const inAuthor = article.author.name.toLowerCase().includes(q);
      const inSections = article.sections.some((s) =>
        s.paragraphs.some((p) => p.toLowerCase().includes(q))
      );
      return inTitle || inDeck || inCategory || inAuthor || inSections;
    });
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] border border-stone-300 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-500 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search by topic, material, architect, or phrase..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm font-sans-ui text-stone-900 placeholder:text-stone-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="cursor-pointer text-stone-400 hover:text-stone-700 text-xs px-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="cursor-pointer p-1 text-stone-400 hover:text-stone-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Metadata */}
        <div className="px-5 py-2 bg-stone-100 border-b border-stone-200 flex items-center justify-between text-[11px] font-sans-ui text-stone-500">
          <span>
            {query.trim() ? `Showing ${results.length} monograph matches for "${query}"` : 'Browse Archival Catalog (10 Monographs)'}
          </span>
          <span className="hidden sm:inline">Press ESC to dismiss</span>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto divide-y divide-stone-200 p-2 flex-1">
          {results.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <BookOpen className="w-6 h-6 text-stone-400 mx-auto" />
              <p className="font-display text-base text-stone-700">No archival records match your inquiry</p>
              <p className="font-reading text-xs text-stone-500">Try keywords like 'brick', 'maps', 'escapement', 'concrete', or 'typography'.</p>
            </div>
          ) : (
            results.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article.id);
                  onClose();
                }}
                className="p-3.5 hover:bg-stone-200/50 rounded-md cursor-pointer transition-colors space-y-1.5"
              >
                <div className="flex items-center gap-2 text-[11px] font-sans-ui text-stone-500">
                  <span className="font-semibold text-stone-800 uppercase">{article.category}</span>
                  <span>·</span>
                  <span>{article.author.name}</span>
                  <span>·</span>
                  <span className="tabular-nums">{article.readTime}</span>
                </div>
                <h4 className="font-display text-base font-medium text-stone-900 leading-snug">
                  {article.title}
                </h4>
                <p className="font-reading text-xs text-stone-600 line-clamp-1">
                  {article.deck}
                </p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
