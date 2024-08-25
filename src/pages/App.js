// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import PostDetailsView from '../components/PostDetailsView';
import SearchPage from '../components/SearchPage';
import ProfilePage from '../components/ProfilePage';
import PostForm from '../components/PostForm';
import PrivateRoute from '../components/PrivateRoute';
import MainLayout from '../components/MainLayout';
import './App.css'

const App = () => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);




    // Check if the user is logged in on app mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // You might also want to retrieve the user data from local storage if available
            setIsLoggedIn(true);
            // Optionally, load the user data from local storage or an API call
            const savedUser = JSON.parse(localStorage.getItem('user'));
            if (savedUser) {
                setUser(savedUser);
            }
        }
    }, []);

    return (
        <Router>
            <div className="app-container">
                <Routes>
                    {/* Public routes without Header and Sidebar */}
                    <Route path="/login" element={<Login setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Routes with Header and Sidebar */}
                    <Route
                        path="/"
                        element={
                            <MainLayout isLoggedIn={isLoggedIn} user={user}>
                                <Home isLoggedIn={isLoggedIn} user={user} />
                            </MainLayout>
                        }
                    />
                    <Route
                        path="/post/:id"
                        element={
                            <MainLayout isLoggedIn={isLoggedIn} user={user}>
                                <PostDetailsView user={user} />
                            </MainLayout>
                        }
                    />
                    <Route
                        path="/search"
                        element={
                            <MainLayout isLoggedIn={isLoggedIn} user={user}>
                                <SearchPage />
                            </MainLayout>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute
                                isLoggedIn={isLoggedIn}
                                element={()=>(
                                    <MainLayout isLoggedIn={isLoggedIn} user={user}>
                                        <ProfilePage setUser={setUser} user={user} />
                                    </MainLayout>
    )}
                            />
                        }
                    />
                    <Route
                        path="/create-post"
                        element={
                            <PrivateRoute
                                isLoggedIn={isLoggedIn}
                                element={()=>(
                                    <MainLayout isLoggedIn={isLoggedIn} user={user}>
                                        <PostForm isLoggedIn={isLoggedIn} />
                                    </MainLayout>
    )}
                            />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
