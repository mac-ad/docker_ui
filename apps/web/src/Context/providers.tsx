"use client"

import ThemeBtn from "@/components/theme-btn"
import { QueryProvider } from "./query-provider"
import { ThemeProvider } from "./theme-provider"
import { ImageProvider } from "./image.provider"
import { ModalProvider } from "./modal-provider"

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (

        <QueryProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                disableTransitionOnChange
            >
                <ModalProvider>
                    <ImageProvider>
                        {children}
                    </ImageProvider>
                </ModalProvider>
            </ThemeProvider >
        </QueryProvider>
    )
}

export default Providers
