'use client';

import { Suspense } from 'react';
import MarketOverview from '@/components/MarketOverview';
import TradingDashboard from '@/components/TradingDashboard';
import { StockChart } from '@/components/StockChart';
import { ConnectionStatus } from '@/components/ConnectionStatus';
import { HeroSection } from '@/components/HeroSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-background transition-colors">
      <ConnectionStatus />
      
      {/* Dynamic Vercel Hero Section */}
      <HeroSection />

      {/* Main Console & Dashboard Layout */}
      <div id="dashboard-view" className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Main View (Market & Charts) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="p-6 bg-card border border-border rounded-[22px] shadow-lvl2">
              <Suspense fallback={<div className="text-xs font-mono-label text-muted-foreground animate-pulse">Loading market overview...</div>}>
                <MarketOverview />
              </Suspense>
            </div>
            
            <Suspense fallback={<div className="text-xs font-mono-label text-muted-foreground animate-pulse">Loading charts analysis...</div>}>
              <StockChart />
            </Suspense>
          </div>

          {/* Right Control Panel (Dashboard & Ledger) */}
          <div className="lg:col-span-4">
            <Suspense fallback={<div className="text-xs font-mono-label text-muted-foreground animate-pulse">Loading trading console...</div>}>
              <TradingDashboard />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
