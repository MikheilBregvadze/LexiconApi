import Header from "./pages/layout/header/Header";
import { Auth, useAuthentication } from "./services/context/useAuthentication";
import MainPage from "./pages/mainPage/MainPage";

import './App.css';

function App() {
    const auth = useAuthentication();
    return (
        <Auth.Provider value={auth}>
            <header className="header">
                <Header />
            </header>
            <section>
                <MainPage />
            </section>
        </Auth.Provider>
    );
}

export default App;
