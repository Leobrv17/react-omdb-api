import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    return (
        <header className="header">
            <nav className="nav container">
                <NavLink to="/" className="brand">
                    <b>OMDb</b> Finder
                </NavLink>
                <div className="row">
                    <NavLink to="/" className={({isActive}) => isActive ? "active" : undefined}>Recherche</NavLink>
                    <NavLink to="/favorites" className={({isActive}) => isActive ? "active" : undefined}>Favoris</NavLink>
                    <a href="https://www.omdbapi.com/" target="_blank" rel="noreferrer" className="badge">OMDb API</a>
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    );
}
