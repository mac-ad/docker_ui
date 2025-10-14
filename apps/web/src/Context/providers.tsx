"use client"

import ThemeBtn from "@/components/theme-btn"
import { QueryProvider } from "./query-provider"
import { ThemeProvider } from "./theme-provider"

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (

        <QueryProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider >
        </QueryProvider>
    )
}

export default Providers
