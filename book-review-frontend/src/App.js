import "./App.css";
import { Route, Routes } from "react-router";
import AuthPage from "./pages/Auth";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
