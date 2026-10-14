import React from 'react';
import { ArrowRight, Bookmark } from 'lucide-react';
import { Article } from '../data/articles';

interface ArticleCardProps {
  article: Article;
  onSelect: (id: string) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  variant?: 'feature' | 'standard' | 'compact';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  isSaved,
  onToggleSave,
  variant = 'standard'
}) => {
  if (variant === 'compact') {
    return (
      <article className="group py-5 border-b border-stone-200/90 transition-colors hover:bg-stone-100/50 -mx-3 px-3 rounded-md">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          
          <div className="space-y-1.5 flex-1 pr-4">
            {/* Metadata unboxed */}
            <div className="flex items-center gap-2 text-xs font-sans-ui text-stone-500">
              <span className="font-semibold text-stone-800 tracking-wider uppercase text-[11px]">
                {article.category}
              </span>
              <span aria-hidden="true">·</span>
              <span>{article.publishedAt}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{article.readTime}</span>
            </div>

            <h3
              onClick={() => onSelect(article.id)}
              className="cursor-pointer font-display text-xl font-medium text-stone-900 group-hover:text-stone-700 transition-colors"
            >
              {article.title}
            </h3>

            <p className="font-reading text-sm text-stone-600 line-clamp-2 max-w-2xl">
              {article.deck}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0">
            <span className="text-xs font-sans-ui text-stone-500 hidden md:inline">
              by {article.author.name}
            </span>
            <button
              onClick={() => onToggleSave(article.id)}
              aria-label={isSaved ? "Remove from bookmarks" : "Save to bookmarks"}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                isSaved ? 'text-stone-900' : 'text-stone-400 hover:text-stone-800'
              }`}
              title={isSaved ? "Saved" : "Save"}
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelect(article.id)}
              className="p-1.5 text-stone-600 hover:text-stone-950 transition-colors cursor-pointer"
              title="Read essay"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col justify-between h-full bg-[#FAF7F2] border border-stone-200/90 rounded-lg p-5 hover:border-stone-400 transition-all duration-200">
      <div className="space-y-4">
        
        {/* Visual Slot with resilient fallback */}
        <div
          onClick={() => onSelect(article.id)}
          className="cursor-pointer overflow-hidden rounded-md bg-stone-200 aspect-[4/3] relative"
        >
          {article.coverImage ? (
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // styled fallback container if image fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-stone-200 text-stone-500 font-display italic text-sm">
              Chronos &amp; Form Specimen
            </div>
          )}
        </div>

        {/* Unboxed Metadata */}
        <div className="flex items-center gap-2 text-xs font-sans-ui text-stone-500">
          <span className="font-semibold text-stone-800 tracking-wider uppercase text-[11px]">
            {article.category}
          </span>
          <span aria-hidden="true">·</span>
          <span>{article.publishedAt}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">{article.readTime}</span>
        </div>

        {/* Title */}
        <h3
          onClick={() => onSelect(article.id)}
          className="cursor-pointer font-display text-xl lg:text-2xl font-medium tracking-tight text-stone-900 group-hover:text-stone-700 leading-snug transition-colors"
          style={{ textWrap: 'balance' }}
        >
          {article.title}
        </h3>

        {/* Deck */}
        <p className="font-reading text-sm text-stone-600 line-clamp-3 leading-relaxed">
          {article.deck}
        </p>

      </div>

      {/* Footer / Author Attribution */}
      <div className="flex items-center justify-between pt-4 mt-6 border-t border-stone-200/80">
        <div className="flex items-center gap-2.5">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-7 h-7 rounded-full object-cover border border-stone-300"
            referrerPolicy="no-referrer"
          />
          <div className="font-sans-ui text-xs font-medium text-stone-800 truncate max-w-[140px]">
            {article.author.name}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleSave(article.id)}
            aria-label={isSaved ? "Remove from bookmarks" : "Save to bookmarks"}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              isSaved
                ? 'text-stone-900 bg-stone-200'
                : 'text-stone-400 hover:text-stone-900 hover:bg-stone-100'
            }`}
            title={isSaved ? "Saved" : "Save for later"}
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onSelect(article.id)}
            className="cursor-pointer p-1.5 text-stone-700 hover:text-stone-950 transition-colors inline-flex items-center gap-1 text-xs font-sans-ui font-medium"
          >
            <span>Read</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
