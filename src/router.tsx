import { useState, useEffect } from 'react'
import {
    RouterProvider,
    createRootRoute,
    createRoute,
    createRouter,
    redirect,
    Outlet,
    Link,
} from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { Moon, Sun } from "lucide-react"

import LandingPage from './pages/LandingPage'
import LoginPage from './features/auth/components/LoginPage'
import Registration from './features/auth/components/Registration'
import Navbar from '@/components/layout/Navbar'
import AdminDashboard from './features/admin/components/AdminDashboard'
import Sidebar from './components/layout/Sidebar'

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
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <>
            <Navbar />
            <div className='flex-1'>
                <Outlet />
            </div>
            <button
                onClick={() => setIsDark(!isDark)}
                className="fixed bottom-4 right-4 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
            >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
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
            <div className="flex-1 overflow-hidden">
                <Outlet />
            </div>
        </div>
    );
}

const rootRoute = createRootRoute({
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

// Dashboard layout route (temporarily unprotected)
const dashboardLayoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/dashboard",
    beforeLoad: async () => {
        if (!isAuthenticated()) {
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
    component: () => <div className="p-8">Users Page (Coming Soon)</div>,
})

const productsRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/products",
    component: () => <div className="p-8">Products Page (Coming Soon)</div>,
})

const analyticsRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/analytics",
    component: () => <div className="p-8">Analytics Page (Coming Soon)</div>,
})

const reportsRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/reports",
    component: () => <div className="p-8">Reports Page (Coming Soon)</div>,
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
    ]),
    notFoundRoute,
])

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

export function AppRouter() {
    return (
        <>
            <RouterProvider router={router} />
            {/* {import.meta.env.DEV ? <TanStackRouterDevtools router={router} /> : null} */}
        </>
    )
}