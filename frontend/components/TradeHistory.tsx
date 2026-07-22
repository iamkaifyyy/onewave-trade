'use client';

import { useStore } from '@/lib/store';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { History, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function TradeHistory() {
  const { trades } = useStore();

  return (
    <Card className="border border-border rounded-[22px] overflow-hidden bg-background">
      <CardHeader className="p-6 border-b border-border bg-secondary/10">
        <div className="flex items-center space-x-2">
          <History className="h-4 w-4 text-accent" />
          <CardTitle className="text-base font-display font-medium">Trade Ledger</CardTitle>
        </div>
        <CardDescription className="text-xs text-muted-foreground mt-0.5">
          History of all simulated orders placed.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          {trades.map((trade, index) => {
            const isBuy = trade.type === 'buy';
            return (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
              >
                <div>
                  <h3 className="font-semibold text-sm tracking-tight flex items-center">
                    {isBuy ? (
                      <span className="text-accent inline-flex items-center">
                        Bought <ArrowDownRight className="h-3.5 w-3.5 ml-0.5" />
                      </span>
                    ) : (
                      <span className="text-muted-foreground inline-flex items-center">
                        Sold <ArrowUpRight className="h-3.5 w-3.5 ml-0.5" />
                      </span>
                    )}{' '}
                    <span className="ml-1 text-foreground">{trade.symbol}</span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {trade.quantity} shares @ ${trade.price.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">
                    ${(trade.quantity * trade.price).toFixed(2)}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {new Date(trade.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            );
          })}
          {trades.length === 0 && (
            <p className="text-xs font-mono-label text-muted-foreground py-4 text-center">
              NO TRANSACTION HISTORY FOUND.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
