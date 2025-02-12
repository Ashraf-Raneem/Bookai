import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import AuthPage from "./pages/Auth";

function App() {
    const [data, setData] = useState();

    return (
        <div className="App">
            <Routes>
                <Route index element={<AuthPage />} />
            </Routes>
        </div>
    );
}

export default App;
