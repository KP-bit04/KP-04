import React, { useState } from 'react';
import { X, CheckCircle, Mail, Send } from 'lucide-react';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState<'weekly' | 'quarterly'>('weekly');
  const [isSubscribed, setIsSubscribed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    localStorage.setItem('chronos_subscriber_email', email);
    localStorage.setItem('chronos_subscriber_freq', frequency);
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail('');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative w-full max-w-lg bg-[#FAF7F2] border border-stone-300 rounded-lg shadow-2xl p-6 sm:p-8 space-y-6">
        
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-sans-ui uppercase tracking-widest text-stone-500 font-semibold">
              The Sunday Dispatch
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-stone-900">
              Receive Our Print &amp; Digital Monograph
            </h2>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer p-1 text-stone-400 hover:text-stone-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="font-reading text-sm text-stone-600 leading-relaxed">
          Every Sunday morning, we transmit a single long-form essay on architectural materiality, horological craft, cartography, or quiet contemplation. Zero telemetry, zero sponsored content.
        </p>

        {isSubscribed ? (
          <div className="p-4 rounded-md bg-stone-100 border border-stone-300 text-center space-y-2">
            <CheckCircle className="w-6 h-6 text-stone-800 mx-auto" />
            <div className="font-display text-lg text-stone-900">
              Your name has been inscribed.
            </div>
            <p className="font-reading text-xs text-stone-600">
              Expect the forthcoming issue in your inbox this Sunday at dawn.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-2">
              <label className="block text-xs font-sans-ui uppercase tracking-wider text-stone-600 font-semibold">
                Delivery Schedule
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-sans-ui">
                <button
                  type="button"
                  onClick={() => setFrequency('weekly')}
                  className={`cursor-pointer p-2.5 rounded border text-left transition-colors ${
                    frequency === 'weekly'
                      ? 'border-stone-900 bg-stone-900 text-stone-50'
                      : 'border-stone-300 bg-white text-stone-700'
                  }`}
                >
                  <div className="font-semibold">Weekly Dispatch</div>
                  <div className="text-[11px] opacity-80">Full single essay</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency('quarterly')}
                  className={`cursor-pointer p-2.5 rounded border text-left transition-colors ${
                    frequency === 'quarterly'
                      ? 'border-stone-900 bg-stone-900 text-stone-50'
                      : 'border-stone-300 bg-white text-stone-700'
                  }`}
                >
                  <div className="font-semibold">Quarterly Compendium</div>
                  <div className="text-[11px] opacity-80">Curated digest only</div>
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-sans-ui uppercase tracking-wider text-stone-600 font-semibold">
                Your Preferred Postal or Digital Inbox
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="scholar@institution.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 text-xs font-sans-ui px-3.5 py-2.5 bg-white border border-stone-300 rounded focus:outline-none focus:border-stone-900"
                />
                <button
                  type="submit"
                  className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2.5 bg-stone-900 text-stone-50 text-xs font-sans-ui font-semibold rounded hover:bg-stone-800 transition-colors whitespace-nowrap"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-[11px] font-sans-ui text-stone-500">
              Unsubscribe anytime with one quiet click. We respect the silence of your inbox.
            </p>
          </form>
        )}

      </div>
    </div>
  );
};
