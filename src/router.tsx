import { useState, useEffect } from 'react'
import {
    RouterProvider,
    createRootRouteWithContext,
    createRoute,
    createRouter,
    redirect,
    Outlet,
    Link,
} from "@tanstack/react-router"
import { supabase } from "./lib/supabase"
import { ToastAlerts } from '@/components/layout/ToastAlerts'
import { Moon, Sun } from "lucide-react"

import LandingPage from './pages/LandingPage'
import LoginPage from './features/auth/components/LoginPage'
import Registration from './features/auth/components/Registration'
import Navbar from '@/components/layout/Navbar'
import AdminDashboard from './features/admin/components/AdminDashboard'
import UsersPage from './features/admin/components/UsersPage'
import Sidebar from './components/layout/Sidebar'
import Products from './features/admin/components/Products'
import { PRODUCTS } from './features/constants/ConstantsProducts'
import { ThemeProvider, useTheme } from '@/components/theme-provider'
import DashboardHeader from '@/components/layout/DashboardHeader'
import AdminAnalytics from './features/admin/components/AdminAnalytics'
import AdminReports from './features/admin/components/AdminReports'
import HelpCenter from './features/admin/supports/HelpCenter'
import AiAssistant from './features/admin/supports/AiAssistant'
import Settings from './features/admin/components/AdminProfile/Settings'
import New from './features/admin/components/AdminProfile/New'
import Calendar from './features/admin/components/DashboardPages/Calendar'
import Notifications from './features/admin/components/DashboardPages/Notifications'
import Status from './features/admin/components/DashboardPages/Status'
import TermsAndConditions from './features/admin/components/AdminProfile/TermsAndConditions'

interface RouterContext {
    authentication: {
        isAuthenticated: boolean;
        userRole: string | undefined;
    }
}

const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
}

// Root component without Navbar
function RootComponent() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            <Outlet />
        </div>
    );
}

// Public layout with Navbar and theme toggle
function PublicLayout() {
    const { setTheme, theme } = useTheme();

    return (
        <>
            <Navbar />
            <div className='flex-1'>
                <Outlet />
            </div>
            <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="fixed bottom-4 right-4 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
                title="Toggle Theme"
            >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
        </>
    );
}

// Admin Dashboard Layout
function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar
                isOpen={isSidebarOpen}
                isCollapsed={isCollapsed}
                toggleCollapse={() => setIsCollapsed(!isCollapsed)}
            />
            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader />
                <div className="flex-1 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
    component: RootComponent,
})

// Public routes layout
const publicLayoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: 'public',
    component: PublicLayout,
})

const indexRoute = createRoute({
    getParentRoute: () => publicLayoutRoute,
    path: "/",
    component: LandingPage,
})

const loginRoute = createRoute({
    getParentRoute: () => publicLayoutRoute,
    path: "/login",
    component: LoginPage,
})

const registerRoute = createRoute({
    getParentRoute: () => publicLayoutRoute,
    path: "/register",
    component: Registration,
})

const dashboardLayoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/dashboard",
    beforeLoad: async ({ context }) => {
        const { isAuthenticated } = context.authentication;

        if (!isAuthenticated) {
            throw redirect({
                to: '/login',
                search: {
                    redirect: '/dashboard',
                },
            })
        }
    },
    component: DashboardLayout,
})

// Dashboard overview route
const dashboardIndexRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/",
    component: function DashboardPage() {
        const [isSidebarOpen, setIsSidebarOpen] = useState(false);
        return <AdminDashboard onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />;
    },
})

// Additional dashboard routes (for future use)
const usersRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/users",
    component: UsersPage,
})

// Wrapper component to provide data
function ProductsPage() {
    return <Products products={PRODUCTS} />;
}

const productsRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/products",
    component: ProductsPage,
})

const analyticsRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/analytics",
    component: AdminAnalytics,
})

const reportsRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/reports",
    component: AdminReports,
})

const helpCenterRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/support",
    component: HelpCenter,
})

const aiAssistantRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/ai-assistant",
    component: AiAssistant,
})

const settingsRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/settings",
    component: Settings,
})

const whatsNewRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/whats-new",
    component: New,
})

const calendarRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/calendar",
    component: Calendar,
})

const notificationsRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/notifications",
    component: Notifications,
})

const statusRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/status",
    component: Status,
})

const termsRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/terms",
    component: TermsAndConditions,
})

const notFoundRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "*",
    component: () => (
        <div className="flex items-center justify-center py-16">
            <div className="text-center">
                <h1 className="text-3xl font-semibold mb-2">404 - Page not found</h1>
                <Link
                    to="/"
                    className="underline underline-offset-4 hover:text-primary transition-colors text-sm"
                >
                    Go back home
                </Link>
            </div>
        </div>
    ),
})

const routeTree = rootRoute.addChildren([
    publicLayoutRoute.addChildren([
        indexRoute,
        loginRoute,
        registerRoute,
    ]),
    dashboardLayoutRoute.addChildren([
        dashboardIndexRoute,
        usersRoute,
        productsRoute,
        analyticsRoute,
        reportsRoute,
        helpCenterRoute,
        aiAssistantRoute,
        settingsRoute,

        whatsNewRoute,
        termsRoute,
        calendarRoute,
        notificationsRoute,
        statusRoute
    ]),
    notFoundRoute,
])

export const router = createRouter({
    routeTree,
    context: {
        authentication: {
            isAuthenticated: false,
            userRole: undefined,
        },
    },
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

export function AppRouter() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check active session on mount
        supabase.auth.getSession().then(({ data: { session } }) => {
            setIsAuthenticated(!!session);
            // userRole logic can be added here
            setIsLoading(false);
        });

        // Listen for changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session);
            setIsLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <RouterProvider router={router} context={{ authentication: { isAuthenticated, userRole, } }} />
            <ToastAlerts />
            {/* {import.meta.env.DEV ? <TanStackRouterDevtools router={router} /> : null} */}
        </ThemeProvider>
    )
}
