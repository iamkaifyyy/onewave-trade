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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Lock, ArrowRight, TrendingUp, Loader2 } from 'lucide-react';

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
  } = useForm<UserCredentials>({
    resolver: zodResolver(userSchema),
  });

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
        title: isLogin ? 'Welcome back!' : 'Account created',
        description: isLogin
          ? 'Successfully logged in to your account'
          : 'Your account has been created successfully',
      });
      reset();
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] p-0 border-0 overflow-hidden bg-transparent shadow-2xl">
        {/* Gradient background container */}
        <div className="relative">
          {/* Decorative gradient header */}
          <div className="relative h-44 overflow-hidden rounded-t-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,80,255,0.3),transparent_50%)]" />

            {/* Floating orbs */}
            <div className="absolute top-6 right-8 w-20 h-20 rounded-full bg-white/10 blur-xl animate-pulse" />
            <div className="absolute bottom-4 left-12 w-14 h-14 rounded-full bg-purple-300/20 blur-lg animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Header content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm mb-3 border border-white/20">
                <TrendingUp className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">
                {isLogin ? 'Welcome Back' : 'Get Started'}
              </h2>
              <p className="text-sm text-purple-100/80 mt-1">
                {isLogin ? 'Sign in to your trading account' : 'Create your trading account'}
              </p>
            </div>
          </div>

          {/* Form section */}
          <div className="bg-background rounded-b-lg px-8 py-7">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email field */}
              <div className="space-y-2">
                <label htmlFor="auth-email" className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="auth-email"
                    type="email"
                    {...register('email')}
                    placeholder="name@example.com"
                    className="pl-10 h-11 bg-muted/50 border-muted-foreground/20 focus:border-violet-500 focus:ring-violet-500/20 transition-colors"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <label htmlFor="auth-password" className="text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="auth-password"
                    type="password"
                    {...register('password')}
                    placeholder="Min. 8 characters"
                    className="pl-10 h-11 bg-muted/50 border-muted-foreground/20 focus:border-violet-500 focus:ring-violet-500/20 transition-colors"
                  />
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium shadow-lg shadow-violet-500/25 transition-all duration-200 hover:shadow-violet-500/40 hover:scale-[1.01] active:scale-[0.99]"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted-foreground/15" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-background px-3 text-muted-foreground">
                    {isLogin ? 'New to onewave-trade?' : 'Already have an account?'}
                  </span>
                </div>
              </div>

              {/* Switch mode button */}
              <Button
                type="button"
                variant="outline"
                onClick={switchMode}
                className="w-full h-10 text-sm font-medium border-muted-foreground/20 hover:bg-muted/50 transition-colors"
              >
                {isLogin ? 'Create a free account' : 'Sign in instead'}
              </Button>
            </form>

            {/* Footer note */}
            <p className="text-[11px] text-muted-foreground text-center mt-5 leading-relaxed">
              By continuing, you agree to onewave-trade&apos;s Terms of Service and Privacy Policy.
              This is a simulated trading platform.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}