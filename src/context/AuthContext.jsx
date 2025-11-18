import {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext({})

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = jwtDecode(localStorage.getItem('token'));
        if (token) {
            setAuth({
                isAuth: true,
                user: {
                    id: token.userId,
                    email: token.email,
                    roles: token.role,
                },
                status: 'done',
            });
        } else {
            setAuth({
               isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);

    const data = {
        isAuth: auth['isAuth'],
        user: auth['user'],
        login: login,
        logout: logout,
    }

    function login(response) {
        localStorage.setItem('token', response.token);
        setAuth({
            ...auth,
            isAuth: true,
            user: response.user,
        });
        console.log(`${response.user.email} is ingelogd!`);
        navigate("/profile");
    }

    function logout() {
        localStorage.removeItem('token');
        setAuth({
            ...auth,
            isAuth: false,
            user: null,
        });
        console.log(`${auth.user.email} is uitgelogd!`)
        navigate("/");
    }

    return (
        <AuthContext.Provider value={data}>
            {auth.status === 'pending'
                ? <p>Loading...</p>
                : children
            }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;