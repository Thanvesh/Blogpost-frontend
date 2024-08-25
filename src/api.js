// src/api/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';  // Adjust the URL based on your backend setup

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const register = (userData) => api.post('/auth/register', userData);
export const login = (userData) => api.post('/auth/login', userData);
export const getPosts = () => api.get('/posts');
export const getPostById = (id) => api.get(`/posts/${id}`);
export const createPost = (postData, token) => api.post('/posts', postData, { headers: { Authorization: `Bearer ${token}` } });
export const updatePost = (id, postData, token) => api.put(`/posts/${id}`, postData, { headers: { Authorization: `Bearer ${token}` } });
export const deletePost = (id, token) => api.delete(`/posts/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const addComment = (postId, commentData, token) => api.post(`/posts/${postId}/comments`, commentData, { headers: { Authorization: `Bearer ${token}` } });
export const editComment = (postId, commentId, commentData, token) => api.put(`/posts/${postId}/comments/${commentId}`, commentData, { headers: { Authorization: `Bearer ${token}` } });
export const deleteComment = (postId, commentId, token) => api.delete(`/posts/${postId}/comments/${commentId}`, { headers: { Authorization: `Bearer ${token}` } });
export const getUserProfile = (token) => api.get('/auth/profile', {headers: { Authorization: `Bearer ${token}` }});

// Update user profile
export const updateProfile = (profileData, token) => api.put('/auth/profile', profileData, {
    headers: { Authorization: `Bearer ${token}` }
});