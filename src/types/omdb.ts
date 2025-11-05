export type SearchItem = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: "movie" | "series" | "episode";
    Poster: string;
};

export type OmdbSearchResponse = {
    Search?: SearchItem[];
    totalResults?: string;
    Response: "True" | "False";
    Error?: string;
};
