import React from 'react';
import { Link } from 'react-router-dom';
import './MainContentArea.css';  // Adjust path to your CSS

const MainContentArea = ({ posts, onCreatePost, isLoggedIn }) => {
    return (
        <main className="main-content-area">
            {isLoggedIn && (
                <button className="create-post-btn" onClick={onCreatePost}>+</button>
            )}
            {posts.map(post => (
                <div key={post._id} className="post-card">
                    <div className="post-header">
                        <img src={post.author.profilePic} alt="Author" className="author-image" />
                        <div className="author-info">
                            <span className="author-name">{post.author.name}</span>
                        </div>
                    </div>
                    <h2>{post.title}</h2>
                    {post.imageUrl && <img src={post.imageUrl} alt="Post" className="post-image" />}
                    <p>{post.content.substring(0, 100)}...</p>
                    <Link to={`/post/${post._id}`} className="read-more-link">Read more</Link>
                </div>
            ))}
        </main>
    );
};

export default MainContentArea;
