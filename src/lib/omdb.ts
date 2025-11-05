import type {OmdbSearchResponse} from "../types/omdb";

const API = "https://www.omdbapi.com/";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY as string | undefined;
if (!API_KEY) {
    // eslint-disable-next-line no-console
    console.warn("⚠️ VITE_OMDB_API_KEY manquant. Ajoute-le à .env.local");
}

type SearchParams = {
    s: string; // query
    type?: "movie" | "series" | "episode";
    y?: string;
    page?: number;
    signal?: AbortSignal;
};

export async function searchOmdb({ s, type, y, page = 1, signal }: SearchParams): Promise<OmdbSearchResponse> {
    const url = new URL(API);
    url.searchParams.set("apikey", API_KEY ?? "");
    url.searchParams.set("s", s);
    if (type) url.searchParams.set("type", type);
    if (y) url.searchParams.set("y", y);
    url.searchParams.set("page", String(page));

    const res = await fetch(url.toString(), { signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as OmdbSearchResponse;
}
