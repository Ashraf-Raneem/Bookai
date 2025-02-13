import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("User logged out");
        navigate("/"); // Redirect to login page
    };

    return (
        <nav className="bg-blue-600 text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <h1 className="text-2xl font-bold">MyApp</h1>

                {/* Logout Button */}
                <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition">
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
