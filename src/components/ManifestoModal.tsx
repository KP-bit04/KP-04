import React, { useEffect } from 'react';
import { X, BookOpen } from 'lucide-react';

interface ManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManifestoModal: React.FC<ManifestoModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative w-full max-w-2xl bg-[#FAF7F2] border border-stone-300 rounded-lg shadow-2xl p-6 sm:p-10 my-8 space-y-6">
        
        <div className="flex items-start justify-between border-b border-stone-200 pb-4">
          <div>
            <span className="text-[11px] font-sans-ui uppercase tracking-widest text-stone-500 font-semibold">
              Editorial Charter · Established 2026
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-stone-900 mt-1">
              The Chronos &amp; Form Manifesto
            </h2>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer p-1 text-stone-400 hover:text-stone-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5 font-reading text-stone-800 text-sm sm:text-base leading-relaxed">
          <p className="editorial-dropcap">
            We live in an epoch of unprecedented computational acceleration, yet our lived physical environments and tools have grown thinner, colder, and increasingly disposable. We touch glass sixteen hours a day. We surrender our memories to cloud servers whose physical locations we cannot name. We construct buildings out of synthetic cladding that will dissolve in forty years.
          </p>

          <p>
            <em>Chronos &amp; Form</em> was founded on a singular conviction: human meaning resides in resistance, in mass, in friction, and in deep time.
          </p>

          <div className="my-6 py-4 border-y border-stone-300 space-y-3 font-sans-ui text-xs">
            <div className="font-semibold uppercase tracking-wider text-stone-900">
              Our Five Invariant Principles
            </div>
            <ul className="space-y-2 text-stone-700">
              <li className="flex gap-2">
                <span className="font-mono text-stone-500">I.</span>
                <span><strong>The Hand Precedes the Eye:</strong> True craft originates in physical touch before it arrives at intellectual categorization.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-stone-500">II.</span>
                <span><strong>Permanence over Novelty:</strong> We celebrate materials—brick, granite, brass, linen, sourdough, foundry lead—that weather gracefully across generations.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-stone-500">III.</span>
                <span><strong>Deep Temporal Horizon:</strong> Any design unable to endure across at least a century of human use is mere consumer distraction.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-stone-500">IV.</span>
                <span><strong>The Sanctity of Attention:</strong> We publish zero algorithm-driven bait, zero automated telemetry tickers, and zero superficial novelty.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-stone-500">V.</span>
                <span><strong>The Dignity of the Page:</strong> Layout and reading cadence must respect human cognitive anatomy and visual peace.</span>
              </li>
            </ul>
          </div>

          <p>
            We invite you to read slowly, to question the hollow convenience of modern disposability, and to rediscover the quiet sovereignty of things made to last.
          </p>
        </div>

        <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs font-sans-ui text-stone-500">
          <span>The Editorial Board, Geneva &amp; Kyoto</span>
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 bg-stone-900 text-stone-50 rounded hover:bg-stone-800 transition-colors"
          >
            Acknowledge &amp; Close
          </button>
        </div>

      </div>
    </div>
  );
};
