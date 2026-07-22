'use client';

import { Stock } from '@/lib/types';
import { useCallback, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown, X } from 'lucide-react';

interface StockSelectorProps {
  stocks: Stock[];
  selectedStocks: string[];
  onSelect: (symbols: string[]) => void;
}

export function StockSelector({
  stocks = [],
  selectedStocks = [],
  onSelect,
}: StockSelectorProps) {
  const [open, setOpen] = useState(false);

  const handleSelectAll = useCallback(() => {
    onSelect(stocks.map((s) => s.symbol));
    setOpen(false);
  }, [stocks, onSelect]);

  const handleSelectStock = useCallback(
    (symbol: string) => {
      if (selectedStocks.includes(symbol)) {
        onSelect(selectedStocks.filter((s) => s !== symbol));
      } else {
        onSelect([...selectedStocks, symbol]);
      }
    },
    [selectedStocks, onSelect]
  );

  const handleRemoveStock = useCallback(
    (symbol: string, e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onSelect(selectedStocks.filter((s) => s !== symbol));
    },
    [selectedStocks, onSelect]
  );

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className="flex items-center space-x-1.5 px-4 py-1.5 border border-dashed border-border hover:border-foreground/45 transition-colors rounded-full text-xs font-mono-label bg-background"
            role="combobox"
            aria-expanded={open}
          >
            <span>SELECT TICKERS</span>
            <ChevronsUpDown className="h-3 w-3 opacity-60" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[180px] p-1 bg-background border border-border shadow-xl rounded-md" align="start">
          <div className="flex flex-col space-y-0.5">
            <button
              className="flex items-center justify-between px-2.5 py-1.5 text-xs rounded hover:bg-secondary text-left transition-colors font-mono-label"
              onClick={handleSelectAll}
            >
              <span>ALL SYMBOLS</span>
              {selectedStocks.length === stocks.length && (
                <Check className="h-3.5 w-3.5" />
              )}
            </button>
            {stocks.map((stock) => (
              <button
                key={stock.symbol}
                className="flex items-center justify-between px-2.5 py-1.5 text-xs rounded hover:bg-secondary text-left transition-colors font-medium"
                onClick={() => handleSelectStock(stock.symbol)}
              >
                <span>{stock.symbol}</span>
                {selectedStocks.includes(stock.symbol) && (
                  <Check className="h-3.5 w-3.5 text-accent" />
                )}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <div className="flex flex-wrap gap-1.5">
        {selectedStocks.map((symbol) => (
          <span
            key={symbol}
            className="inline-flex items-center gap-1 px-3 py-1 bg-secondary border border-border hover:border-foreground/30 transition-colors text-xs font-medium rounded-full"
          >
            {symbol}
            <X
              className="h-3 w-3 cursor-pointer opacity-50 hover:opacity-100 hover:text-destructive"
              onClick={(e) => handleRemoveStock(symbol, e)}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
