import * as React from 'react'
import {
    RouterProvider,
    createRootRoute,
    createRoute,
    createRouter,
} from "@tanstack/react-router"
import { Outlet } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import Registration from '../pages/Registration'
import Navbar from '@/components/layout/Navbar'

const rootRoute = createRootRoute({
    component: () => (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            <Navbar />
            <div className='flex-1'>
                <Outlet />
            </div>
        </div>
    ),
})

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: LandingPage,
})


const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/login",
    component: LoginPage,
})

const registerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/register",
    component: Registration,
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
    indexRoute,
    loginRoute,
    registerRoute,
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
            {import.meta.env.DEV ? <TanStackRouterDevtools router={router} /> : null}
        </>
    )

}
