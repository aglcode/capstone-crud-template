import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center mx-auto px-4 justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground rounded-md p-1 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" className="w-5 h-5" viewBox="0 0 256 256">
              <path d="M 128 192 C 92.654 192 64 220.654 64 256 L 0 256 C 0 185.308 57.308 128 128 128 Z M 256 128 C 256 198.692 198.692 256 128 256 L 128 192 C 163.346 192 192 163.346 192 128 Z M 128 64 C 92.654 64 64 92.654 64 128 L 0 128 C 0 57.308 57.308 0 128 0 Z M 256 0 C 256 70.692 198.692 128 128 128 L 128 64 C 163.346 64 192 35.346 192 0 Z" fill="currentColor"></path>
            </svg>
          </div>
          <span className="font-bold hidden sm:inline-block">Capstone Template</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          <a className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="#">Documentation</a>
          <a className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="#pricing">Pricing</a>
          <button
            className="inline-flex h-9 items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            onClick={() => navigate('/login')}
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
                navigate('/login');
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