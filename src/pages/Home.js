// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import "./Home.css"

import MainContentArea from '../components/MainContentArea';
import { getPosts } from '../api';
import { useNavigate } from 'react-router-dom';

const Home = ({ isLoggedIn, user }) => {
    const [posts, setPosts] = useState([]);
const navigate=useNavigate()
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getPosts();
                setPosts(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="home-page">
            <MainContentArea
                posts={posts}
                onCreatePost={() => {navigate("/create-post")}}
                isLoggedIn={isLoggedIn}
            />
        </div>
    );
};

export default Home;
