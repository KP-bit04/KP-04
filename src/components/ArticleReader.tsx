import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Type, 
  Heart, 
  Check, 
  MessageSquare, 
  BookOpen,
  ArrowRight,
  Sun,
  Moon,
  Coffee
} from 'lucide-react';
import { Article, ARTICLES } from '../data/articles';

interface ArticleReaderProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (id: string) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

interface CommentItem {
  id: string;
  author: string;
  location: string;
  date: string;
  content: string;
  likes: number;
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({
  article,
  onBack,
  onSelectArticle,
  isSaved,
  onToggleSave
}) => {
  // Reading state
  const [readingProgress, setReadingProgress] = useState(0);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans'>('serif');
  const [themeMode, setThemeMode] = useState<'warm' | 'white' | 'dark'>('warm');
  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [claps, setClaps] = useState<number>(() => {
    const saved = localStorage.getItem(`claps_${article.id}`);
    return saved ? parseInt(saved, 10) : article.initialClaps;
  });
  const [hasClapped, setHasClapped] = useState(false);

  // Audio / Speech Synthesis
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Comments state
  const [comments, setComments] = useState<CommentItem[]>(() => {
    const saved = localStorage.getItem(`comments_${article.id}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return article.initialComments;
      }
    }
    return article.initialComments;
  });
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Scroll Progress Listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadingProgress(progress);
      }

      // Check active section
      for (const item of article.tableOfContents) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 100) {
            setActiveSectionId(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  // Clean up speech synthesis when unmounting or changing article
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [article.id]);

  // Speech narration toggle
  const toggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const narrativeText = `${article.title}. By ${article.author.name}. ${article.deck}. ${article.sections.map(s => (s.heading || '') + '. ' + s.paragraphs.join(' ')).join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(narrativeText);
      utterance.rate = speechRate;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      speechUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleClap = () => {
    const newCount = claps + 1;
    setClaps(newCount);
    setHasClapped(true);
    localStorage.setItem(`claps_${article.id}`, newCount.toString());
    setTimeout(() => setHasClapped(false), 600);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !newAuthor.trim()) return;

    const newComment = {
      id: 'usr_' + Date.now(),
      author: newAuthor.trim(),
      location: newLocation.trim() || 'Reader Archive',
      date: 'Just now',
      content: newCommentText.trim(),
      likes: 0
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem(`comments_${article.id}`, JSON.stringify(updated));
    setNewCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3000);
  };

  const handleLikeComment = (commentId: string) => {
    const updated = comments.map(c => c.id === commentId ? { ...c, likes: c.likes + 1 } : c);
    setComments(updated);
    localStorage.setItem(`comments_${article.id}`, JSON.stringify(updated));
  };

  // Theme styling classes
  const themeContainerClass = {
    warm: 'bg-[#FAF7F2] text-[#1C1917]',
    white: 'bg-white text-stone-900',
    dark: 'bg-[#18181B] text-[#E4E4E7]'
  }[themeMode];

  const themeBorderClass = {
    warm: 'border-stone-200',
    white: 'border-stone-200',
    dark: 'border-stone-800'
  }[themeMode];

  const themeMutedClass = {
    warm: 'text-stone-600',
    white: 'text-stone-600',
    dark: 'text-stone-400'
  }[themeMode];

  // Font size classes for body
  const fontSizeClass = {
    sm: 'text-[15px] leading-[1.8]',
    base: 'text-[17px] leading-[1.85]',
    lg: 'text-[19px] leading-[1.9]',
    xl: 'text-[21px] leading-[1.95]'
  }[fontSize];

  // Adjacent articles for bottom navigation
  const currentIndex = ARTICLES.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex > 0 ? ARTICLES[currentIndex - 1] : ARTICLES[ARTICLES.length - 1];
  const nextArticle = currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : ARTICLES[0];

  return (
    <div className={`min-h-screen transition-colors duration-200 ${themeContainerClass}`}>
      
      {/* Top Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 bg-stone-300 z-50 overflow-hidden" 
        style={{ height: '3px' }}
      >
        <div 
          className="h-full bg-stone-900 transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Reader Control Sub-header */}
      <div className={`sticky top-0 z-30 border-b backdrop-blur-md px-6 lg:px-12 py-3 transition-colors ${
        themeMode === 'dark' 
          ? 'bg-[#18181B]/90 border-stone-800 text-stone-300' 
          : 'bg-[#FAF7F2]/90 border-stone-200 text-stone-700'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Back button */}
          <button
            onClick={onBack}
            className="cursor-pointer inline-flex items-center gap-2 text-xs font-sans-ui font-medium hover:text-stone-900 transition-colors whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Return to Journal</span>
            <span className="sm:hidden">Back</span>
          </button>

          {/* Reading Customization Controls */}
          <div className="flex items-center gap-2 sm:gap-4 text-xs font-sans-ui">
            
            {/* Audio Reader Playback */}
            <button
              onClick={toggleAudio}
              className={`cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded border text-xs transition-colors ${
                isPlayingAudio 
                  ? 'bg-amber-100 border-amber-300 text-amber-900' 
                  : 'border-stone-300 hover:border-stone-700'
              }`}
              title={isPlayingAudio ? "Pause Audio Narration" : "Listen to Monograph"}
            >
              {isPlayingAudio ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Playing</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Listen</span>
                </>
              )}
            </button>

            {/* Font Family Switcher */}
            <button
              onClick={() => setFontFamily(fontFamily === 'serif' ? 'sans' : 'serif')}
              className="cursor-pointer p-1.5 rounded border border-stone-300 hover:border-stone-700 transition-colors text-xs"
              title="Toggle Serif / Sans Prose"
            >
              <span className={fontFamily === 'serif' ? 'font-serif font-bold' : 'font-sans font-bold'}>
                {fontFamily === 'serif' ? 'Serif' : 'Sans'}
              </span>
            </button>

            {/* Font Size Adjuster */}
            <div className="hidden sm:flex items-center border border-stone-300 rounded p-0.5">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-2 py-0.5 text-[11px] rounded transition-colors ${fontSize === 'sm' ? 'bg-stone-300/60 font-semibold' : ''}`}
                title="Small text"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-2 py-0.5 text-xs rounded transition-colors ${fontSize === 'base' ? 'bg-stone-300/60 font-semibold' : ''}`}
                title="Default text"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2 py-0.5 text-xs rounded font-medium transition-colors ${fontSize === 'lg' ? 'bg-stone-300/60 font-semibold' : ''}`}
                title="Large text"
              >
                A+
              </button>
            </div>

            {/* Reading Atmosphere (Warm / White / Dark) */}
            <div className="flex items-center border border-stone-300 rounded p-0.5">
              <button
                onClick={() => setThemeMode('warm')}
                className={`p-1.5 rounded transition-colors ${themeMode === 'warm' ? 'bg-amber-100 text-stone-900' : 'text-stone-500'}`}
                title="Warm Parchment"
              >
                <Coffee className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setThemeMode('white')}
                className={`p-1.5 rounded transition-colors ${themeMode === 'white' ? 'bg-stone-200 text-stone-900' : 'text-stone-500'}`}
                title="Gallery White"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setThemeMode('dark')}
                className={`p-1.5 rounded transition-colors ${themeMode === 'dark' ? 'bg-stone-800 text-stone-100' : 'text-stone-500'}`}
                title="Night Ink"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleSave(article.id)}
              className={`cursor-pointer p-1.5 rounded border transition-colors ${
                isSaved 
                  ? 'bg-stone-900 text-stone-50 border-stone-900' 
                  : 'border-stone-300 hover:border-stone-700'
              }`}
              title={isSaved ? "Saved in Reading Room" : "Save for later"}
            >
              <Bookmark className="w-3.5 h-3.5" />
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="cursor-pointer relative p-1.5 rounded border border-stone-300 hover:border-stone-700 transition-colors"
              title="Copy share link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              {copiedLink && (
                <span className="absolute -bottom-8 right-0 bg-stone-900 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap shadow-lg">
                  Link copied
                </span>
              )}
            </button>

          </div>

        </div>
      </div>

      {/* Main Article Container */}
      <main className="max-w-5xl mx-auto px-6 lg:px-8 py-10 lg:py-16">
        
        {/* Curatorial Header */}
        <div className="space-y-6 mb-10">
          
          <div className="flex items-center gap-2 text-xs font-sans-ui uppercase tracking-widest text-stone-500">
            <span>{article.volume}</span>
            <span aria-hidden="true">/</span>
            <span>{article.edition}</span>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-stone-800">{article.category}</span>
          </div>

          <h1 
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.14]"
            style={{ textWrap: 'balance' }}
          >
            {article.title}
          </h1>

          <p className="font-reading text-lg sm:text-xl opacity-80 leading-relaxed max-w-3xl">
            {article.deck}
          </p>

          {/* Author Attribution & Date Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-stone-200/80">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-12 h-12 rounded-full object-cover border border-stone-300"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="font-sans-ui text-sm font-semibold text-stone-900">
                  {article.author.name}
                </div>
                <div className="font-sans-ui text-xs text-stone-500">
                  {article.author.role} · {article.author.institution}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-sans-ui text-stone-500">
              <span>{article.publishedAt}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums font-mono">{article.readTime}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums font-mono">{claps} Claps</span>
            </div>
          </div>

        </div>

        {/* Lead Cover Image */}
        <div className="my-8 space-y-2">
          <div className="rounded-lg overflow-hidden border border-stone-200/80 bg-stone-200">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-auto max-h-[580px] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="font-display italic text-xs text-stone-500 px-1">
            Fig. 1 — {article.coverImageCaption}
          </p>
        </div>

        {/* Key Insights Overview Callout (Pattern: Hairline Border, Zero Left Accent) */}
        <div className="my-10 p-6 rounded-lg border border-stone-300/80 bg-stone-100/40 space-y-3">
          <div className="text-xs font-sans-ui uppercase tracking-widest text-stone-500 font-semibold">
            Monograph Thesis &amp; Core Invariants
          </div>
          <ul className="space-y-2 font-reading text-sm text-stone-700">
            {article.keyInsights.map((insight, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-stone-400 font-mono text-xs mt-0.5">0{idx + 1}.</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Content Layout with Asymmetric Table of Contents Rail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 my-10">
          
          {/* Main Reading Column (70%) */}
          <div className="lg:col-span-8">
            <div className={`space-y-10 ${fontFamily === 'serif' ? 'font-reading' : 'font-sans-ui'} ${fontSizeClass}`}>
              
              {article.sections.map((section, sIndex) => (
                <section key={section.id} id={section.id} className="space-y-6 pt-2">
                  
                  {section.heading && (
                    <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 border-b border-stone-200/70 pb-2">
                      {section.heading}
                    </h2>
                  )}

                  {section.paragraphs.map((para, pIndex) => {
                    // Apply drop cap on the very first paragraph of the first section
                    const isOpeningParagraph = sIndex === 0 && pIndex === 0;

                    return (
                      <p 
                        key={pIndex} 
                        className={`leading-relaxed text-stone-800 ${isOpeningParagraph ? 'editorial-dropcap' : ''}`}
                      >
                        {para}
                      </p>
                    );
                  })}

                  {/* Pull Quote: Framed by top and bottom hairline borders, NO thick left accent */}
                  {section.pullQuote && (
                    <div className="my-8 py-6 border-y border-stone-300 text-center px-4">
                      <blockquote className="font-display italic text-2xl sm:text-3xl text-stone-900 leading-snug">
                        “{section.pullQuote.text}”
                      </blockquote>
                      {section.pullQuote.author && (
                        <cite className="block font-sans-ui uppercase tracking-widest text-xs text-stone-500 not-italic mt-3">
                          — {section.pullQuote.author}
                        </cite>
                      )}
                    </div>
                  )}

                  {/* Callout box: Clean hairline border */}
                  {section.callout && (
                    <div className="my-6 p-5 rounded-md border border-stone-300 bg-stone-100/50 space-y-1.5">
                      <div className="text-xs font-sans-ui uppercase tracking-wider font-semibold text-stone-600">
                        {section.callout.label}
                      </div>
                      <p className="font-reading text-sm text-stone-700 leading-relaxed">
                        {section.callout.text}
                      </p>
                    </div>
                  )}

                </section>
              ))}

            </div>

            {/* Footnotes & Scholarly Citations */}
            <div className="mt-16 pt-8 border-t border-stone-300 space-y-4">
              <h3 className="font-display text-lg font-medium text-stone-900">
                References &amp; Archival Sources
              </h3>
              <ol className="space-y-2 font-reading text-xs text-stone-500 list-decimal list-inside leading-normal">
                {article.citations.map((cite, idx) => (
                  <li key={idx}>
                    <span className="italic">{cite}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Reader Claps & Appreciation Bar */}
            <div className="mt-12 py-6 px-6 rounded-lg border border-stone-300 bg-stone-100/50 flex items-center justify-between">
              <div>
                <div className="font-sans-ui text-sm font-semibold text-stone-900">
                  Did this monograph provoke thought?
                </div>
                <div className="font-sans-ui text-xs text-stone-500">
                  Signal appreciation to the author and the journal archive.
                </div>
              </div>

              <button
                onClick={handleClap}
                className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-md font-sans-ui text-xs font-medium transition-all ${
                  hasClapped
                    ? 'bg-amber-600 text-white scale-105'
                    : 'bg-stone-900 text-stone-50 hover:bg-stone-800'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${hasClapped ? 'fill-current' : ''}`} />
                <span>Applaud ({claps})</span>
              </button>
            </div>

            {/* Author Profile Block */}
            <div className="mt-14 p-6 sm:p-8 rounded-lg border border-stone-200 bg-[#FAF7F2] space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-16 h-16 rounded-full object-cover border border-stone-300"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-display text-xl font-medium text-stone-900">
                    {article.author.name}
                  </h4>
                  <p className="font-sans-ui text-xs text-stone-500">
                    {article.author.role} · {article.author.location}
                  </p>
                </div>
              </div>
              <p className="font-reading text-sm text-stone-700 leading-relaxed">
                {article.author.bio}
              </p>
            </div>

            {/* Comments & Curatorial Discussions Section */}
            <section className="mt-16 pt-10 border-t border-stone-200 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-2xl font-medium text-stone-900">
                    Reader Reflections
                  </h3>
                  <p className="font-sans-ui text-xs text-stone-500 mt-1">
                    Moderated discourse on craft, architecture, and temporal design.
                  </p>
                </div>
                <div className="font-mono text-xs text-stone-500">
                  {comments.length} Contributions
                </div>
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} className="p-5 rounded-lg border border-stone-300 bg-stone-100/40 space-y-4">
                <div className="text-xs font-sans-ui uppercase tracking-wider text-stone-600 font-semibold">
                  Leave a Thoughtful Note
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name / Scholar Title"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full text-xs font-sans-ui px-3 py-2 bg-white border border-stone-300 rounded focus:outline-none focus:border-stone-800"
                  />
                  <input
                    type="text"
                    placeholder="Your City or Institution"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full text-xs font-sans-ui px-3 py-2 bg-white border border-stone-300 rounded focus:outline-none focus:border-stone-800"
                  />
                </div>

                <textarea
                  required
                  rows={3}
                  placeholder="Share a perspective on the materials, history, or philosophy presented..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="w-full text-xs font-reading px-3 py-2 bg-white border border-stone-300 rounded focus:outline-none focus:border-stone-800 leading-relaxed"
                />

                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-sans-ui text-stone-500">
                    Persisted locally in your journal session.
                  </span>
                  <button
                    type="submit"
                    className="cursor-pointer px-4 py-2 bg-stone-900 text-stone-50 text-xs font-sans-ui font-semibold rounded hover:bg-stone-800 transition-colors"
                  >
                    Publish Note
                  </button>
                </div>

                {commentSuccess && (
                  <div className="text-xs font-sans-ui text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded">
                    Your reflection has been recorded to the archival record.
                  </div>
                )}
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="p-4 rounded-lg border border-stone-200 bg-white/70 space-y-2">
                    <div className="flex items-center justify-between text-xs font-sans-ui">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-stone-900">{comment.author}</span>
                        <span className="text-stone-400">·</span>
                        <span className="text-stone-500">{comment.location}</span>
                      </div>
                      <span className="text-stone-400 text-[11px]">{comment.date}</span>
                    </div>
                    <p className="font-reading text-sm text-stone-700 leading-relaxed">
                      {comment.content}
                    </p>
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => handleLikeComment(comment.id)}
                        className="cursor-pointer text-xs font-sans-ui text-stone-500 hover:text-stone-900 flex items-center gap-1"
                      >
                        <Heart className="w-3 h-3" />
                        <span className="tabular-nums">{comment.likes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </section>

          </div>

          {/* Right Column: Sticky Table of Contents & Dispatch (30%) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-20 space-y-8">
              
              {/* Table of Contents Rail */}
              <div className="p-6 rounded-lg border border-stone-200 bg-[#FAF7F2] space-y-4">
                <div className="text-xs font-sans-ui uppercase tracking-widest text-stone-500 font-semibold">
                  Section Index
                </div>
                <nav className="space-y-2 text-xs font-sans-ui">
                  {article.tableOfContents.map((toc) => (
                    <a
                      key={toc.id}
                      href={`#${toc.id}`}
                      className={`block py-1 transition-colors ${
                        activeSectionId === toc.id
                          ? 'text-stone-950 font-semibold pl-2 border-l border-stone-900'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {toc.title}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Journal Metadata Card */}
              <div className="p-6 rounded-lg border border-stone-200 bg-stone-100/40 space-y-3 font-sans-ui text-xs">
                <div className="font-semibold uppercase tracking-wider text-stone-700 text-[11px]">
                  Archival Accession
                </div>
                <div className="space-y-1.5 text-stone-600">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Record:</span>
                    <span className="font-mono text-stone-900">CF-{article.id.substring(0, 8).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Classification:</span>
                    <span>{article.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Words:</span>
                    <span className="tabular-nums font-mono">~{article.readMinutes * 220}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">License:</span>
                    <span>CC BY-NC 4.0</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Next / Previous Article Navigation Rail */}
        <div className="mt-20 pt-10 border-t border-stone-300 grid grid-cols-1 md:grid-cols-2 gap-6">
          {prevArticle && (
            <div 
              onClick={() => {
                onSelectArticle(prevArticle.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group cursor-pointer p-5 rounded-lg border border-stone-200 bg-[#FAF7F2] hover:border-stone-400 transition-colors"
            >
              <div className="text-[11px] font-sans-ui uppercase tracking-wider text-stone-500 mb-1">
                Previous Monograph
              </div>
              <div className="font-display text-lg font-medium text-stone-900 group-hover:text-stone-700 transition-colors">
                {prevArticle.title}
              </div>
              <div className="text-xs font-sans-ui text-stone-500 mt-2">
                {prevArticle.category} · {prevArticle.readTime}
              </div>
            </div>
          )}

          {nextArticle && (
            <div 
              onClick={() => {
                onSelectArticle(nextArticle.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group cursor-pointer p-5 rounded-lg border border-stone-200 bg-[#FAF7F2] hover:border-stone-400 transition-colors text-right"
            >
              <div className="text-[11px] font-sans-ui uppercase tracking-wider text-stone-500 mb-1">
                Next Monograph
              </div>
              <div className="font-display text-lg font-medium text-stone-900 group-hover:text-stone-700 transition-colors">
                {nextArticle.title}
              </div>
              <div className="text-xs font-sans-ui text-stone-500 mt-2">
                {nextArticle.category} · {nextArticle.readTime}
              </div>
            </div>
          )}
        </div>

      </main>

    </div>
  );
};
