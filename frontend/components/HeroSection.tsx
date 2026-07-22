'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { AuthModal } from '@/components/AuthModal';
import { ArrowRight, Sparkles, Cpu } from 'lucide-react';

export function HeroSection() {
  const { user } = useStore();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleStart = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      const element = document.getElementById('dashboard-view');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="mesh-gradient-container border-b border-border bg-background py-16 md:py-24 transition-colors">
      {/* multicolor mesh gradient backdrop */}
      <div className="mesh-gradient-bg" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-6">
        {/* Eyebrow badge banner */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-secondary border border-border rounded-full text-[10px] font-mono-label text-muted-foreground uppercase shadow-sm">
          <Sparkles className="h-3 w-3 text-accent animate-pulse" />
          <span>REAL-TIME SANDBOX ENVIRONMENT v1.0</span>
        </div>

        {/* Display Heading: Sentence-case, period-terminated, tight display */}
        <h1 className="text-4xl sm:text-6xl font-display tracking-tight text-foreground max-w-2xl mx-auto">
          Real-time trading, built for developers.
        </h1>

        {/* Lead Paragraph */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Simulate stock transactions, track portfolios, and compare live tickers with zero actual capital. Optimized layout, high accuracy, zero fluff.
        </p>

        {/* Dynamic conversion actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={handleStart}
            className="w-full sm:w-auto button-primary-pill inline-flex items-center justify-center space-x-2"
          >
            <span>{user ? 'Go to Simulator Console' : 'Start Simulator'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href="https://github.com/iamkaifyyy/onewave-trade"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto button-secondary-pill inline-flex items-center justify-center"
          >
            Explore codebase
          </a>
        </div>

        {/* Micro statistics or trust indicators */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-12 max-w-lg mx-auto border-t border-dashed border-border/80">
          <div className="text-center">
            <p className="text-xs font-mono-label text-muted-foreground uppercase">SIMULATED CAPITAL</p>
            <p className="text-lg font-semibold tracking-tight text-foreground mt-0.5">$100,000.00</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-mono-label text-muted-foreground uppercase">TICKER REFRESH</p>
            <p className="text-lg font-semibold tracking-tight text-foreground mt-0.5">5,000ms</p>
          </div>
          <div className="text-center col-span-2 md:col-span-1">
            <p className="text-xs font-mono-label text-muted-foreground uppercase">ACCURACY LAYER</p>
            <p className="text-lg font-semibold tracking-tight text-foreground mt-0.5 inline-flex items-center justify-center">
              <Cpu className="h-4 w-4 mr-1 text-accent" />
              100% Mock
            </p>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </section>
  );
}
