import { useEffect, useMemo, useState } from "react";
import { searchOmdb } from "../lib/omdb";
import type {OmdbSearchResponse, SearchItem} from "../types/omdb";
import { useDebounce } from "./useDebounce";

type Params = {
    query: string;
    type?: "" | "movie" | "series" | "episode";
    year?: string;
    page?: number;
    sort?: "title" | "year";
};

export function useOmdbSearch(params: Params) {
    const [data, setData] = useState<SearchItem[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const debouncedQuery = useDebounce(params.query.trim(), 350);
    const effective = useMemo(
        () => ({ ...params, query: debouncedQuery }),
        [params, debouncedQuery]
    );

    useEffect(() => {
        if (!effective.query) {
            setData([]);
            setTotal(0);
            setError(null);
            return;
        }
        const abort = new AbortController();
        setLoading(true);
        setError(null);

        searchOmdb({
            s: effective.query,
            type: effective.type || undefined,
            y: effective.year || undefined,
            page: effective.page ?? 1,
            signal: abort.signal,
        })
            .then((res: OmdbSearchResponse) => {
                if (res.Response === "False") {
                    setData([]);
                    setTotal(0);
                    setError(res.Error || "Aucun résultat.");
                    return;
                }
                const items = res.Search ?? [];
                // OMDb ne fournit pas d'ordre -> on applique un tri client simple et stable
                const sorted = [...items].sort((a, b) => {
                    if ((effective.sort ?? "title") === "year") {
                        return (parseInt(b.Year) || 0) - (parseInt(a.Year) || 0) || a.Title.localeCompare(b.Title);
                    }
                    return a.Title.localeCompare(b.Title) || (parseInt(b.Year) || 0) - (parseInt(a.Year) || 0);
                });
                setData(sorted);
                setTotal(parseInt(res.totalResults || "0") || 0);
            })
            .catch((e) => {
                if (e.name !== "AbortError") setError("Erreur réseau.");
            })
            .finally(() => setLoading(false));

        return () => abort.abort();
    }, [effective.query, effective.type, effective.year, effective.page, effective.sort]);

    const pageCount = Math.max(1, Math.ceil(total / 10)); // OMDb -> 10 résultats / page

    return { data, total, loading, error, pageCount };
}
