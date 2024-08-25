// src/Login.js
import React, { useState, useEffect } from 'react';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';
import './Login.css';  // Adjust path to your CSS

const Login = ({ setUser, setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data
            setUser(response.data.user);
            setIsLoggedIn(true);
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                <p>If you don't have an account, please <span onClick={() => navigate('/signup')}>Signup</span> here</p>
            </div>
        </div>
    );
};

export default Login;
