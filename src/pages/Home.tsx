import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import EmptyState from "../components/EmptyState";
import { useOmdbSearch } from "../hooks/useOmdbSearch";

export default function Home() {
    const [query, setQuery] = useState("");
    const [type, setType] = useState<"" | "movie" | "series" | "episode">("");
    const [year, setYear] = useState("");
    const [sort, setSort] = useState<"title" | "year">("title");
    const [page, setPage] = useState(1);

    const { data, loading, error, pageCount, total } = useOmdbSearch({
        query, type, year, page, sort
    });

    const submit = () => setPage(1); // le hook se déclenche via debounce + state

    const resetFilters = () => {
        setType("");
        setYear("");
        setSort("title");
        setPage(1);
    };

    return (
        <section>
            <div className="row" style={{marginBottom: ".75rem"}}>
                <SearchBar query={query} onQueryChange={setQuery} onSubmit={submit} />
            </div>

            <Filters
                type={type}
                year={year}
                sort={sort}
                onType={(v) => { setType(v); setPage(1); }}
                onYear={(v) => { setYear(v); setPage(1); }}
                onSort={(v) => setSort(v)}
                onReset={resetFilters}
            />

            {loading && <Spinner />}

            {!loading && !error && !data.length && !query && (
                <EmptyState message="Commence par saisir une recherche. Exemple : Matrix, Inception, Friends…" />
            )}

            {!loading && error && (
                <EmptyState message={error} />
            )}

            {!loading && !!data.length && (
                <>
                    <div className="row" style={{margin: ".75rem 0"}}>
                        <span className="badge">{total} résultat(s)</span>
                        {type && <span className="badge">Type: {type}</span>}
                        {year && <span className="badge">Année: {year}</span>}
                    </div>
                    <MovieGrid items={data} />
                    <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
                </>
            )}
        </section>
    );
}
