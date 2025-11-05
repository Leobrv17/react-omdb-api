import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";
type ThemeCtx = {
    theme: Theme;
    toggle: () => void;
    setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeCtx | null>(null);

const STORAGE_KEY = "theme:v1";

function getInitialTheme(): Theme {
    // 1) localStorage
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === "light" || saved === "dark") return saved;
    } catch {}
    // 2) media query
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
    }
    return "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        // applique l’attribut sur <html> et persiste
        const root = document.documentElement;
        root.setAttribute("data-theme", theme);
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch {}
    }, [theme]);

    const value = useMemo<ThemeCtx>(() => ({
        theme,
        toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
        setTheme,
    }), [theme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
    return ctx;
}
