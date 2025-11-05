import { useEffect, useRef } from "react";

type Props = {
    query: string;
    onQueryChange: (v: string) => void;
    onSubmit: () => void;
};

export default function SearchBar({ query, onQueryChange, onSubmit }: Props) {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // focus initial pour UX
        ref.current?.focus();
    }, []);

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") onSubmit();
    };

    return (
        <div className="row" role="search">
            <input
                ref={ref}
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Rechercher un film, une série, un épisode…"
                aria-label="Recherche"
            />
            <button className="btn primary" onClick={onSubmit} aria-label="Lancer la recherche">
                Rechercher
            </button>
        </div>
    );
}
