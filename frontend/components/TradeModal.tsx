'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Stock } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TradeModalProps {
  stock: Stock;
  type: 'buy' | 'sell';
  onClose: () => void;
}

export function TradeModal({ stock, type, onClose }: TradeModalProps) {
  const [quantity, setQuantity] = useState('1');
  const { user, setUser, addTrade } = useStore();
  const { toast } = useToast();

  const handleTrade = () => {
    if (!user) return;

    const qty = parseInt(quantity);
    if (isNaN(qty) || qty <= 0) {
      toast({
        title: 'Invalid quantity',
        description: 'Please enter a positive integer quantity.',
        variant: 'destructive',
      });
      return;
    }

    const total = qty * stock.price;

    if (type === 'buy') {
      if (total > user.balance) {
        toast({
          title: 'Insufficient funds',
          description: 'You do not have enough balance for this trade.',
          variant: 'destructive',
        });
        return;
      }

      setUser({
        ...user,
        balance: user.balance - total,
        portfolio: {
          ...user.portfolio,
          [stock.symbol]: {
            quantity: (user.portfolio[stock.symbol]?.quantity || 0) + qty,
            averagePrice:
              ((user.portfolio[stock.symbol]?.averagePrice || 0) *
                (user.portfolio[stock.symbol]?.quantity || 0) +
                total) /
              ((user.portfolio[stock.symbol]?.quantity || 0) + qty),
          },
        },
      });
    } else {
      const currentQty = user.portfolio[stock.symbol]?.quantity || 0;
      if (qty > currentQty) {
        toast({
          title: 'Insufficient shares',
          description: 'You do not have enough shares for this trade.',
          variant: 'destructive',
        });
        return;
      }

      const newQty = currentQty - qty;
      const newPortfolio = { ...user.portfolio };
      if (newQty === 0) {
        delete newPortfolio[stock.symbol];
      } else {
        newPortfolio[stock.symbol] = {
          ...newPortfolio[stock.symbol],
          quantity: newQty,
        };
      }

      setUser({
        ...user,
        balance: user.balance + total,
        portfolio: newPortfolio,
      });
    }

    addTrade({
      symbol: stock.symbol,
      quantity: qty,
      price: stock.price,
      type,
      timestamp: new Date(),
    });

    toast({
      title: 'Trade executed',
      description: `Successfully ${type === 'buy' ? 'bought' : 'sold'} ${qty} shares of ${stock.symbol}`,
    });

    onClose();
  };

  const parsedQty = parseInt(quantity) || 0;
  const isBuy = type === 'buy';

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden border border-border bg-background rounded-[22px] shadow-2xl">
        <DialogHeader className="p-6 border-b border-border bg-secondary/10 flex flex-row items-center space-x-3 space-y-0">
          <div className={`p-2 rounded-xl border ${isBuy ? 'bg-accent/15 border-accent/20 text-accent' : 'bg-muted border-border text-muted-foreground'}`}>
            {isBuy ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
          </div>
          <div>
            <DialogTitle className="text-base font-display font-medium">
              {isBuy ? 'Buy Order' : 'Sell Order'} — {stock.symbol}
            </DialogTitle>
            <p className="text-[10px] font-mono-label text-muted-foreground mt-0.5">
              Live price: ${stock.price.toFixed(2)}
            </p>
          </div>
        </DialogHeader>
        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <label htmlFor="quantity" className="text-xs font-mono-label text-muted-foreground">
              Quantity
            </label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="h-11 bg-muted/30 border-border/80 focus:border-accent focus:ring-accent/10 transition-colors"
            />
          </div>
          <div className="flex justify-between items-center py-3 border-t border-b border-dashed border-border/80 text-xs font-mono-label">
            <span className="text-muted-foreground">Estimated Cost:</span>
            <span className={`text-sm font-semibold ${isBuy ? 'text-accent' : 'text-foreground'}`}>
              ${(parsedQty * stock.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-secondary/5">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-border hover:bg-secondary transition-colors text-xs font-medium rounded-full"
          >
            Cancel Order
          </button>
          <button
            onClick={handleTrade}
            className={`px-5 py-2 text-xs font-medium rounded-full text-white shadow-lg transition-all ${
              isBuy 
                ? 'bg-accent hover:bg-accent/90 shadow-accent/20' 
                : 'bg-primary hover:opacity-90 shadow-primary/20'
            }`}
          >
            Confirm {isBuy ? 'Buy' : 'Sell'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}