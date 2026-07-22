'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { AuthModal } from '@/components/AuthModal';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Header() {
  const { user, setUser } = useStore();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <header className="h-16 border-b border-border bg-background/85 backdrop-blur-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        {/* Left Zone: Logo */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2 text-sm font-semibold tracking-tight hover:opacity-80 transition-opacity">
            <span className="text-[15px] font-sans">▲</span>
            <span className="font-sans font-semibold">onewave</span>
          </Link>
          <span className="hidden sm:inline-block h-4 w-px bg-border" />
          <span className="hidden sm:inline-block text-[11px] font-mono-label text-muted-foreground uppercase">
            Simulator
          </span>
        </div>

        {/* Right Zone: Controls & Vercel-style Actions */}
        <div className="flex items-center space-x-3">
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono-label text-muted-foreground">
                {user.email.split('@')[0]}
              </span>
              <button
                onClick={handleLogout}
                className="h-7 px-3 text-xs font-medium rounded-md border border-border bg-card hover:bg-secondary transition-all"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowAuthModal(true)}
                className="h-7 px-3 text-xs font-medium rounded-md hover:bg-secondary text-foreground transition-all"
              >
                Log In
              </button>
              <button
                onClick={() => setShowAuthModal(true)}
                className="h-7 px-3 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-sm"
              >
                Sign Up
              </button>
            </div>
          )}
          <span className="h-4 w-px bg-border mx-1" />
          <ThemeToggle />
        </div>
      </div>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </header>
  );
}
