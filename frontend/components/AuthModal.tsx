'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, type UserCredentials } from '@/lib/auth';
import { useStore } from '@/lib/store';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { KeyRound, Loader2, Code2, Terminal } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useStore();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<UserCredentials>({
    resolver: zodResolver(userSchema),
  });

  // Watch inputs for the live API curl request preview
  const watchedEmail = watch('email');
  const watchedPassword = watch('password');

  const emailDisplay = watchedEmail || 'developer@onewave.trade';
  const passwordDisplay = watchedPassword ? '••••••••' : '••••••••';

  const onSubmit = async (data: UserCredentials) => {
    setIsLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://onewave-trade.onrender.com';
      const response = await fetch(`${API_URL}/api/auth/${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      localStorage.setItem('token', result.token);
      setUser(result.user);
      toast({
        title: isLogin ? 'Session Authorized' : 'Account Provisioned',
        description: isLogin
          ? 'Developer token saved to localStorage'
          : 'Credentials created successfully',
      });
      reset();
      onClose();
    } catch (error) {
      toast({
        title: 'Authentication Error',
        description: error instanceof Error ? error.message : 'HTTP request failed',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = (mode: boolean) => {
    setIsLogin(mode);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[460px] p-0 overflow-hidden border border-border bg-background rounded-[12px] shadow-lvl5">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-secondary/80 border-b border-border">
          <div className="flex items-center space-x-2">
            <Terminal className="h-4 w-4 text-muted-foreground" />
            <span className="text-[10px] font-mono-label text-muted-foreground uppercase tracking-wider">
              Secure Auth Console v1.0
            </span>
          </div>
          <div className="flex space-x-1">
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center space-y-1.5">
            <div className="inline-flex p-2 bg-secondary rounded-xl border border-border">
              <KeyRound className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-base font-display font-medium">
              {isLogin ? 'Authorize Developer Session' : 'Register Credentials'}
            </h2>
            <p className="text-xs text-muted-foreground">
              {isLogin ? 'Provide keys to authenticate simulated trades.' : 'Provision credentials for trading sandbox.'}
            </p>
          </div>

          {/* Interactive Switcher */}
          <div className="flex bg-secondary p-0.5 rounded-lg border border-border">
            <button
              onClick={() => switchMode(true)}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                isLogin ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
              }`}
            >
              Session Login
            </button>
            <button
              onClick={() => switchMode(false)}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                !isLogin ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
              }`}
            >
              Credentials Signup
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="auth-email" className="text-[10px] font-mono-label text-muted-foreground">
                EMAIL_ADDRESS
              </label>
              <Input
                id="auth-email"
                type="email"
                {...register('email')}
                placeholder="name@example.com"
                className="h-10 bg-secondary/20 border-border/80 focus:border-accent focus:ring-accent/10 transition-all text-xs"
              />
              {errors.email && (
                <p className="text-[10px] text-destructive font-mono-label mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label htmlFor="auth-password" className="text-[10px] font-mono-label text-muted-foreground">
                ACCESS_TOKEN
              </label>
              <Input
                id="auth-password"
                type="password"
                {...register('password')}
                placeholder="Min. 8 characters"
                className="h-10 bg-secondary/20 border-border/80 focus:border-accent focus:ring-accent/10 transition-all text-xs"
              />
              {errors.password && (
                <p className="text-[10px] text-destructive font-mono-label mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Live cURL Request Preview */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono-label text-muted-foreground flex items-center">
                <Code2 className="h-3.5 w-3.5 mr-1 text-accent" />
                LIVE REQUEST PREVIEW
              </span>
              <div className="p-3 bg-secondary/50 border border-border rounded-lg overflow-x-auto text-[10px] font-mono text-muted-foreground leading-normal select-all">
                <span className="text-accent">curl</span> -X POST &quot;/api/auth/{isLogin ? 'login' : 'register'}&quot; \<br />
                &nbsp;&nbsp;-H &quot;Content-Type: application/json&quot; \<br />
                &nbsp;&nbsp;-d &#123; &quot;email&quot;: &quot;{emailDisplay}&quot;, &quot;password&quot;: &quot;{passwordDisplay}&quot; &#125;
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 mt-2 bg-primary text-primary-foreground font-medium rounded-lg text-xs hover:opacity-95 transition-all shadow-sm flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              ) : (
                <span>Execute Connection Request</span>
              )}
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}