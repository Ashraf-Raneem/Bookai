import React, { useState } from "react";
import AuthForm from "../components/AuthForm";

const AuthPage = () => {
    const [type, setType] = useState("login");

    const handleState = (data) => {
        setType(data);
    };

    return (
        <div className="grid grid-cols-2 auth-page">
            {type === "login" ? (
                <AuthForm type={"login"} handleState={handleState} />
            ) : (
                <AuthForm type={"register"} handleState={handleState} />
            )}
        </div>
    );
};

export default AuthPage;
