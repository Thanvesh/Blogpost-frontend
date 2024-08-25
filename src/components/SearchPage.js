// src/components/SearchPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getPosts } from '../api';
import './SearchPage.css';  // Adjust path to your CSS

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [posts, setPosts] = useState([]);

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

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="search-page">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for posts..."
            />
            <div className="search-posts-list">
                {filteredPosts.map(post => (
                    <div key={post._id} className="search-post-card">
                        <div className="search-post-header">
                            <img className='search-author-img' src={post.author.profilePic} alt="Author" />
                            <span>{post.author.name}</span>
                        </div>
                        <h2>{post.title}</h2>
                        {post.imageUrl && <img className="search-blog-img" src={post.imageUrl} alt="Post" />}
                        <p>{post.content.substring(0, 100)}...</p>
                        <Link to={`/posts/${post._id}`}>Read more</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;
