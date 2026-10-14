import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { LeadHero } from './components/LeadHero';
import { ArticleCard } from './components/ArticleCard';
import { ArticleReader } from './components/ArticleReader';
import { SavedArticlesDrawer } from './components/SavedArticlesDrawer';
import { SearchModal } from './components/SearchModal';
import { SubscribeModal } from './components/SubscribeModal';
import { ManifestoModal } from './components/ManifestoModal';
import { Footer } from './components/Footer';
import { ARTICLES, EDITORIAL_COLLECTIONS, Article } from './data/articles';
import { LayoutGrid, List, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function App() {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'read-longest' | 'read-shortest'>('date');

  // Modals / Drawers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);

  // Saved Bookmarks with LocalStorage persistence
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('chronos_saved_articles');
      return stored ? JSON.parse(stored) : ['silence-of-nordic-brick', 'cartographies-of-the-unseen'];
    } catch {
      return ['silence-of-nordic-brick', 'cartographies-of-the-unseen'];
    }
  });

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('chronos_saved_articles', JSON.stringify(next));
      return next;
    });
  };

  const removeSaved = (id: string) => {
    setSavedIds((prev) => {
      const next = prev.filter((item) => item !== id);
      localStorage.setItem('chronos_saved_articles', JSON.stringify(next));
      return next;
    });
  };

  const clearAllSaved = () => {
    setSavedIds([]);
    localStorage.removeItem('chronos_saved_articles');
  };

  // Find currently active article if in reading mode
  const currentArticle = useMemo(() => {
    return ARTICLES.find((a) => a.id === selectedArticleId) || null;
  }, [selectedArticleId]);

  // Lead article (Tier 1)
  const leadArticle = ARTICLES[0];

  // Secondary Features (Tier 2: next 3 articles)
  const secondaryFeatures = ARTICLES.slice(1, 4);

  // Filtered and sorted archive list (Tier 3)
  const filteredArticles = useMemo(() => {
    let list = ARTICLES;
    if (selectedCategory !== 'all') {
      list = list.filter((a) => a.category === selectedCategory);
    }

    if (sortBy === 'read-longest') {
      return [...list].sort((a, b) => b.readMinutes - a.readMinutes);
    }
    if (sortBy === 'read-shortest') {
      return [...list].sort((a, b) => a.readMinutes - b.readMinutes);
    }
    return list;
  }, [selectedCategory, sortBy]);

  // Scroll to top when an article is opened
  const handleSelectArticle = (id: string | null) => {
    setSelectedArticleId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] flex flex-col font-reading antialiased">
      
      {/* Top Bar adhering to the Top Bar Contract */}
      <Header
        onSelectArticle={handleSelectArticle}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSaved={() => setIsSavedOpen(true)}
        onOpenManifesto={() => setIsManifestoOpen(true)}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        savedCount={savedIds.length}
        currentArticleId={selectedArticleId}
      />

      {/* Main View Router */}
      {currentArticle ? (
        <ArticleReader
          article={currentArticle}
          onBack={() => handleSelectArticle(null)}
          onSelectArticle={handleSelectArticle}
          isSaved={savedIds.includes(currentArticle.id)}
          onToggleSave={toggleSave}
        />
      ) : (
        <div className="flex-1">
          
          {/* Operational Utility Ribbon */}
          <div className="bg-stone-100/70 border-b border-stone-200/80 py-2 px-6 lg:px-12 text-xs font-sans-ui text-stone-600">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-stone-900">Autumn Compendium 2026</span>
                <span className="text-stone-400">·</span>
                <span className="hidden sm:inline">ISSN 2491-0391</span>
                <span className="text-stone-400 hidden sm:inline">·</span>
                <span>Ten Published Research Monographs</span>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-stone-500">
                <span className="hidden md:inline">Next dispatch releases in 4 days</span>
                <button
                  onClick={() => setIsManifestoOpen(true)}
                  className="cursor-pointer hover:text-stone-900 underline"
                >
                  Our Invariant Principles
                </button>
              </div>
            </div>
          </div>

          {/* Tier 1: Lead Story Hero */}
          <LeadHero
            article={leadArticle}
            onSelect={handleSelectArticle}
            isSaved={savedIds.includes(leadArticle.id)}
            onToggleSave={toggleSave}
          />

          {/* Tier 2: Secondary Features Grid */}
          <section className="py-12 lg:py-16 border-b border-stone-200/80 bg-stone-100/30">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
              
              <div className="flex items-baseline justify-between border-b border-stone-200 pb-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-sans-ui uppercase tracking-widest text-stone-500 font-semibold">
                    Tier Two Monographs
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-medium text-stone-900">
                    Curatorial Inquiries &amp; Material Studies
                  </h2>
                </div>
                <div className="text-xs font-sans-ui text-stone-500 hidden sm:block">
                  Volumes XVIII · Issue 02
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                {secondaryFeatures.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onSelect={handleSelectArticle}
                    isSaved={savedIds.includes(article.id)}
                    onToggleSave={toggleSave}
                    variant="standard"
                  />
                ))}
              </div>

            </div>
          </section>

          {/* Tier 3: Complete Archive & Department Index */}
          <section id="archive-section" className="py-14 lg:py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
              
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-5">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-sans-ui text-stone-500 uppercase tracking-widest font-semibold">
                    <span>The Complete Archive</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums font-mono">{ARTICLES.length} Essays Available</span>
                  </div>
                  <h2 className="font-display text-3xl font-medium tracking-tight text-stone-900">
                    Department Compendium
                  </h2>
                </div>

                {/* Controls: View Mode & Sorting */}
                <div className="flex items-center gap-3 shrink-0">
                  {/* Sort selector */}
                  <div className="flex items-center gap-1.5 text-xs font-sans-ui text-stone-600 bg-stone-100 p-1 rounded-md border border-stone-200">
                    <SlidersHorizontal className="w-3.5 h-3.5 ml-1 text-stone-500" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-transparent text-xs font-medium text-stone-800 focus:outline-none cursor-pointer pr-1"
                    >
                      <option value="date">Edition Order</option>
                      <option value="read-longest">Longest Study First</option>
                      <option value="read-shortest">Shortest Study First</option>
                    </select>
                  </div>

                  {/* View layout toggles */}
                  <div className="flex items-center bg-stone-100 p-1 rounded-md border border-stone-200">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded transition-colors ${
                        viewMode === 'grid' ? 'bg-white shadow-xs text-stone-900' : 'text-stone-500 hover:text-stone-900'
                      }`}
                      title="Grid Cards View"
                      aria-label="Grid cards view"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setViewMode('compact')}
                      className={`p-1.5 rounded transition-colors ${
                        viewMode === 'compact' ? 'bg-white shadow-xs text-stone-900' : 'text-stone-500 hover:text-stone-900'
                      }`}
                      title="Broadsheet Row View"
                      aria-label="Broadsheet row view"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Category Filter Tabs (Zero static pills: functional buttons with segmented styling) */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
                {EDITORIAL_COLLECTIONS.map((cat) => {
                  const count = cat.id === 'all' 
                    ? ARTICLES.length 
                    : ARTICLES.filter((a) => a.category === cat.id).length;

                  const isActive = selectedCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`cursor-pointer whitespace-nowrap shrink-0 px-3.5 py-1.5 text-xs font-sans-ui font-medium rounded-md transition-colors ${
                        isActive
                          ? 'bg-stone-900 text-stone-50 shadow-xs'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70 hover:text-stone-900'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`ml-1.5 tabular-nums text-[11px] ${isActive ? 'text-stone-300' : 'text-stone-400'}`}>
                        ({count})
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Archive Articles Listing */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-2">
                  {filteredArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onSelect={handleSelectArticle}
                      isSaved={savedIds.includes(article.id)}
                      onToggleSave={toggleSave}
                      variant="standard"
                    />
                  ))}
                </div>
              ) : (
                <div className="divide-y divide-stone-200 pt-2">
                  {filteredArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onSelect={handleSelectArticle}
                      isSaved={savedIds.includes(article.id)}
                      onToggleSave={toggleSave}
                      variant="compact"
                    />
                  ))}
                </div>
              )}

            </div>
          </section>

          {/* Letterpress Dispatch Invitation Banner */}
          <section className="py-14 border-t border-stone-200 bg-[#F4EFEA]">
            <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
              <span className="text-xs font-sans-ui uppercase tracking-widest text-stone-500 font-semibold">
                An Invitation to Slowness
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-stone-900">
                The Curatorial Sunday Courier
              </h2>
              <p className="font-reading text-base text-stone-700 max-w-xl mx-auto leading-relaxed">
                Join over eight thousand architects, typographers, horologists, and scholars who receive our unhurried weekend reflections. Delivered without trackers, banners, or algorithms.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsSubscribeOpen(true)}
                  className="cursor-pointer px-6 py-3 bg-stone-900 text-stone-50 text-xs font-sans-ui font-semibold rounded-md hover:bg-stone-800 transition-colors shadow-sm"
                >
                  Join the Reading Registry
                </button>
              </div>
            </div>
          </section>

        </div>
      )}

      {/* Footer */}
      <Footer
        onOpenManifesto={() => setIsManifestoOpen(true)}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedArticleId(null);
          setSelectedCategory(cat);
        }}
      />

      {/* Interactive Modals and Drawers */}
      <SavedArticlesDrawer
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedIds={savedIds}
        onRemoveSaved={removeSaved}
        onClearAll={clearAllSaved}
        onSelectArticle={handleSelectArticle}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={handleSelectArticle}
      />

      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
      />

      <ManifestoModal
        isOpen={isManifestoOpen}
        onClose={() => setIsManifestoOpen(false)}
      />

    </div>
  );
}
