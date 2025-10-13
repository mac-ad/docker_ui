/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        "./src/app/**/*.{ts,tsx,js,jsx,mdx}",
        "./src/components/**/*.{ts,tsx,js,jsx}"
    ],
    darkMode: "class",  // use the “class” strategy (so dark mode is toggled via a class on html)
    theme: {
        extend: {
            colors: {
                safe: 'var(--safe)',
            },
        },
    },
    plugins: [],
};

export default config;
