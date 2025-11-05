import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
    const { theme, toggle } = useTheme();
    const isDark = theme === "dark";

    return (
        <button
            className="btn"
            onClick={toggle}
            aria-pressed={isDark}
            aria-label="Basculer le thème clair/sombre"
            title={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
        >
            {isDark ? "☀️ Clair" : "🌙 Sombre"}
        </button>
    );
}
