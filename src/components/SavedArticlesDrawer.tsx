import React from 'react';
import { X, Trash2, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { ARTICLES, Article } from '../data/articles';

interface SavedArticlesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedIds: string[];
  onRemoveSaved: (id: string) => void;
  onClearAll: () => void;
  onSelectArticle: (id: string) => void;
}

export const SavedArticlesDrawer: React.FC<SavedArticlesDrawerProps> = ({
  isOpen,
  onClose,
  savedIds,
  onRemoveSaved,
  onClearAll,
  onSelectArticle
}) => {
  if (!isOpen) return null;

  const savedArticles = ARTICLES.filter((a) => savedIds.includes(a.id));
  const totalMinutes = savedArticles.reduce((acc, curr) => acc + curr.readMinutes, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-stone-200 shadow-xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="font-display text-xl font-medium text-stone-900">
                Personal Reading Room
              </h2>
              <p className="font-sans-ui text-xs text-stone-500">
                {savedArticles.length} Monograph{savedArticles.length === 1 ? '' : 's'} Bookmarked
              </p>
            </div>
            <button
              onClick={onClose}
              className="cursor-pointer p-2 text-stone-500 hover:text-stone-900 rounded-md transition-colors"
              aria-label="Close reading room"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Reading Summary Bar */}
          {savedArticles.length > 0 && (
            <div className="bg-stone-100 px-6 py-2.5 border-b border-stone-200 flex items-center justify-between text-xs font-sans-ui text-stone-600">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-stone-500" />
                <span>Estimated study:</span>
                <strong className="text-stone-900 font-mono">{totalMinutes} minutes</strong>
              </div>
              <button
                onClick={onClearAll}
                className="cursor-pointer text-[11px] text-stone-500 hover:text-rose-700 underline"
              >
                Clear all
              </button>
            </div>
          )}

          {/* List Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-stone-200">
            {savedArticles.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <BookOpen className="w-8 h-8 text-stone-300 mx-auto" />
                <p className="font-display text-lg text-stone-700">
                  Your Reading Room is Empty
                </p>
                <p className="font-reading text-xs text-stone-500 max-w-xs mx-auto">
                  Click the bookmark icon on any monograph or dispatch to curate your offline study collection.
                </p>
              </div>
            ) : (
              savedArticles.map((article) => (
                <div key={article.id} className="py-4 space-y-2 group">
                  <div className="flex items-center gap-2 text-[11px] font-sans-ui text-stone-500">
                    <span className="font-semibold text-stone-800 uppercase">{article.category}</span>
                    <span>·</span>
                    <span className="tabular-nums">{article.readTime}</span>
                  </div>

                  <h3
                    onClick={() => {
                      onSelectArticle(article.id);
                      onClose();
                    }}
                    className="cursor-pointer font-display text-base font-medium text-stone-900 hover:text-stone-700 transition-colors leading-snug"
                  >
                    {article.title}
                  </h3>

                  <div className="flex items-center justify-between pt-1 text-xs font-sans-ui">
                    <span className="text-stone-500">by {article.author.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onRemoveSaved(article.id)}
                        className="cursor-pointer p-1 text-stone-400 hover:text-stone-700"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          onSelectArticle(article.id);
                          onClose();
                        }}
                        className="cursor-pointer text-xs font-medium text-stone-900 hover:underline flex items-center gap-1"
                      >
                        <span>Open</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-6 border-t border-stone-200 bg-stone-100/50">
            <p className="text-[11px] font-sans-ui text-stone-500 text-center">
              Items are stored in local device storage.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
