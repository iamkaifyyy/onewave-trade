'use client';

import { useStore } from '@/lib/store';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, Briefcase } from 'lucide-react';

export function Portfolio() {
  const { user, stocks } = useStore();

  if (!user) return null;

  const getStockCurrentPrice = (symbol: string) => {
    return stocks.find((s) => s.symbol === symbol)?.price || 0;
  };

  const calculatePositionValue = (symbol: string, quantity: number) => {
    const currentPrice = getStockCurrentPrice(symbol);
    return currentPrice * quantity;
  };

  const calculateProfitLoss = (symbol: string) => {
    const position = user.portfolio[symbol];
    if (!position) return 0;
    const currentValue = calculatePositionValue(symbol, position.quantity);
    const costBasis = position.averagePrice * position.quantity;
    return currentValue - costBasis;
  };

  const portfolioEntries = Object.entries(user.portfolio);

  return (
    <Card className="border border-border rounded-[22px] overflow-hidden bg-background">
      <CardHeader className="p-6 border-b border-border bg-secondary/10">
        <div className="flex items-center space-x-2">
          <Briefcase className="h-4 w-4 text-accent" />
          <CardTitle className="text-base font-display font-medium">Your Portfolio</CardTitle>
        </div>
        <CardDescription className="text-xs text-muted-foreground mt-0.5">
          Active trading holdings and real-time P&L performance.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          {portfolioEntries.map(([symbol, position]) => {
            const profitLoss = calculateProfitLoss(symbol);
            const isPositive = profitLoss >= 0;
            const currentVal = calculatePositionValue(symbol, position.quantity);
            return (
              <div
                key={symbol}
                className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
              >
                <div>
                  <h3 className="font-semibold text-sm tracking-tight">{symbol}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {position.quantity} shares @ ${position.averagePrice.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">${currentVal.toFixed(2)}</p>
                  <p
                    className={`text-xs font-medium inline-flex items-center mt-0.5 ${
                      isPositive ? 'text-accent' : 'text-destructive'
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="h-3 w-3 mr-0.5" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-0.5" />
                    )}
                    {isPositive ? '+' : ''}
                    ${Math.abs(profitLoss).toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
          {portfolioEntries.length === 0 && (
            <p className="text-xs font-mono-label text-muted-foreground py-4 text-center">
              NO ACTIVE HOLDINGS. START TRADING TO BUILD PORTFOLIO.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
