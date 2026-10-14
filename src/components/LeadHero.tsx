import React from 'react';
import { ArrowRight, Bookmark } from 'lucide-react';
import { Article } from '../data/articles';

interface LeadHeroProps {
  article: Article;
  onSelect: (id: string) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const LeadHero: React.FC<LeadHeroProps> = ({
  article,
  onSelect,
  isSaved,
  onToggleSave
}) => {
  return (
    <section className="border-b border-stone-200/80 bg-[#FAF7F2] py-8 lg:py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Curatorial Header Ribbon */}
        <div className="flex items-center justify-between text-xs tracking-widest uppercase font-sans-ui text-stone-500 mb-6 pb-3 border-b border-stone-200">
          <span>{article.volume} · {article.edition}</span>
          <span className="hidden sm:inline">Featured Lead Monograph</span>
          <span>Curated Issue No. 42</span>
        </div>

        {/* 2-Column Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Typography & Narrative Lead */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Unboxed Metadata (NO PILLS) */}
            <div className="flex items-center gap-2 text-xs font-sans-ui text-stone-600">
              <span className="font-semibold text-stone-900 tracking-wider uppercase text-[11px]">
                {article.category}
              </span>
              <span aria-hidden="true" className="text-stone-400">·</span>
              <span>{article.publishedAt}</span>
              <span aria-hidden="true" className="text-stone-400">·</span>
              <span className="tabular-nums">{article.readTime}</span>
            </div>

            {/* Dominant Headline */}
            <h1
              onClick={() => onSelect(article.id)}
              className="cursor-pointer font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-stone-900 leading-[1.12] hover:text-stone-700 transition-colors"
              style={{ textWrap: 'balance' }}
            >
              {article.title}
            </h1>

            {/* Deck / Abstract */}
            <p className="font-reading text-base lg:text-lg text-stone-700 leading-relaxed max-w-xl">
              {article.deck}
            </p>

            {/* Author Attribution */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-200">
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-stone-300"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-sans-ui text-xs font-semibold text-stone-900">
                    {article.author.name}
                  </div>
                  <div className="font-sans-ui text-[11px] text-stone-500">
                    {article.author.role}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleSave(article.id)}
                  aria-label={isSaved ? "Remove from bookmarks" : "Save to bookmarks"}
                  className={`p-2.5 rounded-md border text-xs transition-colors cursor-pointer ${
                    isSaved
                      ? 'border-stone-900 bg-stone-900 text-stone-50'
                      : 'border-stone-300 text-stone-700 hover:border-stone-900 hover:text-stone-900'
                  }`}
                  title={isSaved ? "Saved" : "Save for later"}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onSelect(article.id)}
                  className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-stone-50 text-xs font-sans-ui font-medium rounded-md hover:bg-stone-800 transition-colors whitespace-nowrap"
                >
                  <span>Read Monograph</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-6">
            <div
              onClick={() => onSelect(article.id)}
              className="group cursor-pointer block relative overflow-hidden rounded-lg bg-stone-200 border border-stone-200"
            >
              <div className="aspect-[16/10] sm:aspect-[16/10] overflow-hidden">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <p className="font-display italic text-xs text-stone-500 mt-2.5">
              Fig. 1 — {article.coverImageCaption}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
