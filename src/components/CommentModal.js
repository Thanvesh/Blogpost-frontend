import React, { useState, useEffect } from 'react';
import { getPostById, addComment, editComment, deleteComment } from '../api';
import { MdCloseFullscreen } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ScaleLoader } from 'react-spinners';  // Import ScaleLoader
import './CommentModal.css';  // Adjust path to your CSS

const CommentModal = ({ postId, isOpen, onClose, user }) => {
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [showCommentBtn, setShowCommentBtn] = useState(null); // Use null to indicate no active dropdown
    const [loading, setLoading] = useState(false); // Loader state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            try {
                const response = await getPostById(postId);
                setComments(response.data.comments);
            } catch (err) {
                setError('Failed to fetch comments.');
            } finally {
                setLoading(false);
            }
        };
        if (postId) fetchComments();
    }, [postId]);

    const handleAddComment = async () => {
        if (newComment.trim() === '') {
            setError('Comment cannot be empty.');
            return;
        }

        setLoading(true);
        try {
            await addComment(postId, { comment: newComment }, localStorage.getItem('token'));
            // Refetch comments after adding
            const response = await getPostById(postId);
            setComments(response.data.comments);
            setNewComment('');
            setError(null);
        } catch (err) {
            setError('Failed to add comment.');
        } finally {
            setLoading(false);
        }
    };

    const handleEditComment = async (commentId, updatedComment) => {
        if (updatedComment.trim() === '') {
            setError('Comment cannot be empty.');
            return;
        }

        setLoading(true);
        try {
            await editComment(postId, commentId, { comment: updatedComment }, localStorage.getItem('token'));
            setComments(comments.map(comment => comment._id === commentId ? { ...comment, comment: updatedComment } : comment));
            setError(null);
        } catch (err) {
            setError('Failed to edit comment.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        setLoading(true);
        try {
            await deleteComment(postId, commentId, localStorage.getItem('token'));
            setComments(comments.filter(comment => comment._id !== commentId));
            setError(null);
        } catch (err) {
            setError('Failed to delete comment.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="comment-modal">
            <button className="close-button" onClick={onClose}><MdCloseFullscreen /></button>
            <div className="comment-input-section">
                <img src={user.profilePic} alt={user.name} className="user-avatar" />
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                />
                <button onClick={handleAddComment} disabled={loading}>Comment</button>
            </div>
            {loading && <div className="loader"><ScaleLoader color="#3498db" /> {/* Loader using ScaleLoader */}</div>}
            {error && <div className="error-message">{error}</div>} {/* Error message */}
            <div className="comments-list">
                {comments.map(comment => (
                    <div key={comment._id} className="comment-main">
                        <img
                            src={comment.user?.profilePic || 'default-avatar.png'}
                            alt={comment.user?.name || 'User'}
                            className="user-avatar"
                        />
                        <div className="comment-header">
                            <span className="comment-username">{comment.user?.name || 'Unknown User'}</span>
                        </div>
                        <div className="comment-content">
                            <p className="comment-text-details">{comment.comment}</p>
                            {comment.user?._id === user._id && (
                                <div className='btnSection-comment'>
                                    <BsThreeDotsVertical onClick={() => setShowCommentBtn(showCommentBtn === comment._id ? null : comment._id)} />
                                    {showCommentBtn === comment._id && (
                                        <div className="comment-btn-section showCommentBtn">
                                            <button onClick={() => {
                                                const updatedComment = prompt('Edit your comment:', comment.comment);
                                                if (updatedComment !== null) handleEditComment(comment._id, updatedComment);
                                            }}>Edit</button>
                                            <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentModal;
