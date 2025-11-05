import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type {SearchItem} from "../types/omdb";

type FavoritesContextType = {
    items: SearchItem[];
    addFavorite: (item: SearchItem) => void;
    removeFavorite: (imdbID: string) => void;
    isFavorite: (imdbID: string) => boolean;
    clear: () => void;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useLocalStorage<SearchItem[]>("favorites:v1", []);

    const api: FavoritesContextType = useMemo(() => ({
        items,
        addFavorite: (item) => {
            setItems((prev) => (prev.some((i) => i.imdbID === item.imdbID) ? prev : [item, ...prev]));
        },
        removeFavorite: (imdbID) => {
            setItems((prev) => prev.filter((i) => i.imdbID !== imdbID));
        },
        isFavorite: (imdbID) => items.some((i) => i.imdbID === imdbID),
        clear: () => setItems([]),
    }), [items, setItems]);

    return <FavoritesContext.Provider value={api}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
    const ctx = useContext(FavoritesContext);
    if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
    return ctx;
}
