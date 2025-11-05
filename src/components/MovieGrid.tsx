import type {SearchItem} from "../types/omdb";
import MovieCard from "./MovieCard";

type Props = { items: SearchItem[] };

export default function MovieGrid({ items }: Props) {
    if (!items.length) return null;
    return (
        <section aria-label="Résultats">
            <div className="grid">
                {items.map((it) => (
                    <MovieCard key={it.imdbID} item={it} />
                ))}
            </div>
        </section>
    );
}
