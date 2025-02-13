import React, { useState } from "react";
import { postData } from "./api_functions";

const AuthForm = ({ type, handleState }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        ...(type === "register" && { name: "" }),
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const clearForm = () => {
        setFormData({
            email: "",
            password: "",
            ...(type === "register" && { name: "" }),
        });
    };

    const onSubmit = (e, data) => {
        e.preventDefault();
        if (type === "login") {
            postData("/login", data)
                .then((res) => console.log("Success:", res))
                .catch((err) => console.log("Error:", err));
        } else {
            postData("/register", data)
                .then((res) => console.log("Success:", res))
                .catch((err) => console.log("Error:", err));
        }
        clearForm();
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl text-black mb-20">Welcome to your bookstore</h1>
            <div className="p-6 rounded-lg shadow-lg w-96 bg-slate-200 text-black">
                <h2 className="text-2xl font-bold text-center mb-4">{type === "login" ? "Login" : "Register"}</h2>
                <form onSubmit={(e) => onSubmit(e, formData)} className="space-y-4">
                    {type === "register" && (
                        <div>
                            <label className="block text-sm font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="example@mail.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        {type === "login" ? "Login" : "Register"}
                    </button>
                </form>

                <p className="text-sm text-center mt-4">
                    {type === "login" ? (
                        <>
                            Don't have an account?{" "}
                            <span onClick={() => handleState("register")} className="text-blue-500 cursor-pointer">
                                Register
                            </span>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <span onClick={() => handleState("login")} className="text-blue-500 cursor-pointer">
                                Login
                            </span>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
