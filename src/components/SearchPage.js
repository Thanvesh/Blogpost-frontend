import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../api';
import { ScaleLoader } from 'react-spinners'; // Import ScaleLoader

import './SearchPage.css';  // Adjust path to your CSS

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);  // Error state for validations

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getPosts();
                setPosts(response.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch posts. Please try again later.");
            } finally {
                setLoading(false);  // Stop loading when fetch is complete
            }
        };
        fetchPosts();
    }, []);

    // Validate the search term
    const handleSearchChange = (e) => {
        const value = e.target.value.trim();  // Trim spaces
        if (!value) {
            setError("Search term cannot be empty.");
        } else {
            setError(null);  // Clear error if input is valid
        }
        setSearchTerm(value);
    };

    // Filter posts based on the search term
    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Render the loader, error, or the search results
    return (
        <div className="search-page">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search for posts..."
            />
            {error && <p className="error-message">{error}</p>}
            {loading ? (
                 <div className="loader-container">
                 <ScaleLoader color="#36d7b7" />  {/* ScaleLoader */}
             </div>
            ) : (
                <div className="search-posts-list">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map(post => (
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
                        ))
                    ) : (
                        <p>No posts found matching your search.</p>  // Message when no posts match the search term
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
