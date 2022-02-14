import Header from "./pages/layout/header/Header";
import { Theme, useTheme } from "./services/context/useAuthentication";
import { Auth, useAuthentication } from "./services/context/useAuthentication";
import MainPage from "./pages/mainPage/MainPage";
import Landing from "./pages/landing/Landing";

import './App.css';

function App() {
    const theme = useTheme();
    const auth = useAuthentication();
    return (
        <Auth.Provider value={auth}>
            <Theme.Provider value={theme}>
                <Landing />
                <header className="header">
                    <Header />
                </header>
                <section className="section">
                    <MainPage />
                </section>
            </Theme.Provider>
        </Auth.Provider>
    );
}

export default App;
