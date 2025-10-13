"use client"

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'

const ThemeBtn = () => {

    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = resolvedTheme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="fixed top-5 right-5 z-[999] cursor-pointer  p-1"
        >
            {isDark ? <Moon size="20" /> : <Sun />}
        </button>
    )
}

export default ThemeBtn
