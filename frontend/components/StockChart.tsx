'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartTypeSelector } from '@/components/ChartTypeSelector';
import { StockSelector } from '@/components/StockSelector';
import { ChartContent } from '@/components/ChartContent';
import { Switch } from '@/components/ui/switch';

type ChartType = 'line' | 'area' | 'bar';

interface PriceData {
  [key: string]: number | string;
  time: string;
}

export function StockChart() {
  const { stocks } = useStore();
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  const [priceHistory, setPriceHistory] = useState<PriceData[]>([]);
  const [chartType, setChartType] = useState<ChartType>('line');
  const [showPercentages, setShowPercentages] = useState(true);

  useEffect(() => {
    if (stocks.length > 0 && selectedStocks.length === 0) {
      setSelectedStocks([stocks[0].symbol]);
    }
  }, [stocks]);

  useEffect(() => {
    if (selectedStocks.length === 0) return;

    const selectedStockData = stocks.filter((s) =>
      selectedStocks.includes(s.symbol)
    );

    setPriceHistory((prev) => {
      const newPoint: PriceData = {
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      };

      selectedStockData.forEach((stock) => {
        newPoint[stock.symbol] = stock.price;
      });

      return [...prev, newPoint].slice(-25);
    });
  }, [stocks, selectedStocks]);

  return (
    <Card className="rounded-[22px] border border-border shadow-sm overflow-hidden bg-card/40 backdrop-blur-sm">
      <CardHeader className="space-y-4 p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle className="text-lg font-display font-medium">Interactive Price Analysis</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5 font-mono-label">Compare live indicators</p>
          </div>
          <ChartTypeSelector activeType={chartType} onChange={setChartType} />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <StockSelector
            stocks={stocks}
            selectedStocks={selectedStocks}
            onSelect={setSelectedStocks}
          />
          <div className="flex items-center space-x-2.5">
            <Switch
              checked={showPercentages}
              onCheckedChange={setShowPercentages}
              id="percentage-mode"
            />
            <label
              htmlFor="percentage-mode"
              className="text-xs font-mono-label text-muted-foreground whitespace-nowrap cursor-pointer"
            >
              Percentage Mode
            </label>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[360px] w-full">
          {selectedStocks.length > 0 ? (
            <ChartContent
              data={priceHistory}
              type={chartType}
              dataKeys={selectedStocks}
              showPercentages={showPercentages}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs font-mono-label text-muted-foreground">
              Select tickers to display chart
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
