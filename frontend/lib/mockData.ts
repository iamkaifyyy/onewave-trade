import { Stock } from './types';

export const initialStocks: Stock[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 150.25,
    previousPrice: 149.8,
    percentageChange: 0.3,
    volume: 1000000,
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 2750.8,
    previousPrice: 2745.5,
    percentageChange: 0.19,
    volume: 500000,
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 285.9,
    previousPrice: 283.75,
    percentageChange: 0.76,
    volume: 750000,
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 3300.45,
    previousPrice: 3290.2,
    percentageChange: 0.31,
    volume: 600000,
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 890.5,
    previousPrice: 885.3,
    percentageChange: 0.59,
    volume: 900000,
  },
];

export function generateMockPriceUpdate(stock: Stock): Stock {
    const priceChange = (Math.random() - 0.5) * (stock.price * 0.02)
    const newPrice = stock.price + priceChange;

    const percentageChange = ((newPrice - stock.previousPrice)/ stock.previousPrice) * 100;

    return {
        ...stock,
        previousPrice: stock.price,
        price: parseFloat(newPrice.toFixed(2)),
        percentageChange: parseFloat(percentageChange.toFixed(2)),
        volume: stock.volume + Math.floor(Math.random() * 10000),
    };
}