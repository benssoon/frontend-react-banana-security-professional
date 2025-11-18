import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import {constants} from '../App';

function SignIn() {
    const URL = constants.API + 'login';
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const {login} = useContext(AuthContext);

    function handleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    async function authenticate(e) {
        e.preventDefault();
        try {
            const response = await axios.post(URL, data, {
                headers: {
                    [constants.PROJECT_ID.key]: constants.PROJECT_ID.value
                }
            });
            console.log(response);
            login(response.data);
        }
        catch (er) {
            console.error(er.response.data.error);
        }
    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

            <form onSubmit={authenticate}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                />
                <button type="submit">Inloggen</button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;