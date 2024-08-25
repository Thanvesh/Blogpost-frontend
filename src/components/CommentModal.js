import React, { useState, useEffect } from 'react';
import { getPostById, addComment, editComment, deleteComment } from '../api';
import { MdCloseFullscreen } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import './CommentModal.css';  // Adjust path to your CSS

const CommentModal = ({ postId, isOpen, onClose, user }) => {
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [showCommentBtn, setShowCommentBtn] = useState(null); // Use null to indicate no active dropdown

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await getPostById(postId);
                setComments(response.data.comments);
            } catch (err) {
                console.error(err);
            }
        };
        if (postId) fetchComments();
    }, [postId]);

    const handleAddComment = async () => {
        try {
            await addComment(postId, { comment: newComment }, localStorage.getItem('token'));
            // Refetch comments after adding
            const response = await getPostById(postId);
            setComments(response.data.comments);
            setNewComment('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditComment = async (commentId, updatedComment) => {
        try {
            await editComment(postId, commentId, { comment: updatedComment }, localStorage.getItem('token'));
            setComments(comments.map(comment => comment._id === commentId ? { ...comment, comment: updatedComment } : comment));
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment(postId, commentId, localStorage.getItem('token'));
            setComments(comments.filter(comment => comment._id !== commentId));
        } catch (err) {
            console.error(err);
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
                <button onClick={handleAddComment}>Comment</button>
            </div>
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
                                            <button onClick={() => handleEditComment(comment._id, prompt('Edit your comment:', comment.comment))}>Edit</button>
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
