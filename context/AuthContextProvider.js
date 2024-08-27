import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import { useRouter } from "next/router";
import { handleApiResponse } from '../helper/handleApiResponse';
import Cookies from "js-cookie";

const AuthContextProvider = ({ children }) => {
    const [userAuth, setUserAuth] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setUserAuth(token);
        }
    }, []);

    const login = async (email, password) => {
        const body = { email, password };
        try {
            const response = await axios.post("http://localhost:8521/api/v1/user/login", body);
            if (response.status === 200) {
                const result = handleApiResponse(response);
                if (result.success) {
                    sessionStorage.setItem('__user_email', JSON.stringify(result?.data?.email));
                    setUserAuth(result?.data?.token);
                    router.push("/");
                } else {
                    alert(result.message);
                }
            } else {
                alert("An unexpected error occurred. Please try again.");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.responseMessage || "An unexpected error occurred. Please try again.");
            } else {
                alert("An unexpected error occurred. Please try again.");
            }
        }
    };
    

    const logout = async () => {
        try {
            Cookies.remove('token');
            sessionStorage.removeItem('__user_email');
            setUserAuth(null);
            router.push('/sign-in');
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    const getProfile = async () => {
        try {
            const user = sessionStorage.getItem('__user_email');
            if (user) {
                return JSON.parse(user);
            } else {
                alert("No user email found.");
                router.push("/");
                return null;
            }
        } catch (error) {
            console.error("Profile Fetch Error:", error);
            alert("An unexpected error occurred. Please try again.");
            return null;
        }
    };

    return (
        <AuthContext.Provider value={{ userAuth, login, logout, getProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;