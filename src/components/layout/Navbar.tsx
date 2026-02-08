import type React from 'react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter } from '@tanstack/react-router';
import { Logo } from '@/components/layout/Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center mx-auto px-4 justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="font-bold hidden sm:inline-block">GeekDevs</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          <a className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="#">Documentation</a>
          <a className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="#pricing">Pricing</a>
          <button
            className="inline-flex h-9 items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            onClick={() => router.navigate({ to: '/login' })}
          >
            Sign In
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="#" onClick={() => setIsOpen(false)}>Documentation</a>
            <a className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="#pricing" onClick={() => setIsOpen(false)}>Pricing</a>
            <button
              className="inline-flex h-9 items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full"
              onClick={() => {
                setIsOpen(false);
                router.navigate({ to: '/login' });
              }}
            >
              Sign In
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;