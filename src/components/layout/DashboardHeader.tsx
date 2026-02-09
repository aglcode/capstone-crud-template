import React, { useState, useEffect } from 'react';
import { useLocation, Link } from '@tanstack/react-router';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Map of path segments to readable names
    const breadcrumbNameMap: Record<string, string> = {
        'dashboard': 'Dashboard',
        'users': 'Customers',
        'products': 'Products',
        'reports': 'Reports',
        'support': 'Help Center',
        'ai-assistant': 'AI Assistant',
        'settings': 'Settings',
        'backups': 'Backups & Logs'
    };

    return (
        <header className={cn("sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
            <div className="flex h-16 items-center px-6 gap-4">

                {/* Breadcrumbs */}
                <div className="mr-auto flex items-center">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to="/dashboard">Dashboard</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            {pathSegments.length > 0 && pathSegments[0] !== 'dashboard' && (
                                <BreadcrumbSeparator />
                            )}

                            {pathSegments.map((segment, index) => {
                                if (segment === 'dashboard') return null; // Already added explicitly

                                const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
                                const isLast = index === pathSegments.length - 1;
                                const name = breadcrumbNameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

                                return (
                                    <React.Fragment key={path}>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            {isLast ? (
                                                <BreadcrumbPage>{name}</BreadcrumbPage>
                                            ) : (
                                                <BreadcrumbLink asChild>
                                                    <Link to={path}>{name}</Link>
                                                </BreadcrumbLink>
                                            )}
                                        </BreadcrumbItem>
                                    </React.Fragment>
                                );
                            })}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

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
                    <div className="hidden lg:flex flex-col items-end mr-2">
                        <span className="text-sm font-semibold tabular-nums leading-none">
                            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
                        </span>
                        <span className="text-[10px] text-muted-foreground leading-none mt-1">
                            {currentTime.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' })}
                        </span>
                    </div>
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
