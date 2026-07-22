'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TradeModal } from '@/components/TradeModal';
import { Stock } from '@/lib/types';
import { Portfolio } from '@/components/Portfolio';
import { TradeHistory } from '@/components/TradeHistory';
import { ShieldAlert } from 'lucide-react';

export default function TradingDashboard() {
  const { stocks, user } = useStore();
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');

  const handleTrade = (stock: Stock, type: 'buy' | 'sell') => {
    setSelectedStock(stock);
    setTradeType(type);
  };

  if (!user) {
    return (
      <Card className="border border-border rounded-[22px] bg-secondary/30 p-6 flex flex-col items-center text-center justify-center min-h-[220px]">
        <ShieldAlert className="h-8 w-8 text-accent mb-3 animate-pulse" />
        <CardTitle className="text-base font-display font-medium">Authentication Required</CardTitle>
        <CardDescription className="text-xs text-muted-foreground mt-1 max-w-[240px]">
          Please sign in to access your simulated trading account and place mock orders.
        </CardDescription>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border border-border rounded-[22px] overflow-hidden bg-secondary/20">
        <CardHeader className="p-6 border-b border-border bg-background/50">
          <CardTitle className="text-lg font-display font-medium">Simulator Console</CardTitle>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xs font-mono-label text-muted-foreground">DEMO BALANCE</span>
            <span className="text-xl font-bold tracking-tight text-accent">
              ${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            <div className="text-[10px] font-mono-label text-muted-foreground px-1 flex justify-between">
              <span>ASSET</span>
              <span>ACTIONS</span>
            </div>
            {stocks.map((stock) => (
              <div
                key={stock.symbol}
                className="flex items-center justify-between p-4 bg-background border border-border/60 rounded-xl hover:border-foreground/20 transition-all"
              >
                <div>
                  <h3 className="font-semibold text-sm tracking-tight">{stock.symbol}</h3>
                  <p className="text-xs font-mono-label text-muted-foreground mt-0.5">
                    ${stock.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleTrade(stock, 'buy')}
                    className="px-3.5 py-1.5 bg-primary text-primary-foreground hover:opacity-90 active:scale-95 transition-all text-xs font-medium rounded-full"
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => handleTrade(stock, 'sell')}
                    className="px-3.5 py-1.5 border border-border hover:bg-secondary active:scale-95 transition-all text-xs font-medium rounded-full"
                  >
                    Sell
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Portfolio />
      <TradeHistory />

      {selectedStock && (
        <TradeModal
          stock={selectedStock}
          type={tradeType}
          onClose={() => setSelectedStock(null)}
        />
      )}
    </div>
  );
}
