import MovieGrid from "../components/MovieGrid";
import EmptyState from "../components/EmptyState";
import { useFavorites } from "../context/FavoritesContext";

export default function FavoritesPage() {
    const { items, clear } = useFavorites();

    return (
        <section>
            <div className="row" style={{justifyContent: "space-between", marginBottom: ".75rem"}}>
                <h2>Vos favoris</h2>
                {items.length > 0 && (
                    <button className="btn danger" onClick={clear} aria-label="Vider les favoris">Tout effacer</button>
                )}
            </div>

            {items.length === 0 ? (
                <EmptyState message="Aucun favori pour le moment. Ajoute des films ou séries depuis la page Recherche." />
            ) : (
                <MovieGrid items={items} />
            )}
        </section>
    );
}
