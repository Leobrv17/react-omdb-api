import type {SearchItem} from "../types/omdb";
import { useFavorites } from "../context/FavoritesContext";

type Props = { item: SearchItem };

export default function MovieCard({ item }: Props) {
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const fav = isFavorite(item.imdbID);

    const toggle = () => (fav ? removeFavorite(item.imdbID) : addFavorite(item));

    return (
        <article className="card" aria-label={`${item.Title} (${item.Year})`}>
            <img
                className="poster"
                src={item.Poster !== "N/A" ? item.Poster : `https://placehold.co/400x600?text=${encodeURIComponent(item.Title)}`}
                alt={`Affiche de ${item.Title}`}
                loading="lazy"
            />
            <div className="card-body">
                <div className="title">{item.Title}</div>
                <div className="meta">
                    <span className="badge">{item.Type}</span>
                    <span className="badge">{item.Year}</span>
                    <span className="badge">imdbID: {item.imdbID}</span>
                </div>
                <div className="row">
                    <button className={`btn ${fav ? "danger" : ""}`} onClick={toggle} aria-label="Basculer favori">
                        {fav ? "Retirer des favoris" : "Ajouter aux favoris"}
                    </button>
                    <a
                        className="btn"
                        href={`https://www.imdb.com/title/${item.imdbID}/`}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Voir sur IMDb"
                    >
                        IMDb ↗
                    </a>
                </div>
            </div>
        </article>
    );
}
