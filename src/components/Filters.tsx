type Props = {
    type: "movie" | "series" | "episode" | "";
    year: string;
    sort: "title" | "year";
    onType: (v: Props["type"]) => void;
    onYear: (v: string) => void;
    onSort: (v: Props["sort"]) => void;
    onReset: () => void;
};

export default function Filters({ type, year, sort, onType, onYear, onSort, onReset }: Props) {
    return (
        <div className="toolbar" aria-label="Filtres">
            <div className="row">
                <input
                    inputMode="numeric"
                    pattern="\d{4}"
                    placeholder="Année (ex. 1999)"
                    value={year}
                    onChange={(e) => onYear(e.target.value.replace(/[^\d]/g, "").slice(0, 4))}
                    aria-label="Filtrer par année"
                />
                <select value={type} onChange={(e) => onType(e.target.value as Props["type"])} aria-label="Type">
                    <option value="">Tout</option>
                    <option value="movie">Films</option>
                    <option value="series">Séries</option>
                    <option value="episode">Épisodes</option>
                </select>
            </div>

            <div className="row right">
                <span className="badge">Tri</span>
                <select value={sort} onChange={(e) => onSort(e.target.value as Props["sort"])} aria-label="Trier">
                    <option value="title">Titre</option>
                    <option value="year">Année</option>
                </select>

                <button className="btn ghost" onClick={onReset} aria-label="Réinitialiser les filtres">
                    Réinitialiser
                </button>
            </div>
        </div>
    );
}
