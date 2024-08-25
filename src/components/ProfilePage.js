import React, { useState, useEffect } from 'react';
import { getUserProfile, updateProfile } from '../api';
import ScaleLoader from 'react-spinners/ScaleLoader';
import './ProfilePage.css';  // Adjust path to your CSS

const ProfilePage = ({ user, setUser }) => {
    const [profileData, setProfileData] = useState(null);
    const [editing, setEditing] = useState(false);
    const [imageBase64, setImageBase64] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getUserProfile(localStorage.getItem('token'));
                setProfileData(response.data);
                setImageBase64(response.data.profilePic || '');
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user._id]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    const maxWidth = 800; // Max width for the image
                    const maxHeight = 800; // Max height for the image
                    
                    let width = img.width;
                    let height = img.height;
    
                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
    
                    ctx.drawImage(img, 0, 0, width, height);
    
                    const reducedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                    setImageBase64(reducedBase64);
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const updatedProfileData = { ...profileData, profilePic: imageBase64 };

            await updateProfile(updatedProfileData, localStorage.getItem('token'));
            setUser(updatedProfileData);
            setEditing(false);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="loader-container">
                <ScaleLoader color="#36d7b7" loading={loading} />
            </div>
        );
    }

    return (
        <div className="profile-page">
            {editing ? (
                <div className="profile-edit">
                    <div className="profile-pic-container">
                        <img
                            src={imageBase64 || 'default-profile-pic-url'}
                            alt="Profile"
                            className="profile-pic-edit"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="upload-input"
                        />
                    </div>
                    <input
                        type="text"
                        value={profileData.name || ''}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        placeholder="Name"
                        className="input-field"
                    />
                    <input
                        type="email"
                        value={profileData.email || ''}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        placeholder="Email"
                        className="input-field"
                    />
                    <textarea
                        value={profileData.bio || ''}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        placeholder="Bio"
                        className="textarea-field"
                    />
                    <div className="edit-buttons">
                        <button onClick={handleUpdateProfile} className="save-button">Save</button>
                        <button onClick={() => setEditing(false)} className="cancel-button">Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="profile-view">
                    <div className="profile-pic-container">
                        <img
                            src={imageBase64 || 'default-profile-pic-url'}
                            alt="Profile"
                            className="profile-pic"
                        />
                    </div>
                    <h1 className="profile-name">{profileData.name}</h1>
                    <p className="profile-email">{profileData.email}</p>
                    <p className="profile-bio">{profileData.bio}</p>
                    <button onClick={() => setEditing(true)} className="edit-button">Edit Profile</button>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
