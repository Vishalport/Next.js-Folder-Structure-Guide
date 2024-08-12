// context/AuthContext.js
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import AuthContext from "./context";
import axios from "axios";

const AuthContextProvider = ({ children }) => {
    const [userAuth, setUserAuth] = useState(null);

    useEffect(() => {
        const token = Cookies.get("authToken");
        if (token) {
            setUserAuth({ token });
        }
    }, []);

    const login = async (email, password) => {
        const body = {
            email: email,
            password: password
        }
        try {
            const response = await axios.post("http://localhost:8521/api/v1/user/login", body);
            if (response.data.responseCode === 200) {
                alert(response.data.responseMessage);
                const data = response.data;
                Cookies.set("authToken", data.result, { expires: 7 });
                setUserAuth({ token: data.result.email, user: data.result });
            } else {
                alert(response.data.responseMessage || "Login failed.");
            }
        } catch (error) {
            if (error.response) {
                alert(`Error: ${error.response.status} - ${error.response.data.responseMessage}`);
            } else if (error.request) {
                alert("No response from server. Please try again later.");
            } else {
                alert("An unexpected error occurred. Please try again.");
            }
        }
    };

    const logout = () => {
        Cookies.remove("authToken");
        setUserAuth(null);
    };

    return (
        <AuthContext.Provider value={{ userAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;