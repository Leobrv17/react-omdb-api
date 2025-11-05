type Props = {
    page: number;
    pageCount: number;
    onPageChange: (p: number) => void;
};

export default function Pagination({ page, pageCount, onPageChange }: Props) {
    if (pageCount <= 1) return null;

    const prev = () => onPageChange(Math.max(1, page - 1));
    const next = () => onPageChange(Math.min(pageCount, page + 1));

    return (
        <nav className="pager" aria-label="Pagination">
            <button className="btn" onClick={prev} disabled={page === 1} aria-label="Page précédente">←</button>
            <span className="badge">Page {page} / {pageCount}</span>
            <button className="btn" onClick={next} disabled={page === pageCount} aria-label="Page suivante">→</button>
        </nav>
    );
}
