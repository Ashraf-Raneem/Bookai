import "./App.css";
import { Route, Routes } from "react-router";
import AuthPage from "./pages/Auth";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;
