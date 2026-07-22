'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import { generateMockPriceUpdate } from '@/lib/mockData';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function MarketOverview() {
  const { stocks, updateStocks } = useStore();

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedStocks = stocks.map(generateMockPriceUpdate);
      updateStocks(updatedStocks);
    }, 5000);

    return () => clearInterval(interval);
  }, [stocks, updateStocks]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <h2 className="text-xl font-display font-medium">Live Market Overview</h2>
        <span className="text-xs font-mono-label text-muted-foreground animate-pulse">Updates live</span>
      </div>
      <div className="divide-y divide-border">
        {/* Table Header Row */}
        <div className="flex items-center py-3 text-[10px] font-mono-label text-muted-foreground">
          <div className="w-1/4">Symbol</div>
          <div className="w-1/4">Name</div>
          <div className="w-1/6 text-right">Price</div>
          <div className="w-1/6 text-right">Change</div>
          <div className="w-1/6 text-right">Volume</div>
        </div>
        {/* Table Body Rows */}
        {stocks.map((stock) => {
          const isPositive = stock.percentageChange >= 0;
          return (
            <div 
              key={stock.symbol} 
              className="flex items-center py-4 text-sm font-sans hover:bg-secondary/40 transition-colors px-1"
            >
              <div className="w-1/4 font-semibold tracking-tight">{stock.symbol}</div>
              <div className="w-1/4 text-muted-foreground text-xs truncate pr-2">{stock.name}</div>
              <div className="w-1/6 text-right font-medium">${stock.price.toFixed(2)}</div>
              <div className="w-1/6 text-right">
                <span
                  className={`inline-flex items-center justify-end font-medium text-xs ${
                    isPositive ? 'text-accent' : 'text-destructive'
                  }`}
                >
                  {isPositive ? (
                    <ArrowUp className="h-3 w-3 mr-0.5" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-0.5" />
                  )}
                  {Math.abs(stock.percentageChange).toFixed(2)}%
                </span>
              </div>
              <div className="w-1/6 text-right text-xs text-muted-foreground">
                {stock.volume.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}