import {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

export const AuthContext = createContext({})

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        jwt: '',
    });
    const navigate = useNavigate();

    const data = {
        isAuth: auth['isAuth'],
        user: auth['user'],
        login: login,
        logout: logout,
    }

    function login(response) {
        setAuth({
            ...auth,
            isAuth: true,
            user: response.user,
            jwt: response.token,
        });
        console.log(`${response.user.email} is ingelogd!`);
        navigate("/profile");
    }

    function logout() {
        setAuth({
            ...auth,
            isAuth: false,
            user: null,
            jwt: '',
        });
        console.log(`${auth.user.email} is uitgelogd!`)
        navigate("/");
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;