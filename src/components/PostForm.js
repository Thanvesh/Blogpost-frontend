import React, { useState } from 'react';
import { createPost } from '../api';
import { useNavigate } from 'react-router-dom';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { IoIosCloseCircleOutline } from "react-icons/io";

import './PostForm.css';

const PostForm = ({ isLoggedIn }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const postData = {
            title,
            content,
            imageUrl,  // Use the imageUrl instead of a file
        };

        try {
            await createPost(postData, localStorage.getItem('token'));
            navigate('/');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!isLoggedIn) return <p>Please log in to create a post.</p>;

    return (
        <div className='post-creation-container'>
        <form onSubmit={handleSubmit} className="post-form">
            <IoIosCloseCircleOutline className='closebtn' onClick={()=>navigate('/')} />
            <div className='post-form-content'>
            <h2>Create a New Post</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
                rows="6"
                required
            />
            <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL"
                required

            />
            <button className='submitbtn' type="submit" disabled={loading}>
                {loading ? 'Creating Post...' : 'Create Post'}
            </button>
            {loading && (
                <div className="loader-container">
                    <ScaleLoader color="#007bff" />
                </div>
            )}
            </div>
        </form>
        </div>
    );
};

export default PostForm;
