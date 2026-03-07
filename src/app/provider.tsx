import React, { useState } from "react"

type AppProviderProps = { 
    children: React.ReactNode
}

export const AppProvider = ({children} : AppProviderProps ) => { 
    const [queryClient] = useState(
        () => new queryClient({
            defaultOptions: queryConfig
        })
    )

    return (
        <React.Suspense
        fallback={
                <div className="flex h-screen w-screen items-center justify-center">
                <Spinner size="xl" />
                </div>
            }>

        </React.Suspense>
    )
}



