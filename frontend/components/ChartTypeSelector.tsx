'use client';

import { BarChart3, LineChart, AreaChart } from 'lucide-react';

type ChartType = 'line' | 'area' | 'bar';

interface ChartTypeSelectorProps {
  activeType: ChartType;
  onChange?: (type: ChartType) => void;
}

export function ChartTypeSelector({
  activeType,
  onChange,
}: ChartTypeSelectorProps) {
  return (
    <div className="flex space-x-1 bg-secondary p-1 rounded-full border border-border">
      <button
        onClick={() => onChange?.('area')}
        className={`flex items-center space-x-1 px-3 py-1 text-xs font-medium rounded-full transition-all ${
          activeType === 'area'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <AreaChart className="h-3 w-3" />
        <span>Area</span>
      </button>
      <button
        onClick={() => onChange?.('line')}
        className={`flex items-center space-x-1 px-3 py-1 text-xs font-medium rounded-full transition-all ${
          activeType === 'line'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <LineChart className="h-3 w-3" />
        <span>Line</span>
      </button>
      <button
        onClick={() => onChange?.('bar')}
        className={`flex items-center space-x-1 px-3 py-1 text-xs font-medium rounded-full transition-all ${
          activeType === 'bar'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <BarChart3 className="h-3 w-3" />
        <span>Bar</span>
      </button>
    </div>
  );
}
