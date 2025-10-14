"use client"

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const ThemeBtn = () => {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = resolvedTheme === "dark";

    return (
        <Button
            onClick={() => setTheme(isDark ? "light" : "dark")}
        >
            {isDark ? <Moon size="20" /> : <Sun />}
        </Button>
    )
}

export default ThemeBtn
