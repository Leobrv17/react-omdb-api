import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function App() {
    return (
        <>
            <Header />
            <main className="container">
                <Outlet />
                <footer className="footer">
                    Fait avec ❤️ — OMDb React Starter. Données © OMDb.
                </footer>
            </main>
        </>
    );
}
