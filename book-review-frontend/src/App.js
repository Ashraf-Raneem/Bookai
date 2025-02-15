import "./App.css";
import { Route, Routes } from "react-router";
import AuthPage from "./pages/Auth";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import BookDetail from "./pages/Book";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="book/:id" element={<BookDetail />} />
                </Route>
            </Routes>
            <ToastContainer />
        </div>
    );
}

export default App;
