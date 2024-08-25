import React, { useState } from 'react';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';  // Import ScaleLoader
import './Signup.css';  // Adjust path to your CSS

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!username) errors.username = 'Username is required';
        if (!email) {
            errors.email = 'Email is required';
        } else if (!emailPattern.test(email)) {
            errors.email = 'Invalid email format';
        }
        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true); // Show loader

        try {
            await register({ name:username, email, password });
            navigate('/login');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false); // Hide loader
        }
    };

    return (
        <div className="signup-container">
            {loading && (
                <div className="loader-container">
                    <ScaleLoader color="#3498db" />
                </div>
            )} {/* Loader component */}
            <div className="signup-form">
                <h2>Signup</h2>
                <form onSubmit={handleSignup}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    {errors.username && <p className="error">{errors.username}</p>}
                    
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                    
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                    
                    <button type="submit" disabled={loading}>Signup</button> {/* Disable button while loading */}
                </form>
                <p>If you have an account, please <span onClick={() => navigate('/login')}>Login</span> here</p>
            </div>
        </div>
    );
};

export default Signup;
