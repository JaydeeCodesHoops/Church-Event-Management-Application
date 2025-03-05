import React, { useState } from 'react';
import Header from '../Components/RegHeader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register(){
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    
    const handleRedirect = () => {
        navigate('/');
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try{
            const headers = {
                'Content-Type': 'application/json',
              };
            const response = await axios.post(
                'http://localhost:5231/api/Auth/register', 
                { Name, Email, Password}, 
                {headers}
            );
        
            if(response.status === 200){
                setSuccess('Registration successful! You can now log in.');
                setName('');
                setEmail('');
                setPassword('');
                setError('');
            }
        }catch(err){
            console.log(err.response);
            setError(err.response?.data?.message || 'Failed to Register');

        }
    };

    return(
        <>
        <div className="regBGimage">
            <div className="reghead">
                <Header/>
            </div>
            <div className="register">
                <div className="registerTitle">
                    <h2>Register page</h2>
                </div>
                <div>
                <form onSubmit={handleRegister}>
                    <div>
                        <label className="email">First Name:</label>
                        <input 
                            className="nameInput"
                            type="text"
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="email">Email:</label>
                        <input 
                            className="emailInput"
                            type="email"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="password">Password:</label>
                        <input 
                            className="passwordInput"
                            type="password"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="error-Success">
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p style={{color: 'lightgreen'}}>{success}</p>}
                    </div>
                    <div className="Reg-Login-Home">
                        <button id="regLoginBtn" type="submit">Register</button>
                        <button id="regLoginHomeBtn" onClick={handleRedirect}>Home</button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </>
    );
};

export default Register;