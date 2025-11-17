import {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

export const AuthContext = createContext({})

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
    });
    const navigate = useNavigate();

    const data = {
        isAuth: auth['isAuth'],
        user: auth['user'],
        login: login,
        logout: logout,
    }

    function login() {
        setAuth({
            ...,
            isAuth: true,
        });
        console.log('Gebruiker is ingelogd!');
        navigate("/profile");
    }

    function logout() {
        setAuth({
            ...,
            isAuth: false,
        });
        console.log('Gebruiker is uitgelogd!')
        navigate("/");
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;