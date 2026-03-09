import { MainErrorFallback } from "@/components/error/main"
import { Spinner } from "@/components/ui/spinner"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import React, { useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { HelmetProvider } from "react-helmet-async"
import { Notifications } from "@/components/ui/notifications";
import { AuthLoader } from "@/lib/auth-provider";

type AppProviderProps = { 
    children: React.ReactNode
}

export const AppProvider = ({children} : AppProviderProps ) => { 
    const [queryClient] = useState(
        () => new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                    refetchOnWindowFocus: false,
                    throwOnError: true,
                }
            }
        })
    )

    return (
        <React.Suspense
        fallback={
                <div className="flex h-screen w-screen items-center justify-center">
                <Spinner size="lg" />
                </div>
            }>
            <ErrorBoundary FallbackComponent={MainErrorFallback}>
                <HelmetProvider >
                    <QueryClientProvider client={queryClient}>
                        {import.meta.env.DEV && <ReactQueryDevtools/>}
                        <Notifications/>
                        <AuthLoader
                            renderLoading={() => (
                                <div className="flex h-screen w-screen items-center justify-center">
                                    <Spinner size="lg" />
                                </div>
                            )}
                        >
                            {children}
                        </AuthLoader>
                    </QueryClientProvider>
                </HelmetProvider>
            </ErrorBoundary>
        </React.Suspense>
    )
}
