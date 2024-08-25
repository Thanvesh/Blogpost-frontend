import React, { useState, useEffect } from 'react';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import './Login.css';  // Adjust path to your CSS

const Login = ({ setUser, setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // State for loader
    const [error, setError] = useState(''); // State for error messages
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);  // Start loader
        setError('');  // Clear previous errors

        // Basic validation
        if (!email || !password) {
            setError('Email and password are required.');
            setLoading(false);
            return;
        }

        try {
            const response = await login({ email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data
            setUser(response.data.user);
            setIsLoggedIn(true);
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Invalid email or password. Please try again.');  // Set error message
        } finally {
            setLoading(false);  // Stop loader
        }
    };

    return (
        
        <div className="login-container">
            {loading ? (
                    <div className="loader-container">
                        <ScaleLoader color="#36d7b7" />  {/* Loader */}
                    </div>
                ):(
            <div className="login-form">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}  {/* Display error message */}
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
                    <button type="submit" disabled={loading}>Login</button>
                </form>
                <p>If you don't have an account, please <span onClick={() => navigate('/signup')}>Signup</span> here</p>
                
            </div>)}
        </div>
    );
};

export default Login;
