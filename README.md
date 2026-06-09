<div align="center">

# onewave-trade

### Real-time trading simulator built different.

**Live prices. Real-time charts. Full watchlist. Zero fluff.**

[Demo](#) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## What the heck is this? Oii Boys
onewave-trade is a **real-time stock trading simulator** — no real money,
can do paper trades as well, all the adrenaline. Built on Next.js 15 with a fully type-safe TypeScript codebase, Tailwind CSS for a UI that actually slaps, and live market data so your fake portfolio bleeds in real time.

## the equity is $100,000 
No mid code. No ugly dashboards. Just a clean, fast, fintech-grade build you can fork, extend, and ship.

---

## Features

- ** Live Price Feed** — real-time market data, updating as the market moves
- ** Interactive Charts** — price history, candlesticks, and performance overlays
- **📋Watchlist** — track your favourite tickers, add/remove on the fly
- ** Portfolio Tracker** — virtual trades, P&L, position sizing — the whole thing
- **Real-Time Updates** — no page refreshes, data just flows
- ** Type-Safe** — end-to-end TypeScript, no `any` crimes committed
- ** Fully Responsive** — desktop to mobile, it just works

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Data | Live market price API |
| Charts | (your chart lib, e.g. Recharts / TradingView) |
| State | (Zustand / Context / etc.) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/tradesim.git

# Move into the project
cd onewave-trade

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_KEY=your_market_data_api_key
NEXT_PUBLIC_API_URL=https://your-data-source.com
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and watch your fake money move.

---

## Project Structure

```
tradesim/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Home / Dashboard
│   ├── layout.tsx        # Root layout
│   └── ...
├── components/           # Reusable UI components
│   ├── Chart/
│   ├── Watchlist/
│   ├── Portfolio/
│   └── ...
├── lib/                  # Utilities, API helpers, types
├── hooks/                # Custom React hooks
├── types/                # Global TypeScript types
└── public/               # Static assets
```

---

## Roadmap

- [ ] Paper trading order book (limit, market, stop-loss)
- [ ] Multi-portfolio support
- [ ] Options chain simulator
- [ ] AI-powered trade insights
- [ ] Auth + persistent portfolios (Clerk / NextAuth)
- [ ] Leaderboard — flex on your friends

---

## Contributing

Pull requests are open. Fork it, build something based, submit a PR.

```bash
git checkout -b feature/your-feature
git commit -m "feat: add something based"
git push origin feature/your-feature
```

---

## License

MIT — do whatever you want, just don't blame me if your sim portfolio also reks you.

---

<div align="center">

Built with Boyss [Kaifyyy](https://github.com/iamkaifyyy)

 **Star it if you fw it. Fork it if you're about it. Oii, Boyss Daddy's Home**

</div>
