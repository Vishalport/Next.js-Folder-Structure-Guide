import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import { useRouter } from "next/router";
import { handleApiResponse } from '../helper/handleApiResponse';
import Cookies from "js-cookie"

const AuthContextProvider = ({ children }) => {
    const [userAuth, setUserAuth] = useState(null);
    const router = useRouter();

    useEffect(() => {
        setUserAuth(Cookies.get("__secrete_jwt_auth"))
    }, [])
    
    const login = async (email, password) => {
        const body = { email, password };
        try {
            const response = await axios.post("http://localhost:8521/api/v1/user/login", body);
            const result = handleApiResponse(response);
            if (result.success) {
                const token = result?.data;
                if (token) {
                    Cookies.set('__secrete_jwt_auth', token.__secrete_jwt_auth, { expires: 5 });
                    setUserAuth(result?.data.__secrete_jwt_auth);
                    router.push("/");
                }
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("An unexpected error occurred. Please try again.");
        }
    };

    const logout = async () => {
        try {
            Cookies.remove('__secrete_jwt_auth');
            setUserAuth(null);
            router.push('/sign-in');
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };



    return (
        <AuthContext.Provider value={{ userAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;