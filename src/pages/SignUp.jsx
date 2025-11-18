import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {constants} from '../App';

function SignUp() {
    const URL = constants.API + 'users';
    const [data, setData] = useState({
        email: '',
        password: '',
        roles: ['user', 'admin'],
    });
    const navigate = useNavigate();

    function handleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    async function sendData(e) {
        e.preventDefault();
        try {
            const response = await axios.post(URL, data,{
                headers: {
                [constants.PROJECT_ID.key]: constants.PROJECT_ID.value
            }
        });
            console.log(response.data);
            navigate("/signin");
        }
        catch (er) {
            console.error(er);
        }
    }

    async function getUsers(e) {
        e.preventDefault();
        try {
            const response = await axios.get(URL, {
                headers: {
                'novi-education-project-id': 'c0a2656f-ad70-45b7-ba18-5a4c3d923b7e'
            }
        });
            console.log(response.data);
        }
        catch (er) {
            console.error(er.response.data.error);
        }
    }

    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
            <form onSubmit={sendData}>
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
                    onChange={handleChange}/>
                <button type="submit">Send</button>
            </form>
            <form onSubmit={getUsers}>
                <button type="submit">Get Users</button>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;