import React, { useState } from 'react';
import Header from '../Components/LoginHeader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null); 

    const handleRedirect = () => {
        navigate('/');
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            //sends an HTTP POST request to '/api/Auth/Login' with the entered email and password to authenticate.
            const response = await axios.post('http://localhost:5231/api/Auth/Login', { email, password});

            //if authentication is successful, it expects a response with a token and role.
            const { Id, token, role } = response.data;

            //the Token (JWT) is stored in sessionStorage. This allows the app to keep the user logged in during the session, even if the page is refreshed.
            sessionStorage.getItem('UserId', Id);
            sessionStorage.setItem('jwtToken', token);
            sessionStorage.setItem('userRole', role);

            if(!token || role === 'Admin')
                {
                    navigate('/admin');
                }
            else if(!token || role === 'congregant')
                {
                    navigate('/congregant');
                }
            else
                {
                    throw new Error('Unknown Role');
                }
                
        }catch(err){
            console.log(err.response);
            setError(err.response?.data?.message || 'Failed to login');

        }
    };

     // Function to make a protected API request
     const fetchProtectedData = async (url) => {
        const token = sessionStorage.getItem('jwtToken');
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch protected data');
        }

        return await response.json();
    };

    return(
        <>
            <div className="head">
                <Header/>
            </div>
            <div className="loginBGimage">
            <div className="login">
                <div className="loginTitle">
                    <h2>Login page</h2>
                </div>
                <form onSubmit={handleLogin}>
                    <div>
                        <label className="email">Email:</label>
                        <input 
                            className="emailInput"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="password">Password:</label>
                        <input 
                            className="passwordInput"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="error">
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>
                    <div className="Login-Home">
                        <button type="submit">Login</button>
                        <button onClick={handleRedirect}>Home</button>
                    </div>
                </form>
            </div>
            </div>
        </>
    );
}

export default Login;