import React from 'react';
import { useLocation, Link } from '@tanstack/react-router';
import { Moon, Sun, Search, Bell } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface DashboardHeaderProps {
    className?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ className }) => {
    const { setTheme, theme } = useTheme();
    /* const navigate = useNavigate(); */
    const location = useLocation();

    const tabs = [
        { name: 'Overview', path: '/dashboard' },
        { name: 'Customers', path: '/dashboard/users' },
        { name: 'Products', path: '/dashboard/products' },
        { name: 'Reports', path: '/dashboard/reports' },
        { name: 'Help Center', path: '/dashboard/support' },
        { name: 'AI Assistant', path: '/dashboard/ai-assistant' },
        { name: 'Settings', path: '/dashboard/settings' }, // Placeholder for now
    ];

    return (
        <header className={cn("sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
            <div className="flex h-16 items-center px-6 gap-4">

                {/* Navigation Tabs */}
                <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground mr-auto">
                    {tabs.map((tab) => {
                        const isActive = location.pathname === tab.path;
                        return (
                            <Link
                                key={tab.path}
                                to={tab.path}
                                className={cn(
                                    "transition-colors hover:text-primary",
                                    isActive ? "text-foreground font-semibold" : "text-muted-foreground"
                                )}
                            >
                                {tab.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Search Bar */}
                <div className="hidden md:flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-64 pl-8 bg-background"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <Bell className="h-5 w-5" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="text-muted-foreground"
                    >
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
