// src/components/PostDetailsView.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, deletePost, updatePost } from '../api';
import CommentModal from './CommentModal';
import './PostDetailsView.css';  // Adjust path to your CSS
import { IoMdMenu } from "react-icons/io";
import { FaRegCommentDots } from "react-icons/fa";


const PostDetailsView = ({ isLoggedIn, user }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [showButton, setShowButton] = useState(false)
    const [isEditing, setIsEditing] = useState(false);
    const [editedPost, setEditedPost] = useState({ title: '', content: '', imageUrl: '' });
    const [showCommentModal, setShowCommentModal] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await getPostById(id);
                setPost(response.data);
                setEditedPost({
                    title: response.data.title,
                    content: response.data.content,
                    imageUrl: response.data.imageUrl || ''
                });
            } catch (err) {
                console.error(err);
            }
        };
        fetchPost();
    }, [id]);

    console.log(post)

    const handleDeletePost = async () => {
        try {
            await deletePost(id, localStorage.getItem('token'));
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveEdit = async () => {
        try {
            await updatePost(id, editedPost, localStorage.getItem('token'));
            setPost({ ...post, ...editedPost });
            setIsEditing(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCommentModal = () => {
        setShowCommentModal(!showCommentModal);
    };


    if (!post) return <p>Loading...</p>;

    return (
        <div className="post-details-view">
            <button className='back-button' onClick={() => navigate(-1)}>Back</button> {/* Back button functionality */}

            <div className="inner-content">

                <div className= {`post-card-details ${showCommentModal ? "blurred" : "not-blurred"}`}>

                    {isEditing ? (
                        <div className="edit-post-form">
                            <input
                                type="text"
                                value={editedPost.title}
                                onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
                                placeholder="Title"
                            />
                            <textarea
                                value={editedPost.content}
                                onChange={(e) => setEditedPost({ ...editedPost, content: e.target.value })}
                                placeholder="Content"
                            />
                            <input
                                type="text"
                                value={editedPost.imageUrl}
                                onChange={(e) => setEditedPost({ ...editedPost, imageUrl: e.target.value })}
                                placeholder="Image URL"
                            />
                            <button onClick={handleSaveEdit}>Save</button>
                            <button onClick={handleEditToggle}>Cancel</button>
                        </div>
                    ) : (
                        <>
                            {isLoggedIn && post.author._id === user._id && (
                                <IoMdMenu className='post-action-icon' onClick={() => setShowButton(!showButton)} />
                            )}
                            <div className={`${showButton ? "visible" : "hide"}`}>

                                <button onClick={handleEditToggle}>Edit</button>
                                <button onClick={handleDeletePost}>Delete</button>
                            </div>
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
                        </>
                    )}
                    <div className="recent-comments-container" >
                        <h1>Comment section</h1>
                        <div className="slide-comments-container">
                        {post.comments.length > 0 ? (
                                post.comments.slice(0, 3).map(comment => (
                                    <div key={comment._id} className="slide-comment">
                                        <p><span>{comment.user.name} : </span>{comment.comment}</p>
                                    </div>
                                ))
                            ) : (
                                <p >There are no comments added</p>
                            )}
                        </div>
                        <FaRegCommentDots className="comment-icon" onClick={handleCommentModal}  />
                    </div>
                </div>

                {/* Comment Modal */}
                {showCommentModal && (
                    <CommentModal
                        postId={id}
                        isOpen={showCommentModal}
                        onClose={handleCommentModal}
                        user={user}
                    />
                )}

                <div className={`author-container ${showCommentModal ? "blurred" : "not-blurred"}`}>
                    <img className='author-detail-img' src={post.author.profilePic} alt="Author Profile" />
                    <div className='author-container-text'>
                        <h4> <span> Post Created By : </span>{post.author.name}</h4>
                        <p><span>Author Bio : </span>{post.author.bio}</p> {/* Assuming there's a bio field */}
                        <p><span>Author Email : </span>{post.author.email}</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PostDetailsView;
